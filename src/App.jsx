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
import { LogInIcon } from 'lucide-react';
import { LogOutIcon } from 'lucide-react';
import { UserRoundPen } from 'lucide-react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);


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
    try {
      await signOut(auth); 
      setIsAuthenticated(false);
      setUser(null)
      navigate('/'); 
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };
   
  
  return (
    <div className='flex flex-wrap flex-col'>
    <GoalsProvider>
      <Reminder />
      {/* <Router> */}
        <nav className='shadow-lg pb-3 mb-4 nav p-3'>
        {!isAuthenticated ? (
           <div className='container mx-auto flex justify-between w-screen'>
              <h2 className='text-3xl font-bold text-cyan-800'>AfyaPlus+</h2>
          <div className='flex space-x-4'>
            <Link to="/" className=' hover:bg-cyan-950 p-2 hover:text-white rounded-lg'>Home</Link>
            <Link to="/auth" className='flex  hover:bg-cyan-950 p-2 hover:text-white rounded-lg'><LogInIcon/>Login</Link>
          </div>
          </div>
        ):(
           < div className=' container mx-auto flex justify-between'>
            <h2 className='text-3xl font-bold text-cyan-800'>AfyaPlus+</h2>
              <div className='space-x-5 '>
                <Link to="/dashboard" className=' hover:bg-cyan-950 p-2 hover:text-white rounded-lg'>Dashboard</Link>
                <Link to="/MentalHealth" className=' hover:bg-cyan-950 p-2 hover:text-white rounded-lg'>Mental Health</Link>
                <Link to="/Fitness" className=' hover:bg-cyan-950 p-2 hover:text-white rounded-lg'>Fitness</Link>
                <Link to="/Community" className=' hover:bg-cyan-950 p-2 hover:text-white rounded-lg'>Support & Community</Link>
              </div>
              <div className='flex space-x-4'>
                <span role='button' className='flex p-2 font-semibold hover:text-blue-500' onClick={handleLogout}><LogOutIcon/>Logout</span>
                <Link to="/profile" className='flex  hover:bg-cyan-950 p-2 hover:text-white rounded-lg'><UserRoundPen/>{user && user.displayName ? user.displayName : 'Profile'} </Link>
              </div>
            </div>
            
          )}
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
          <Route path="/goals" element={<Goals />} />
        </Routes>
      {/* </Router> */}
    </GoalsProvider>
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