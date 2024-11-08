import Auth from './Pages/Auth'
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase-config.js';
import Home from './Pages/Home.jsx';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css'
import MentalHealth from './Pages/MentalHealth';
import Dashboard from './Pages/Dashboard';
import Goals from './Pages/Goals';
import { UserRoundPen } from "lucide-react";
import { LogOutIcon} from "lucide-react";
import { LogInIcon} from "lucide-react";
import { GoalsProvider } from './Context/GoalsProvider';
import Reminder from './Components/Reminder';
import SupportCommunity from './Pages/SupportCommunity';
import Fitness from './Pages/Fitness.jsx'
import ProtectedRoute from './Components/ProtectedRoute.jsx';
import Profile from './Pages/Profile.jsx';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });
    return () => unsubscribe(); // Cleanup on component unmount
  }, []);

  const handleLogin = () => {
    console.log('user logged in')
    setIsAuthenticated(true); 
  };
  console.log('isAuthenticated:', isAuthenticated);

  const handleLogout = () => {
    setIsAuthenticated(false); 
  };
    // const handleLogin = () => {
    //   console.log('User has logged in');
    // };
  
    // return <Auth onLogin={handleLogin} />;
  
  return (
    <div className='flex flex-wrap flex-col'>
    <GoalsProvider>
      <Reminder />
      <Router>
        <nav className='shadow-lg pb-3 mb-4 nav p-3'>
        {!isAuthenticated ? (
           <div className='container mx-auto flex justify-between w-screen'>
              <h2 className='text-3xl font-bold text-cyan-800'>AfyaPlus+</h2>
          <div className='flex space-x-4'>
            <Link to="/">Home</Link>
            <Link to="/auth" className='flex'><LogInIcon/>Login</Link>
          </div>
          </div>
        ):(
           < div className=' container mx-auto flex justify-between'>
              <div className='space-x-4'>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/MentalHealth">Mental Health</Link>
                <Link to="/Fitness">Fitness</Link>
                <Link to="/Community">Support & Community</Link>
              </div>
              <div className='flex space-x-4'>
                <span role='button' className='flex font-semibold hover:blue-500' onClick={handleLogout}><LogOutIcon/>Logout</span>
                <Link to="/profile" className='flex'><UserRoundPen/>Profile</Link>
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
      </Router>
    </GoalsProvider>
  </div>

    //  <div className='flex flex-wrap flex-col'>
    //    <GoalsProvider>
    //     <Reminder/>
    //      <Router>
    //       <nav className=' space-x-4 shadow-lg pb-3 mb-4'>
    //       <Link to="/">Dashboard</Link>
    //         <Link to="/Community">Support & Community</Link>
    //         <Link to="/MentalHealth">Mental Health</Link>
    //         <Link to="/Fitness">Fitness</Link>
    //         <Link to="/User">Login user</Link>

            
    //       </nav>
    //       <Routes>
    //         <Route path="/" element={<Dashboard/>} />
    //        <Route path="/goals" element={<Goals />} />
    //         <Route path="/Community" element={<SupportCommunity/>}/>
    //         <Route path="/MentalHealth" element={<MentalHealth/>} />
    //         <Route path="/User" element={<Auth onLogin={handleLogin}/>} />
    //         <Route path="/Fitness" element={<Fitness/>} />
            
    //         {/* You can add more routes here as needed this was hust an example of how you can route */}
    //       </Routes>
    //          </Router>
    //    </GoalsProvider>
    //  </div>
  );

}

export default App;