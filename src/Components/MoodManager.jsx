import { db } from '../firebase-config';
// import { db } from './firebase-config'; 
import { collection, query, where, getDocs } from 'firebase/firestore';


const fetchUserMoodEntries = async (userId) => {
  try {
    const q = query(collection(db, "moods"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    const moods = querySnapshot.docs.map(doc => doc.data());
    return moods;
  } catch (error) {
    console.error("Error fetching journals: ", error);
    throw error; 
  }
};

export { fetchUserMoodEntries };