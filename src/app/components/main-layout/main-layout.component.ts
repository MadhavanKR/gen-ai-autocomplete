import { Component, ViewEncapsulation } from '@angular/core';
import { HttpclientService, PredictionResponse, WordPredictionResponse } from 'src/app/services/httpclient.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})

export class MainLayoutComponent {
  readonly LETTERS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "SPACE"];
  wordsResponse!: WordPredictionResponse;
  nextWordsResponse!: PredictionResponse;
  sentenceResponse!: PredictionResponse;
  nextSentenceResponse!: PredictionResponse;

  wordPredictions: string[] = [];
  sentence: string = '';
  sentencePredictions: string[] = [];
  wordsFromLetter: string = '';
  sentenceLog: string[] = [];

  constructor(private httpClientService: HttpclientService) { }

  ngOnInit() {
    this.updateSentencePredictions();
  }

  onLetterClick(letter: string) {
    if (letter == 'SPACE')
      letter = ' ';
    this.sentence = this.sentence + letter.toLowerCase();
    if (this.sentence.length >= 2) {
      this.updateWordPredictions();
    }
  }

  updateCurrentSentence(event: any) {
    this.sentence = event.target.value;
    if (this.sentence.length > 3) {
      this.updateWordPredictions();
    }
    if (this.sentence.split(' ').length >= 2) {
      this.updateSentencePredictions();
    }
  }

  updateWordPredictions() {
    console.log('updating word predictions');
    this.httpClientService.getNextWords(this.sentence).subscribe((response: any) =>{
        this.wordsResponse = response;
        this.wordPredictions = this.wordsResponse.word_suggestions;
        console.log(this.wordPredictions);
    });  
  }

  addSentenceToLog() {
    if (this.sentence) {
      this.httpClientService.addToContext(this.sentence);
      this.sentenceLog.push(this.sentence);
      this.sentence = '';
    }
    
  }

  onWordClick(word: any) {
    var sentenceSplit = this.sentence.split(' ')
    if (word.substring(sentenceSplit[sentenceSplit.length - 1])) {
      sentenceSplit[sentenceSplit.length - 1] = word;
      this.sentence = sentenceSplit.join(' ') + ' ';
    } else {
      this.sentence = this.sentence + ' ' + word + ' ';
    }
    this.wordPredictions = [];
    if (this.sentence.split(' ').length >= 3) {
      this.updateSentencePredictions();
    }
  }

  onSentenceClick(sentence: any) {
    this.sentence = sentence;
    this.addSentenceToLog();
    // this.sentencePredictions = [];
    this.updateSentencePredictions();
  }

  // removeLastLetter() {
  //   this.wordsFromLetter = this.wordsFromLetter.substring(0, this.wordsFromLetter.length - 1);
  //   this.updateWords(false);
  //   this.updateSentencePredictions();
  // }

  // updateWords(force: boolean) {
  //   if (force || this.wordsFromLetter.length >= 3) {
  //     let curSentence = this.sentence;
  //     let incompleteWord = force? '': this.wordsFromLetter;
  //     this.httpClientService.getNextWords(curSentence, incompleteWord).subscribe((response: any) => {
  //       this.nextWordsResponse = response;
  //       this.words = this.nextWordsResponse.output;
  //     });
  //   }
  // }

  updateSentencePredictions() {
    this.httpClientService.getNextSentences(this.sentence).subscribe((response: any) => {
      this.sentenceResponse = response;
      this.sentencePredictions = this.sentenceResponse?.sentence_predictions;
    });
  }

  // addCurrentWord() {
  //   this.sentence = this.sentence + ' ' + this.wordsFromLetter;
  //   this.wordsFromLetter = '';
  //   this.words = [];
  //   this.updateSentencePredictions();
  //   this.updateWords(true)
  // }

}
