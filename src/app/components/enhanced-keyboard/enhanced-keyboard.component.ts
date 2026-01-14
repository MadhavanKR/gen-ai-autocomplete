import { Component, ViewChild, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs';
import Keyboard from "simple-keyboard";
import { HttpclientService, PredictionResponse, WordPredictionResponse, ChatMessage } from 'src/app/services/httpclient.service';

@Component({
    selector: 'app-enhanced-keyboard',
    templateUrl: './enhanced-keyboard.component.html',
    styleUrls: ['./enhanced-keyboard.component.scss'],
    standalone: false
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
  private timer: any;


  constructor(private httpClientService: HttpclientService, private elRef: ElementRef, private renderer: Renderer2) { }

  ngAfterViewInit() {
    this.keyboard = new Keyboard({
      onChange: input => this.onChange(input),
      onKeyPress: button => this.onKeyPress(button),
    });



    // Wait for the keyboard to be rendered and then add hover directive
    setTimeout(() => {
      const keys = this.elRef.nativeElement.querySelectorAll('.hg-button');
      // keys.forEach((key: HTMLElement) => {
      //   this.renderer.setAttribute(key, 'appHoverClick', '');
      // });
      keys.forEach((key: HTMLElement) => {
        key.addEventListener('mouseenter', () => {
          this.timer = setTimeout(() => {
            key.getElementsByTagName("span")[0].dispatchEvent(new Event('mousedown', { bubbles: true }));
            console.log("Clicking key:", key); // Debugging
            key.click(); 
            key.dispatchEvent(new Event('mousedown', { bubbles: true }));
            const keyValue = key.getAttribute('data-skbtn'); // Get key value

            if (keyValue) {
              console.log("Triggering key:", keyValue); // Debugging
              // this.keyboard.onKeyPress(keyValue); 
              this.keyboard.handleButtonClicked(keyValue, "default"); 
              // this.onChange(keyValue)// Simulate key press
            }
          }, 2000);
        });

        key.addEventListener('mouseleave', () => {
          clearTimeout(this.timer);
        });
      });
    }, 1000);
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
    this.httpClientService.getNextWordsLLM(this.sentence).subscribe((response: any) => {
      this.wordsResponse = response;
      console.log(JSON.stringify(this.wordsResponse))
      this.wordPredictions = this.wordsResponse?.word_suggestions;
      this.wordPredictionLoading = false;
    });
  }


  onWordClick(word: any) {
    var sentenceSplit = this.sentence.split(' ')
    if (word.substring(sentenceSplit[sentenceSplit.length - 1])) {
      sentenceSplit[sentenceSplit.length - 1] = word;
      this.sentence = sentenceSplit.join(' ') + ' ';
    } else {
      this.sentence = this.sentence + ' ' + word + ' ';
    }
    this.keyboard.setInput(this.sentence);
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
