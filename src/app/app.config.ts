import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { MatDialogModule } from '@angular/material/dialog';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideWalletAdapter } from '@heavy-duty/wallet-adapter';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes), 
    provideAnimationsAsync(), 
    provideWalletAdapter(),
    importProvidersFrom([MatDialogModule]),
    provideHttpClient()
  ], 
};
