import { useNavigate } from "react-router-dom";
import { useProfile } from "../Context/ProfileContext";
import { useTheme } from "../Context/ThemeContext"; 
import Footer from "../Components/Footer";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase-config";

const Profile = () => {
  const { profile } = useProfile();
  const [user, setUser] = useState(null);
  const [journalHistory, setJournalHistory] = useState([]);
  const [moodHistory, setMoodHistory] = useState([]);
  const navigate = useNavigate();
  const { theme } = useTheme();

  // Fetch user and journal entries when the component mounts
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        // Fetch journal entries from localStorage (or Firebase)
        const storedJournalHistory = JSON.parse(localStorage.getItem("journalHistory")) || [];
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

        const storedMoodHistory = JSON.parse(localStorage.getItem("moodHistory")) || [];
        setMoodHistory(storedMoodHistory);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // Fallback logic for the profile avatar
  const avatarUrl = profile.avatar && profile.avatar.startsWith('http')
    ? profile.avatar 
    : '/avatars/avatar2.jpg'; // Default avatar if profile avatar is not available

  return (
    <div className="profile-page" style={{ width: "80vw", maxWidth: "80vw" }}>
      <div
        className={`w-96 mx-auto p-6 shadow-lg rounded-lg ${theme === "dark" ? "bg-gray-200 text-black" : "bg-stone-50 text-black"}`}
      >
        <h2 className="text-2xl font-semibold text-center mb-6">My Profile</h2>
        <div className="flex flex-col items-center space-y-4">
          <img
            src={avatarUrl}
            alt="User Avatar"
            className="w-24 h-24 rounded-full border-2 border-cyan-500 shadow-lg object-cover"
          />
          <h3 className="text-xl font-medium">{profile.name || "User"}</h3>
          <div className="mt-6 text-center space-y-4">
            <div>
              <span className="font-medium">Notifications: </span>
              <span>{profile.preferences?.notificationsEnabled ? "Enabled" : "Disabled"}</span>
            </div>
          </div>
          <button
            onClick={() => navigate("/settings")}
            className="mt-6 px-6 py-2 bg-cyan-600 text-white rounded-md shadow-md hover:bg-cyan-700"
          >
            Edit Profile
          </button>
        </div>
      </div>
       <h1 className={`${theme === 'dark' ? 'bg-gray-800 text-white text-3xl mt-4' : ' text-black text-3xl text-center mt-10 mb-10 font-semibold border-b-2  border-b-cyan-800'}`}>User Profile</h1>

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
                  <p>
                    {entry.mood} {entry.note}
                  </p>
                </div>
              ))
            ) : (
              <p>No mood entries found.</p>
            )}
          </div>
        </div>
      ) : (
        <p>Please log in to view your profile.</p>
      )}
      <Footer/>
    </div>
  );
};

export default Profile;
