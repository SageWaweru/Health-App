import Auth from './Pages/Auth'
import { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase-config.js';
import Home from './Pages/Home.jsx';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import './App.css'
import MentalHealth from './Pages/MentalHealth';
import Dashboard from './Pages/Dashboard';
import Goals from './Pages/Goals';
import { GoalsProvider } from './Context/GoalsProvider';
import Reminder from './Components/Reminder';
import SupportCommunity from './Pages/SupportCommunity';
import Fitness from './Pages/Fitness.jsx'
import ProtectedRoute from './Components/ProtectedRoute.jsx';
import Profile from './Pages/Profile.jsx';
import ProfileSetting from './Pages/ProfileSetting.jsx';
import { ProfileProvider } from './Context/ProfileContext.jsx';
import { ThemeProvider } from './Context/ThemeContext.jsx';
import { useTheme } from './Context/ThemeContext.jsx';
import Blog from './Pages/Blog.jsx';
import Register from './Pages/Register.jsx';
import { LogInIcon, LogOutIcon, UserRoundPen, Menu, X } from "lucide-react"; // Add icons


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const {theme}= useTheme();
  const [isOpen, setIsOpen] = useState(false);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setIsAuthenticated(true);
        setUser(currentUser)
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    });
    return () => unsubscribe(); 
  }, []);

  const handleLogin = () => {
    console.log('user logged in')
    setIsAuthenticated(true); 
  };
 
  const AppWithRouter = () => {
    const navigate = useNavigate();

  const handleLogout = async () => {

    if (!auth.currentUser) {
      console.log("No user is currently logged in.");
      alert("No user is logged in.");
      return;
    }

    try {
      await signOut(auth); 
      setIsAuthenticated(false);
      alert("You have been logged out successfully.");

      setUser(null)
      navigate('/'); 
    } catch (error) {
      console.error('Error logging out:', error.message);
      alert("Logout failed: " + error.message);

    }
  };
   
    
  return (
    <div className="flex flex-wrap flex-col">
    <ThemeProvider>
      <ProfileProvider>
      <GoalsProvider>
        <Reminder />
        {/* <Router> */}
        <nav className={`shadow-lg pb-3 mb-4 nav p-3 ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
      <div className="container mx-auto flex justify-between items-center">
        <h2 className="text-3xl font-bold text-cyan-800">AfyaPlus</h2>

        {/* Hamburger Menu for Small Screens */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

{/* Sidebar (Hidden on Large Screens) */}
<div
  className={`fixed top-0 left-0 h-full w-64 bg-white/30 backdrop-blur-lg shadow-lg z-50 transform ${
    isOpen ? "translate-x-0" : "-translate-x-full"
  } transition-transform duration-300 ease-in-out md:hidden`}
>
  <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4">
    <X size={28} />
  </button>
  <div className="flex flex-col items-start p-6 space-y-4">
    {!isAuthenticated ? (
      <>
        <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
        <Link to="/blog" onClick={() => setIsOpen(false)}>Blog</Link>
        <Link to="/register" onClick={() => setIsOpen(false)}>Register</Link>
        <Link to="/auth" className="flex" onClick={() => setIsOpen(false)}>
          <LogInIcon /> Login
        </Link>
      </>
    ) : (
      <>
        <Link to="/dashboard" onClick={() => setIsOpen(false)}>Goal Setting</Link>
        <Link to="/MentalHealth" onClick={() => setIsOpen(false)}>Mental Health</Link>
        <Link to="/Fitness" onClick={() => setIsOpen(false)}>Health Tracker</Link>
        <Link to="/Community" onClick={() => setIsOpen(false)}>Support & Community</Link>
        <Link to="/blog" onClick={() => setIsOpen(false)}>Blog</Link>
        <span
          role="button"
          className="flex font-semibold hover:blue-500 mt-4"
          onClick={() => {
            handleLogout();
            setIsOpen(false);
          }}
        >
          <LogOutIcon /> Logout
        </span>
        <Link to="/profile" className="flex mt-4" onClick={() => setIsOpen(false)}>
          <UserRoundPen />
          {user && user.displayName ? user.displayName : "Profile"}
        </Link>
      </>
    )}
  </div>
</div>

        {/* Normal Navigation (Visible on Medium+ Screens) */}
        <div className="hidden md:flex space-x-4">
          {!isAuthenticated ? (
            <>
              <Link to="/">Home</Link>
              <Link to="/blog">Blog</Link>
              <Link to="/register">Register</Link>
              <Link to="/auth" className="flex">
                <LogInIcon /> Login
              </Link>
            </>
          ) : (
            <>
              <Link to="/dashboard">Goal Setting</Link>
              <Link to="/MentalHealth">Mental Health</Link>
              <Link to="/Fitness">Health Tracker</Link>
              <Link to="/Community">Support & Community</Link>
              <Link to="/blog">Blog</Link>
              <span role="button" className="flex font-semibold hover:blue-500 ml-3" onClick={handleLogout}>
                <LogOutIcon /> Logout
              </span>
              <Link to="/profile" className="flex">
                <UserRoundPen />
                {user && user.displayName ? user.displayName : "Profile"}
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>      
          <Routes>
      
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth onLogin={handleLogin} />} />
      
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
      
                  <Dashboard />
      
                </ProtectedRoute>
              }
            />
            <Route
              path="/Community"
              element={
                <ProtectedRoute>
      
                  <SupportCommunity />
      
                </ProtectedRoute>
              }
            />
            <Route
              path="/MentalHealth"
              element={
                <ProtectedRoute>
      
                  <MentalHealth />
      
                </ProtectedRoute>
              }
            />
            <Route
              path="/Fitness"
              element={
                <ProtectedRoute>
      
                  <Fitness />
      
                </ProtectedRoute>
              }
            />
           <Route
              path="/Profile"
              element={
                <ProtectedRoute>
      
                  <Profile />
      
                </ProtectedRoute>
              }
            />
             <Route
              path="/settings"
              element={
                <ProtectedRoute>
      
                  <ProfileSetting />
      
                </ProtectedRoute>
              }
            />
             <Route
              path="/goals"
              element={
               

                 <Goals/>

             
                 
      
              }
            />
            <Route path="/blog" element={<Blog />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        {/* </Router> */}
      </GoalsProvider>
      </ProfileProvider>
    </ThemeProvider>
  </div>



  );
};

return (
  <Router>
    <AppWithRouter />
  </Router>
);
};

export default App;