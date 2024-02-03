import { Injectable, NgZone, inject } from '@angular/core';
import { User } from '../interfaces/user';
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, createUserWithEmailAndPassword, signOut, Auth, getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

const PATH = 'users';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _firestore = inject(Firestore);
  private _collection = collection(this._firestore, PATH);

  userData: any;
  user: User = {} as User
  isAuthenticated = false;

  constructor(private firebaseAuthenticationService: Auth, private ngZone: NgZone, private router: Router) {
    this.firebaseAuthenticationService.onAuthStateChanged((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
      } else {
        this.userData = null;
        localStorage.removeItem('user');
      }
    });
  }

  // Login with email and password
  loginWithEmailAndPassword(email: string, password: string) {
    return signInWithEmailAndPassword(this.firebaseAuthenticationService, email, password)
      .then(async (userCredential) => {
        this.userData = userCredential.user;
        this.observeUserState();

        const userFromFirestore = await this.getUser(this.userData.uid);

        if (userFromFirestore) {
          const user: User = {
            id: userFromFirestore.id,
            email: userFromFirestore.email,
            displayName: userFromFirestore.displayName,
            photoURL: userFromFirestore.photoURL,
            teamIds: userFromFirestore.teamIds,
            createdAt: userFromFirestore.createdAt,
          };
          localStorage.setItem('user', JSON.stringify(user));
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  }

// Login with Google
loginWithGoogleProvider() {
  return signInWithPopup(this.firebaseAuthenticationService, new GoogleAuthProvider())
    .then(async () => {
      this.observeUserState();
      
      const userFromFirestore = await this.getUser(this.userData.uid);

      if (userFromFirestore) {
        const user: User = {
          id: userFromFirestore.id,
          email: userFromFirestore.email,
          displayName: userFromFirestore.displayName,
          photoURL: userFromFirestore.photoURL,
          teamIds: userFromFirestore.teamIds,
          createdAt: userFromFirestore.createdAt,
        };
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        const user: User = {
          id: this.userData.uid,
          email: this.userData.email,
          displayName: this.userData.displayName,
          photoURL: this.userData.photoURL,
          createdAt: new Date(),
        };
        await this.createUser(user);
        localStorage.setItem('user', JSON.stringify(user));
      }

    })
    .catch((error: Error) => {
      alert(error.message);
    });
}

// Signup with email and password
signupWithEmailAndPassword(displayName: string, email: string, password: string) {
  return createUserWithEmailAndPassword(this.firebaseAuthenticationService, email, password)
    .then(async (userCredential) => {
      this.userData = userCredential.user;
      this.observeUserState();

      // Save user in firestore
      const user: User = {
        id: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: displayName,
        createdAt: new Date(),
      };

      await this.createUser(user);

      // Save user in local storage
      localStorage.setItem('user', JSON.stringify(user));
    })
    .catch((error) => {
      alert(error.message);
    });
}

  observeUserState() {
    this.firebaseAuthenticationService.onAuthStateChanged((userState) => {
      userState && this.ngZone.run(() => this.router.navigate(['']));
    });
  }

  // Return true if the user is logged in
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    return user !== null;
  }

  // Logout
  logout() {
    debugger;
    return signOut(this.firebaseAuthenticationService)
      .then(() => {
        localStorage.removeItem('user');
        this.router.navigate(['login']);
      });
  }

  //firestore manage user
  getUsers(){
    return collectionData(this._collection, {idField: 'id'}) as Observable<User[]>;
  }

  async getUser(id: string): Promise<User | undefined> {
    try {
      const snapshot = await getDoc(doc(this._collection, id));
      const userData = snapshot.data() as User;
      return {
        id: snapshot.id,
        email: userData.email,
        displayName: userData.displayName,
        photoURL: userData.photoURL,
        teamIds: userData.teamIds,
        createdAt: userData.createdAt
      } as User;
    } catch (error) {
      console.error('Error fetching user from Firestore:', error);
      return undefined;
    }
  }
  

  async searchUsersByQuery(text: string){
    const q = query(
      this._collection, 
      where('title', '>=', text),
      where('description', '<=', text + '\uf8ff')
      );
      const querySnapshot = await getDocs(q);
      let users: User[] = [];
      querySnapshot.forEach((doc) => {
        users = [...users, {id: doc.id, ...doc.data()} as User];
     });
     return users;
    }

    createUser(user: User) {
      const userId = user.id || this.userData.uid; 
      const userDocRef = doc(this._collection, userId);
  
      return setDoc(userDocRef, user);
    }
  
    updateUser(user: User) {
      const userId = user.id || this.userData.uid; 
      const userDocRef = doc(this._collection, userId);
  
      return updateDoc(userDocRef, { ...user });
    }
  
    deleteUser() {
      const userId = this.userData.uid; 
      const userDocRef = doc(this._collection, userId);
  
      return deleteDoc(userDocRef);
    }
  
    private document(id: string) {
      return doc(this._firestore, `${PATH}/${id}`);
    }

}
