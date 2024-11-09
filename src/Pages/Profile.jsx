
import  { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase-config';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [journalHistory, setJournalHistory] = useState([]);
  const [moodHistory, setMoodHistory] = useState([]);

  // Fetch user and journal entries when the component mounts
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        // Fetch journal entries from localStorage (or Firebase)
        const storedJournalHistory = JSON.parse(localStorage.getItem('journalHistory')) || [];
        setJournalHistory(storedJournalHistory);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        
        const storedMoodHistory = JSON.parse(localStorage.getItem('moodHistory')) || [];
        setMoodHistory(storedMoodHistory);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);


  return (
    <div className="profile-page" style={{ width: "80vw", maxWidth: "80vw" }}>
      <h1 className="text-3xl text-center mb-10 font-semibold border-b-2 border-b-cyan-800">
        User Profile
      </h1>

      {user ? (
        <div>
          <h3 className="text-3xl text-left mb-4 text-cyan-700">Welcome, {user.displayName || user.email}!</h3>
          

          {/* Display Journal Entries */}
          <div>
            <h4 className="text-xl text-center text-cyan-700 font-semibold mb-4">My Journal Entries</h4>
            {journalHistory.length > 0 ? (
              journalHistory.map((entry, index) => (
                <div key={index} className="mb-4 p-4 bg-white shadow-md rounded-md">
                  <h5 className="font-semibold text-lg">Entry from {new Date(entry.date).toLocaleString()}</h5>
                  <p>{entry.entry}</p>
                  {entry.files && entry.files.length > 0 && (
                    <div className="mt-2">
                      <h6 className="font-medium">Attached Files:</h6>
                      {entry.files.map((file, fileIndex) => (
                        <a key={fileIndex} href={file} target="_blank" rel="noopener noreferrer">
                          File {fileIndex + 1}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p>No journal entries found.</p>
            )}
          </div>
        </div>
      ) : (
        <p>Please log in to view your profile and journal entries.</p>
      )}
      {user ? (
        <div>
           {/* Display Mood Entries */}
          <div>
            <h4 className="text-xl text-center text-cyan-700 mt-10 font-semibold mb-4">My Mood Entries</h4>
            {moodHistory.length > 0 ? (
              moodHistory.map((entry, index) => (
                <div key={index} className="mb-4 p-4 bg-white shadow-md rounded-md">
                  <h5 className="font-semibold text-lg">Entry from {new Date(entry.date).toLocaleString()}</h5>
                  <p>{entry.mood} {entry.note}</p>
                </div>
              ))
            ) : (
              <p>No mood entries found.</p>
            )}
          </div>
        </div>
      ) : (
        <p>Please log in to view your profile .</p>
      )}
    </div>
  );
};

export default Profile;




