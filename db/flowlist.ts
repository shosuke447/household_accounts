import firebase from 'firebase/app'
import { collection, getDocs, addDoc } from 'firebase/firestore'
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

export async function saveToDoList(flowListContent: flowListContent) {
  const docRef = await addDoc(collection(db, 'flow'), {
    date: flowListContent.date,
    purchase_item: flowListContent.purchase,
    category: flowListContent.category,
    price: flowListContent.price
  });
  return {
    id: docRef.id,
    date: flowListContent.date,
    purchase_item: flowListContent.purchase,
    category: flowListContent.category,
    price: flowListContent.price
  };
}