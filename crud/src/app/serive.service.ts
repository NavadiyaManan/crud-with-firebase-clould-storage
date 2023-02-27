import { Injectable } from '@angular/core';
import { data } from './data';
import { addDoc, collection, deleteDoc, doc, getFirestore, updateDoc} from 'firebase/firestore';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeriveService {

  constructor(private fs:Firestore) {}

  addEmp(data:data){
    data.id=doc(collection(this.fs,'id' )).id;
    return addDoc(collection(this.fs,'data'),data)
  }

  getEmp():Observable<data[]>{
    let noteRef=collection(this.fs,'data')
    
    return collectionData(noteRef,{idField:'id'}) as Observable<data[]>
    
  }

  deleteEmp(d:data){
    // const db = getFirestore();
    const docRef = doc(this.fs, "data", d.id);
    return deleteDoc(docRef)
    // deleteDoc(docRef).then(()=>{
    //   alert('deleted');
    // })
  }
  updateEmp(data:any, datas:any){
    
    const db = getFirestore();
    const docRef = doc(this.fs, "data", data.id);
    return updateDoc(docRef,datas)
    // const db=getFirestore();
    // const docRef=doc(collection(this.fs,'crud'),data.id);
    // return updateDoc(docRef,datas);
  }
}
