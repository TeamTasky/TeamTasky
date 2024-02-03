import { Injectable, inject } from '@angular/core';
import { Task } from '../interfaces/task';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

const PATH = 'tasks';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private _firestore = inject(Firestore);
  private _collection = collection(this._firestore, PATH);

  getTasks(){
    return collectionData(this._collection, {idField: 'id'}) as Observable<Task[]>;
  }

  async getTask(id: string){
    try {
      const snapshot = await getDoc(doc(this._collection, id));
      return snapshot.data() as Task;
    } catch (error) {
      return undefined;
    } 
  };  

  async searchTasksByQuery(text: string){
    const q = query(
      this._collection, 
      where('title', '>=', text),
      where('description', '<=', text + '\uf8ff')
      );
      const querySnapshot = await getDocs(q);
      let tasks: Task[] = [];
      querySnapshot.forEach((doc) => {
        tasks = [...tasks, {id: doc.id, ...doc.data()} as Task];
     });
     return tasks;
    }

    createTask(task: Task) {
      return addDoc(this._collection, task);
    }
  
    updateTask(id: string, task: Task) {
      return updateDoc(this.document(id), { ...task });
    }
  
    deleteTask(id: string) {
      return deleteDoc(this.document(id));
    }
  
    private document(id: string) {
      return doc(this._firestore, `${PATH}/${id}`);
    }




}
