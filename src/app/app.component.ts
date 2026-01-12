import { Component } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { AllPatientResponse, HttpclientService } from './services/httpclient.service';
import { authConfig } from './services/auth-config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isLoggedIn = false;
  userName: string = '';
  title = 'mk_autocomplete_angular';
  patient: string = ''
  participant = 'doctor';
  topic = 'treatment,recovery';
  allPatients : AllPatientResponse[] = [];

  constructor(private httpClientService: HttpclientService, private oauthService: OAuthService) {

    this.oauthService.configure(authConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin().then(() => {
      if (this.oauthService.hasValidAccessToken()) {
        this.isLoggedIn = true;
        const claims: any = this.oauthService.getIdentityClaims();
        this.userName = claims?.name;
      }
    });

    this.httpClientService.availablePatients.subscribe(data => {
      this.allPatients = data;
      console.log(JSON.stringify(data));
      if (this.allPatients.length > 0) {
        this.patient = this.allPatients[0].patientId;
        this.httpClientService.setPatient(this.patient);
      }
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

  login() {
    this.oauthService.initLoginFlow(); // redirects to your OAuth server
  }

  logout() {
    this.oauthService.logOut();
  }

}
