import { Component } from '@angular/core';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {
  readonly LETTERS = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

  words: string[] = [];
  sentence: string[] = [];

  constructor() {}

  onLetterClick(letter: any) {
    this.predictWordsStartingWith(letter);
  }

  onWordClick(word: any) {
    this.sentence.push(word);
  }

  predictWordsStartingWith(letter: any) {
    this.words = ['hello', 'world'];
  }

  removeLastWord() {
    this.sentence.pop();
  }

}
