export const environment = {
  apiUrl: (window as any).__env?.API_URL || 'http://localhost:5000/',
  authServerUrl: (window as any).__env?.AUTH_SERVER_URL || 'http://localhost:8080',
  callbackUrl: (window as any).__env?.CALLBACK_URL || 'http://localhost:4200'
};