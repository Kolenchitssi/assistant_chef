import { RecipeKeys } from '@/core/recipe';
import {
  collection,
  Firestore,
  getDocs,
  getFirestore,
  doc,
  getDoc,
} from '@firebase/firestore';

export const getDataArrayFromFirebase = async <T>(
  collectionName: string,
) => {
  const db: Firestore = getFirestore();

  const querySnapshot = await getDocs(collection(db, collectionName));
  const arrData: T[] = [];

  querySnapshot.forEach((doc) => {
    console.log('querySnapshot doc===', doc.data(), doc.id);
    arrData.push({
      ...(doc.data() as T),
      [RecipeKeys.recipeID]: doc.id,
    });
  });

  return arrData;
};

export const getDataByIdFromFirebase = async <T>(
  collectionName: string = 'recipes',
  id: string,
): Promise<T | null> => {
  const db = getFirestore();
  const docRef = doc(db, collectionName, id); // 'recipes' — коллекция, id — идентификатор документа
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data() as T;
  } else {
    console.log('No such document!');
    return null;
  }
};
