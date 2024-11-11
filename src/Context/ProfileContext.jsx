import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState({
    name: '',
    avatar: '',
    preferences: {
      theme: 'light',
      notificationsEnabled: true,
    },
  });

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};
ProfileProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };
  

export const useProfile = () => useContext(ProfileContext);
