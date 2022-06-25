import firebase from 'firebase/app'
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../util/firebase'

type flowListContent = {
  id: string,
  date: string,
  purchase: string,
  category: string,
  price: number
}

export async function getFlowList() {
  var result: flowListContent[] = [];

  const snapShot = await getDocs(collection(db, 'flow'));
  snapShot.forEach((item) => {
    result.push({
      id: item.id,
      date: item.data().date,
      purchase: item.data().purchase_item,
      category: item.data().category,
      price: item.data().price
    });
  });

  return result;
}

export async function findFlowItem(id: string){
  var result: flowListContent[] = []

  const snapShot = await getDocs(collection(db, 'flow'))
  snapShot.forEach((item) => {
      if (item.id == id){
          result.push({
              id: item.id,
              date: item.data().date,
              purchase: item.data().purchase,
              category: item.data().category,
              price: item.data().price
          });
      }
  });

  return result[0]
}

export async function saveFlowList(flowListContent: flowListContent) {
  console.log(1)
  console.log(flowListContent.date);
  console.log(2)
  const docRef = await addDoc(collection(db, 'flow'), {
    user_id: 'fox',
    date: flowListContent.date,
    purchase_item: flowListContent.purchase,
    category: flowListContent.category,
    price: flowListContent.price
  });
  return {
    id: docRef.id,
    user_id: 'fox',
    date: flowListContent.date,
    purchase_item: flowListContent.purchase,
    category: flowListContent.category,
    price: flowListContent.price
  };
}

export async function deleteFlowItem(id: string){
  try{
      await deleteDoc(doc(db, 'flow', id));
      return id
  }catch (error){
      throw error
  }
}