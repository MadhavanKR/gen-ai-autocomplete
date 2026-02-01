import { Injectable } from '@angular/core';
import { AuthConfig } from 'angular-oauth2-oidc';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthConfigService {

  constructor() { }
}


export const authConfig: AuthConfig = {
  issuer: environment.authServerUrl,
  redirectUri: environment.callbackUrl,
  clientId: 'blinkai-client',
  responseType: 'code',
  scope: 'blinkai',    
  showDebugInformation: true,
  requireHttps: false,
};