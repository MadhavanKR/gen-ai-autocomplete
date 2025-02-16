import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';

export interface PredictionResponse {
  sentence_predictions: string[];
}

export interface WordPredictionResponse {
  word_suggestions: string[];
}

export interface AllPatientResponse {
  patientId: string;
  patientName: string;
}

export interface ChatMessage {
  message: string;
  predicted: boolean;
  partial_sentence: string;
}


@Injectable({
  providedIn: 'root'
})
export class HttpclientService {
  baseUrl = 'http://localhost:5000/';
  participant = 'doctor';
  topic = 'treatment';
  patientId = 'f1833e58-c9bd-42d6-a6a1-ac91fbb6ce11';
  availablePatients = new BehaviorSubject<AllPatientResponse[]>([]);
  reloadPredictions = new Subject<void>();
  reloadPredictions$ = this.reloadPredictions.asObservable();

  constructor(private http: HttpClient) {
    this.getAllPatients();
   }

  getAllPatients() {
    let url = this.baseUrl + 'getAllPatients';
    this.http.get(url).subscribe((response: any) => {
      this.availablePatients.next(response);
    });
  }

  setPatient(patient: string) {
    this.patientId = patient;
    this.reloadPredictions.next();
  }

  setParticipant(participant: string) {
    this.participant = participant;
    this.reloadPredictions.next();
  }

  setTopic(topic: string) {
    this.topic = topic;
    this.reloadPredictions.next();
  }

  getStartingWords(role: string) {
    let url = role? this.baseUrl + 'startPhrases?role=' + role: this.baseUrl + 'startPhrases';
    return this.http.get(url);
  }
  
  getNextWordsLLM(sentence: string) {
    let url = this.baseUrl + 'predictWords';
    let data = {'message': sentence, 'patientId': this.patientId, 'currentTopics': this.topic, 'participant': this.participant}
    return this.http.post(url, data);
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

  addSentenceToHistory(sentence: ChatMessage) {
    let url = this.baseUrl + 'addHistory';
    let data = {'message': sentence, 'patientId': this.patientId, 'currentTopics': this.topic, 'participant': this.participant};
    return this.http.post(url , data);
  }

}
