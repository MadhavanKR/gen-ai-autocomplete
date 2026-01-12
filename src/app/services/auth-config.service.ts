import { Injectable } from '@angular/core';
import { AuthConfig } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})
export class AuthConfigService {

  constructor() { }
}


export const authConfig: AuthConfig = {
  issuer: 'http://localhost:8080',
  redirectUri: 'http://localhost:4200/callback',
  clientId: 'blinkai-client',
  responseType: 'code',
  scope: 'blinkai',    
  showDebugInformation: true,
  requireHttps: false,
};