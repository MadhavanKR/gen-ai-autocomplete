import { Component, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import Keyboard from "simple-keyboard";
import { HttpclientService, PredictionResponse, WordPredictionResponse, ChatMessage } from 'src/app/services/httpclient.service';

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

  sentencePredictionLoading: boolean = true;
  wordPredictionLoading: boolean = true;

  wordPredictions: string[] = [];
  sentence: string = '';
  sentencePredictions: string[] = [];
  wordsFromLetter: string = '';
  sentenceLog: string[] = [];

  selectedWords: string[] = [];

  reloadSubscription !: Subscription;

  ngAfterViewInit() {
    this.keyboard = new Keyboard({
      onChange: input => this.onChange(input),
      onKeyPress: button => this.onKeyPress(button),
    });
  }

  ngOnInit() {
    this.reloadSubscription = this.httpClientService.reloadPredictions$.subscribe(() => {
      this.updatePredictions();
    })
    this.updatePredictions();
  }

  updatePredictions() {
    this.sentencePredictionLoading = true;
    this.wordPredictionLoading = true;
    this.sentencePredictions = [];
    this.wordPredictions = [];
    this.updateSentencePredictions();
    this.updateWordPredictions();
  }

  updateSentencePredictions() {
    this.httpClientService.getNextSentences(this.sentence).subscribe((response: any) => {
      this.sentenceResponse = response;
      console.log(JSON.stringify(response))
      this.sentencePredictions = this.sentenceResponse?.sentence_predictions;
      this.sentencePredictionLoading = false;
    });
  }

  updateWordPredictions() {
    console.log('updating word predictions');
    this.httpClientService.getNextWordsLLM(this.sentence).subscribe((response: any) =>{
        this.wordsResponse = response;
        console.log(JSON.stringify(this.wordsResponse))
        this.wordPredictions = this.wordsResponse?.word_suggestions;
        this.wordPredictionLoading = false;
    });  
  }

  constructor(private httpClientService: HttpclientService) { }

  onWordClick(word: any) {
    var sentenceSplit = this.sentence.split(' ')
    if (word.substring(sentenceSplit[sentenceSplit.length - 1])) {
      sentenceSplit[sentenceSplit.length - 1] = word;
      this.sentence = sentenceSplit.join(' ') + ' ';
    } else {
      this.sentence = this.sentence + ' ' + word + ' ';
    }
    this.wordPredictions = [];
    this.updatePredictions();
  }

  onSentenceClick(sentence: any) {
    this.addCurrentSentenceToLog(sentence, true);
    this.updatePredictions();
  }

  onChange = (input: string) => {
    this.sentence = input;
    this.keyboard.setInput(this.sentence);
    this.updatePredictions();
    console.log("Input changed", input);
  };

  onKeyPress = (button: string) => {
    console.log("Button pressed", button);
    
    /**
     * If you want to handle the shift and caps lock buttons
     */
    if (button === "{shift}" || button === "{lock}") this.handleShift();

    if (button === "{enter}")
      this.handleEnterPressed();
  };

  onInputChange = (event: any) => {
    console.log('onInputChange: ' + event.target.value)
    this.keyboard.setInput(this.sentence + event.target.value);
  };

  handleShift = () => {
    let currentLayout = this.keyboard.options.layoutName;
    let shiftToggle = currentLayout === "default" ? "shift" : "default";

    this.keyboard.setOptions({
      layoutName: shiftToggle
    });
  };

  handleEnterPressed = () => {
    this.keyboard.setInput('');
    this.addCurrentSentenceToLog(this.sentence, false);
  }

  addCurrentSentenceToLog = (message: string, isPredicted: boolean) => {
    const chatMessage: ChatMessage = {
      message: message,
      predicted: isPredicted,
      partial_sentence: this.sentence
    }
    this.sentenceLog.push(message);
    this.sentence = '';
    this.httpClientService.addSentenceToHistory(chatMessage).subscribe();
  }
}
