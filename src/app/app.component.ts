import { Component } from '@angular/core';
import { HttpclientService } from './services/httpclient.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mk_autocomplete_angular';
  participant = 'doctor';
  topic = 'treatment,recovery';

  constructor(private httpClientService: HttpclientService) {}
  
  onParticipantChange(event: any) {
    this.participant = event;
    this.httpClientService.setParticipant(this.participant);
  }

  onTopicChange(event: any) {
    this.topic = event;
    this.httpClientService.setTopic(this.topic);
  }

}
