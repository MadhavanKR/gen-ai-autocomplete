import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-callback-component',
  templateUrl: './callback-component.component.html',
  styleUrls: ['./callback-component.component.scss']
})
export class CallbackComponentComponent implements OnInit {
  constructor(private oauthService: OAuthService) {}

  ngOnInit(): void {
    // Try to parse tokens from redirect
    this.oauthService.tryLoginCodeFlow().then(() => {
      // Redirect to home after successful login
      window.location.href = '/v3';
    });
  }

}
