import { db } from '../firebase-config';
import { collection, query, where, getDocs } from 'firebase/firestore';


const fetchUserSupport = async (userId) => {
  try {
    const q = query(collection(db, "groups"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    const groups = querySnapshot.docs.map(doc => doc.data());
    return groups;
  } catch (error) {
    console.error("Error fetching groups: ", error);
    throw error; 
  }
};

export { fetchUserSupport };