import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

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

export interface ConversationSummary {
  doctor: string,
  family: string
}

export interface TopicsDiscussed {
  doctor: string[],
  family: string[]
}

export interface PatientPersonaDetails {
  patientPersona: string,
  diagnosisDetails: string
}

export interface PatientDetails {
  allergies: string[],
  conversationSummary: ConversationSummary,
  diagnoses: string[],
  medications: string[],
  topicsDiscussed: TopicsDiscussed,
  name: string, 
}


@Injectable({
  providedIn: 'root'
})
export class HttpclientService {
  baseUrl = environment.apiUrl;
  participant = 'doctor';
  topic = 'treatment';
  patientId = 'f1833e58-c9bd-42d6-a6a1-ac91fbb6ce11';
  availablePatients = new BehaviorSubject<AllPatientResponse[]>([]);
  patientDetails = new BehaviorSubject<PatientDetails>({} as PatientDetails);
  patientPersonaDetails = new BehaviorSubject<PatientPersonaDetails>({} as PatientPersonaDetails);
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

  getPatientPersona(generatePersona: boolean) {
    let url = this.baseUrl + 'getPatientPersona?patient_id=' + this.patientId + '&generatePersona=' + generatePersona;
    this.http.get<PatientPersonaDetails>(url).subscribe((response: PatientPersonaDetails) => {
      this.patientPersonaDetails.next(response);
    });
  }

  getPatientDetails() {
    let url = this.baseUrl + 'getPatient?patient_id=' + this.patientId;
    this.http.get<PatientDetails>(url).subscribe((response: PatientDetails) => {
      console.log(JSON.stringify(response, null, 2));
      this.patientDetails.next(response);
    });
  }

  setPatient(patient: string) {
    this.patientId = patient;
    this.reloadPredictions.next();
    this.getPatientDetails();
    this.getPatientPersona(false);
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
    let url = this.baseUrl + 'predictWordsV2';
    let data = {'message': sentence, 'patientId': this.patientId, 'currentTopics': this.topic, 'participant': this.participant}
    console.log(JSON.stringify(data))
    return this.http.post(url, data);
  }
  
  getNextWords(sentence: string) {
    let url = this.baseUrl + 'getWordSuggestions?start_characters=' + sentence;
    return this.http.get(url);
  }

  getNextSentences(sentence: string) {
    let url = this.baseUrl + 'predictSentenceV2';
    let data = {'message': sentence, 'patientId': this.patientId, 'currentTopics': this.topic, 'participant': this.participant}
    return this.http.post(url, data);
  }

  addSentenceToHistory(sentence: ChatMessage) {
    let url = this.baseUrl + 'addHistory';
    let data = {'message': sentence, 'patientId': this.patientId, 'currentTopics': this.topic, 'participant': this.participant};
    return this.http.post(url , data);
  }

  savePatientPersona(patientDetails: string, diagnosisDetails: string) {
    let url = this.baseUrl + 'savePatientPersona';
    let data = {'patientId': this.patientId, 'patientDetails': patientDetails, 'diagnosisDetails': diagnosisDetails};
    console.log(JSON.stringify(data));
    return this.http.post(url, data).subscribe();
  }
}
