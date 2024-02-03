import { Injectable, inject } from '@angular/core';
import { Team } from '../interfaces/team';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

const PATH = 'teams';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private _firestore = inject(Firestore);
  private _collection = collection(this._firestore, PATH);

  getTeams() {
    return collectionData(this._collection, { idField: 'id' }) as Observable<Team[]>;
  }

  getTeamsByAdminId(adminId: string) {
    const q = query(this._collection, where('adminId', '==', adminId));
    const resp = collectionData(q, { idField: 'id' }) as Observable<Team[]>;
    return resp;
  }

  async getTeam(id: string) {
    try {
      const snapshot = await getDoc(doc(this._collection, id));
      return snapshot.data() as Team;
    } catch (error) {
      return undefined;
    }
  };

  async searchTeamsByQuery(text: string) {
    const q = query(
      this._collection,
      where('title', '>=', text),
      where('description', '<=', text + '\uf8ff')
    );
    const querySnapshot = await getDocs(q);
    let teams: Team[] = [];
    querySnapshot.forEach((doc) => {
      teams = [...teams, { id: doc.id, ...doc.data() } as Team];
    });
    return teams;
  }

  createTeam(team: Team) {
    const teamId = team.id;
    if (teamId) {
      const teamDocRef = doc(this._firestore, `${PATH}/${teamId}`);
      return setDoc(teamDocRef, { ...team })
        .then(() => true)
        .catch(() => false);
    } else {
      console.error('El ID del equipo no está definido');
      return Promise.reject('El ID del equipo no está definido');
    }
  }
  

  updateTeam(team: Team) {
    const teamId = team.id;
    const teamDocRef = doc(this._collection, teamId);

    return updateDoc(teamDocRef, { ...team })
      .then(() => true)
      .catch(() => false);
  }

  deleteTeam(id: string) {
    try {
      deleteDoc(this.document(id));
      return true;
    } catch {
      return false;
    }
  }

  private document(id: string) {
    return doc(this._firestore, `${PATH}/${id}`);
  }




}
