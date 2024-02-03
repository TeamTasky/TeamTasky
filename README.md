# TeamTasky

TeamTasky is a collaborative task management application built with Angular 17 and Firebase.

![TeamTasky](https://i.ibb.co/BHkdK8W/app.png)

## Getting Started

### Prerequisites

- Node.js and npm installed
- Angular CLI installed (`npm install -g @angular/cli`)

### Installation

1. Clone the repository: `git clone https://github.com/tamipg/TeamTasky-app.git`
2. Navigate to the project folder: `cd TeamTasky`
3. Install dependencies: `npm install`

### Configuration

1. Create a Firebase project: [Firebase Console](https://console.firebase.google.com/)
2. Create a new Firebase web app in your project
3. Obtain your Firebase configuration object (apiKey, authDomain, projectId, etc.)
4. Copy the Firebase configuration to `src/environments/environment.ts` and `src/environments/environment.development.ts`

   ```typescript
   // src/environments/environment.ts
   export const environment = {
     production: false,
     firebaseConfig: {
       apiKey: 'your-api-key',
       authDomain: 'your-auth-domain',
       projectId: 'your-project-id',
       storageBucket: 'your-storage-bucket',
       messagingSenderId: 'your-messaging-sender-id',
       appId: 'your-app-id',
     },
   };
   

    // src/environments/environment.development.ts
    export const environment = {
      production: false,
      firebaseConfig: {
        apiKey: 'your-development-api-key',
        authDomain: 'your-development-auth-domain',
        projectId: 'your-development-project-id',
        storageBucket: 'your-development-storage-bucket',
        messagingSenderId: 'your-development-messaging-sender-id',
        appId: 'your-development-app-id',
      },
    };
   
### Usage
1. Serve the application locally: ng serve
2. Open your browser and navigate to http://localhost:4200/
