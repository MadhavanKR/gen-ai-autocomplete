import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

export interface PredictionResponse {
  sentence_predictions: string[];
}

export interface WordPredictionResponse {
  word_suggestions: string[];
}

@Injectable({
  providedIn: 'root'
})
export class HttpclientService {
  baseUrl = 'http://localhost:5000/';
  participant = 'doctor';
  topic = ['treatment', 'recovery'];
  patientId = 'f1833e58-c9bd-42d6-a6a1-ac91fbb6ce11';
    
  constructor(private http: HttpClient) { }

  setParticipant(participant: string) {
    this.participant = participant;
  }

  setTopic(topic: string) {
    this.topic = topic.split(',');
  }

  getStartingWords(role: string) {
    let url = role? this.baseUrl + 'startPhrases?role=' + role: this.baseUrl + 'startPhrases';
    return this.http.get(url);
  }

  getNextWords(sentence: string) {
    let url = this.baseUrl + 'getWordSuggestions?start_characters=' + sentence;
    return this.http.get(url);
  }

  getNextSentences(sentence: string) {
    console.log(this.participant);
    let url = this.baseUrl + 'predictSentence';
    let data = {'message': sentence, 'patientId': this.patientId, 'currentTopics': this.topic, 'participant': this.participant}
    return this.http.post(url, data);
  }

  addToContext(content: string) {
    let url = this.baseUrl + 'appendWord';
    let data = {'word_to_append': content}
    this.http.post(url, data).subscribe((response: any) => {
     console.log('updated context');
    });;
  }

}
