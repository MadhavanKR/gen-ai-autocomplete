import { Component } from '@angular/core';
import { HttpclientService, PredictionResponse } from 'src/app/services/httpclient.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {
  readonly LETTERS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
  wordsResponse!: PredictionResponse;
  nextWordsResponse!: PredictionResponse;
  sentenceResponse!: PredictionResponse;
  nextSentenceResponse!: PredictionResponse;

  words: string[] = [];
  sentence: string[] = [];
  sentencePredictions: string[] = [];
  wordsFromLetter: string = '';

  constructor(private httpClientService: HttpclientService) { }

  ngOnInit() {
    this.httpClientService.getStartingWords('doctor').subscribe((response: any) => {
      this.wordsResponse = response;
      this.words = this.wordsResponse?.output;
    });

    this.httpClientService.getStartingSentences('doctor').subscribe((response: any) => {
      this.sentenceResponse = response;
      this.sentencePredictions = this.sentenceResponse?.output;
    });
  }

  onLetterClick(letter: string) {
    this.wordsFromLetter = this.wordsFromLetter + letter;
    // this.sentence.push(this.wordsFromLetter);
    this.updateWords(false);
  }

  onWordClick(word: any) {
    this.sentence.push(word);
    this.wordsFromLetter = '';
    this.updateSentencePredictions();
    this.updateWords(true);
  }

  onSentenceClick(partSentence: string) {
    let splitWords = partSentence.split(' ');
    for (var i=0; i<splitWords.length; i++) {
      this.sentence.push(splitWords[i]);
    }
    this.updateSentencePredictions();
  }

  predictWordsStartingWith(letter: any) {
    this.words = ['hello', 'world'];
  }

  removeLastWord() {
    this.sentence.pop();
    this.updateWords(false);
    this.updateSentencePredictions();
  }

  removeLastLetter() {
    this.wordsFromLetter = this.wordsFromLetter.substring(0, this.wordsFromLetter.length - 1);
    this.updateWords(false);
    this.updateSentencePredictions();
  }

  updateWords(force: boolean) {
    if (force || this.wordsFromLetter.length >= 3) {
      let curSentence = this.sentence.join(' ');
      let incompleteWord = force? '': this.wordsFromLetter;
      this.httpClientService.getNextWords(curSentence, incompleteWord).subscribe((response: any) => {
        this.nextWordsResponse = response;
        this.words = this.nextWordsResponse.output;
      });
    }
  }

  updateSentencePredictions() {
    if (this.sentence.length >= 3) {
      this.httpClientService.getNextSentences(this.sentence.join(' ')).subscribe((response: any) => {
        this.nextSentenceResponse = response;
        this.sentencePredictions = this.nextSentenceResponse.output;
      });
    }
  }

  addCurrentWord() {
    this.sentence.push(this.wordsFromLetter);
    this.wordsFromLetter = '';
    this.words = [];
    this.updateSentencePredictions();
    this.updateWords(true)
  }

}
