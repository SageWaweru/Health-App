import { db } from '../firebase-config';
// import { db } from './firebase-config'; 
import { collection, query, where, getDocs } from 'firebase/firestore';


const fetchUserJournalEntries = async (userId) => {
  try {
    const q = query(collection(db, "journals"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    const journals = querySnapshot.docs.map(doc => doc.data());
    return journals;
  } catch (error) {
    console.error("Error fetching journals: ", error);
    throw error; 
  }
};

export { fetchUserJournalEntries };
