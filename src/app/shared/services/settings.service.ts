import { Injectable, inject } from '@angular/core';
import { Settings } from '../interfaces/settings';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

const PATH = 'settings';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private _firestore = inject(Firestore);
  private _collection = collection(this._firestore, PATH);

  async getSetting(id: string) {
    try {
      const snapshot = await getDoc(doc(this._collection, id));
      return snapshot.data() as Settings;
    } catch (error) {
      return undefined;
    }
  };

  setSetting(id: string, value: any) {
    const settingDocRef = doc(this._firestore, `${PATH}/${id}`);
    return setDoc(settingDocRef, { id, value })
      .then(() => true)
      .catch(() => false);
  }
  

}
