import { Component, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import Keyboard from "simple-keyboard";
import { HttpclientService, PredictionResponse, WordPredictionResponse } from 'src/app/services/httpclient.service';

@Component({
  selector: 'app-enhanced-keyboard',
  templateUrl: './enhanced-keyboard.component.html',
  styleUrls: ['./enhanced-keyboard.component.scss']
})
export class EnhancedKeyboardComponent implements AfterViewInit {
  value = "";
  keyboard!: Keyboard;
  wordsResponse!: WordPredictionResponse;
  nextWordsResponse!: PredictionResponse;
  sentenceResponse!: PredictionResponse;
  nextSentenceResponse!: PredictionResponse;

  wordPredictions: string[] = [];
  sentence: string = '';
  sentencePredictions: string[] = ["I am coming now. Whereas disregard and contempt for human rights have resulted", "I am coming now", "I am coming now","I am coming now","I am coming now","I am coming now"];
  wordsFromLetter: string = '';
  sentenceLog: string[] = [];

  ngAfterViewInit() {
    this.keyboard = new Keyboard({
      onChange: input => this.onChange(input),
      onKeyPress: button => this.onKeyPress(button),
    });
  }

  ngOnInit() {
    this.updateSentencePredictions();
  }

  updateSentencePredictions() {
    this.httpClientService.getNextSentences(this.sentence).subscribe((response: any) => {
      this.sentenceResponse = response;
      this.sentencePredictions = this.sentenceResponse?.sentence_predictions;
      console.log(JSON.stringify(this.sentencePredictions));
    });
  }

  updateWordPredictions() {
    console.log('updating word predictions');
    this.httpClientService.getNextWords(this.sentence).subscribe((response: any) =>{
        this.wordsResponse = response;
        this.wordPredictions = this.wordsResponse.word_suggestions;
        console.log(this.wordPredictions);
    });  
  }

  constructor(private httpClientService: HttpclientService) { }

  onWordClick = (word: string) => {

  }

  onChange = (input: string) => {
    this.value = input;
    this.sentence = input;
    if (this.sentence.split(' ').length >= 2 || this.sentence.length > 1) {
      this.updateSentencePredictions();
      this.updateWordPredictions();
    }
    console.log("Input changed", input);
  };

  onKeyPress = (button: string) => {
    console.log("Button pressed", button);

    /**
     * If you want to handle the shift and caps lock buttons
     */
    if (button === "{shift}" || button === "{lock}") this.handleShift();
  };

  onInputChange = (event: any) => {
    this.keyboard.setInput(event.target.value);
  };

  handleShift = () => {
    let currentLayout = this.keyboard.options.layoutName;
    let shiftToggle = currentLayout === "default" ? "shift" : "default";

    this.keyboard.setOptions({
      layoutName: shiftToggle
    });
  };
}
