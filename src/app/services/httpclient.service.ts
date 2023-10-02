import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

export interface PredictionResponse {
  output: string[];
}

@Injectable({
  providedIn: 'root'
})
export class HttpclientService {
  baseUrl = 'http://localhost:8080/';
  constructor(private http: HttpClient) { }

  getStartingWords(role: string) {
    let url = role? this.baseUrl + 'startPhrases?role=' + role: this.baseUrl + 'startPhrases';
    return this.http.get(url);
  }

  getNextWords(sentence: string, word: string) {
    let url = this.baseUrl + 'words?sentence=' + sentence + '&word=' + word;
    return this.http.get(url);
  }

  getStartingSentences(role: string) {
    let url = role? this.baseUrl + 'startSentences?role=' + role: this.baseUrl + 'startSentences';
    return this.http.get(url);
  }

  getNextSentences(sentence: string) {
    let url = this.baseUrl + 'completeSentences?sentence=' + sentence;
    return this.http.get(url);
  }

}
