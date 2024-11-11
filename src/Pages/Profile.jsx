import { useNavigate } from "react-router-dom";
import { useProfile } from "../Context/ProfileContext";
import { useTheme } from "../Context/ThemeContext"; 
import Footer from "../Components/Footer";

const Profile = () => {
  const { profile } = useProfile();
  const navigate = useNavigate();
  const { theme } = useTheme(); 

  return (
    <div>
      <div className={`w-96 mx-auto p-6 shadow-lg rounded-lg ${theme === 'dark' ? 'bg-gray-200 text-black' : 'bg-stone-50 text-black'}`}>
        <h2 className="text-2xl font-semibold text-center mb-6">My Profile</h2>
        <div className="flex flex-col items-center space-y-4">
          <img
            src={profile.avatar || '/avatars/avatar2.jpg'}
            alt="User Avatar"
            className="w-24 h-24 rounded-full border-2 border-cyan-500 shadow-lg object-cover"
          />
          <h3 className="text-xl font-medium ">{profile.name || 'User'}</h3>
          <div className="mt-6 text-center space-y-4">
            
            <div>
              <span className="font-medium">Notifications: </span>
              <span >
                {profile.preferences?.notificationsEnabled ? 'Enabled' : 'Disabled'}
              </span>
            </div>
          </div>
          <button
            onClick={() => navigate('/settings')}
            className="mt-6 px-6 py-2 bg-cyan-600 text-white rounded-md shadow-md hover:bg-cyan-700"
          >
            Edit Profile
          </button>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Profile;
