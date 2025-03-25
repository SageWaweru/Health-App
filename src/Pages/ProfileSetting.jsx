import { useState } from "react";
import { auth } from "../firebase-config";
import { useProfile } from "../Context/ProfileContext";
import { updateProfile } from "firebase/auth";
import { useTheme } from "../Context/ThemeContext"; 
import Footer from "../Components/Footer";

const predefinedAvatars = [
  "/avatars/avatar1.jpg", 
  "/avatars/avatar4.jpg", 
  "/avatars/avatar3.jpg", 
  "/avatars/avatar5.jpg", 
  "/avatars/avatar2.jpg", 
  "/avatars/avatar12.jpg", 
  "/avatars/avatar10.jpg", 
  "/avatars/avatar8.jpg", 
  "/avatars/avatar9.jpg", 
  "/avatars/avatar7.jpg", 
  "/avatars/avatar11.jpg", 
  "/avatars/avatar6.jpg",
];

const ProfileSetting = () => {
  const { theme, toggleTheme } = useTheme(); 
  const {profile, setProfile } = useProfile();
  const [name, setName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('/avatars/avatar2.jpg');
  const [preferences, setPreferences] = useState({
    theme: 'light', 
    notificationsEnabled: true,
  });

  const handleNameChange = (e) => setName(e.target.value);
  const handleAvatarSelect = (avatar) => setSelectedAvatar(avatar);
  const handleNotificationsChange = (e) => setPreferences(prev => ({
    ...prev,
    notificationsEnabled: e.target.checked,
  }));

  const handleThemeToggle = () => {
    toggleTheme(); 
    setPreferences(prev => ({
      ...prev,
      theme: prev.theme === 'light' ? 'dark' : 'light',
    }));
   
  };

  const handleSubmit = async (e) => { 
    e.preventDefault();
    const user = auth.currentUser;

    const updatedName = name.trim() !== "" ? name : profile.name; 

    console.log("Submitting profile:", { name: updatedName, selectedAvatar, preferences });

    if (user) {
      try {
        await updateProfile(user, {
          displayName: updatedName,
          photoURL: selectedAvatar,
        });

        setProfile({
          name: updatedName, 
          avatar: selectedAvatar,
          preferences, 
        });

        console.log("Profile updated:", { name: updatedName, selectedAvatar, preferences });
        alert("Profile updated successfully!");
      } catch (error) {
        console.error("Error updating profile:", error);
        alert("Failed to update profile");
      }
    } else {
      alert("Please log in to update your profile.");
    }
  };

  return (
    <div className={`max-w-2xl mx-auto p-6 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
      <h2 className="text-3xl font-semibold text-center mb-6">Profile Settings</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Name Input */}
        <div>
          <label htmlFor="name" className="block text-lg font-medium text-left">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            placeholder="Enter your name"
            className="w-full p-3 mt-2 border border-gray-300 rounded-md shadow-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>
        
        {/* Avatar Selection */}
        <div>
          <label className="block text-lg font-medium text-left">Choose Avatar:</label>
          <div className={`grid grid-cols-4 gap-2 mt-2 border-2 rounded-md bg-orange-50${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
            {predefinedAvatars.map((avatar, index) => (
              <div
                key={index}
                onClick={() => handleAvatarSelect(avatar)}
                className={`p-2 cursor-pointer rounded-md border-2 border-transparent transition-all duration-200 
                  ${selectedAvatar === avatar ? "border-cyan-500 scale-105" : "hover:border-gray-400"}`}
              >
                <img
                  src={avatar}
                  alt={`Avatar ${index + 1}`}
                  className="w-40 h-40 object-cover rounded-md shadow-lg"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Theme Toggle */}
        <div className="flex items-center space-x-2">
          <label htmlFor="theme" className="text-lg ">Switch Theme:</label>
          <button
            type="button"
            onClick={handleThemeToggle}
            className={`w-40 py-2 rounded-md shadow-md ${theme === 'dark' ? 'bg-cyan-800 text-orange-50' : 'bg-cyan-800 text-white'} hover:bg-cyan-700`}
>
            Toggle Theme
          </button>
        </div>

        {/* Notifications */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="notifications"
            checked={preferences.notificationsEnabled}
            onChange={handleNotificationsChange}
            className="h-5 w-5 text-cyan-600 rounded border-gray-300 focus:ring-cyan-500"
          />
          <label htmlFor="notifications" className="text-lg">Enable Notifications</label>
        </div>

        <button
          type="submit"
          className="w-full py-3 mt-4 bg-cyan-800 text-white rounded-md shadow-md hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        >
          Save Profile
        </button>
      </form>
      <Footer/>
    </div>
  );
};

export default ProfileSetting;

