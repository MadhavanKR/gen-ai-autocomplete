import { Component } from '@angular/core';
import { AllPatientResponse, HttpclientService } from './services/httpclient.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mk_autocomplete_angular';
  patient: string = ''
  participant = 'doctor';
  topic = 'treatment,recovery';
  allPatients : AllPatientResponse[] = [];

  constructor(private httpClientService: HttpclientService) {
    this.httpClientService.availablePatients.subscribe(data => {
      this.allPatients = data;
      console.log(JSON.stringify(data));
      if (this.allPatients.length > 0)
        this.patient = this.allPatients[0].patientId;
  });
  }

  onPatientChange(event: any) {
    this.patient = event;
    this.httpClientService.setPatient(this.patient);
  }
  
  onParticipantChange(event: any) {
    this.participant = event;
    this.httpClientService.setParticipant(this.participant);
  }

  onTopicChange(event: any) {
    this.topic = event;
    this.httpClientService.setTopic(this.topic);
  }

}
