import { EnvironmentProviders, importProvidersFrom } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment.development';
//firestore
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
//auth
import { getAuth, provideAuth } from '@angular/fire/auth';

const firebaseProviders: EnvironmentProviders = importProvidersFrom(
    provideFirebaseApp(() => 
      initializeApp(environment.firebase)
    ),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth())
  );

  export { firebaseProviders};