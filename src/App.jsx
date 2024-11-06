
import Auth from './Pages/Auth'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css'
import MentalHealth from './Pages/MentalHealth';
import Dashboard from './Pages/Dashboard';
import Goals from './Pages/Goals';
import { GoalsProvider } from './Context/GoalsProvider';
import Reminder from './Components/Reminder';
import Footer from './Components/Footer';
// import Auth from './Pages/Profile'
import Profile from './Pages/Profile';

function App() {
  return (
  
     <div className='flex flex-wrap flex-col'>
       <GoalsProvider>
        
        <Auth/>
       <MentalHealth/>
        <Reminder/>
         <Router>
          <nav>
          <Link to="/">Dashboard</Link>
            <Link to="/footer">Footer</Link>
            <Link to="/profile">Profile</Link>
          </nav>
          <Routes>
            <Route path="/" element={<Dashboard/>} />
           <Route path="/goals" element={<Goals />} />
            <Route path="/footer" element={<Footer/>} />
            <Route path="/profile" element={<Profile/>} />
            {/* You can add more routes here as needed this was hust an example of how you can route */}
          </Routes>
             </Router>
       </GoalsProvider>
     </div>
  )

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Footer from "./Components/Footer";

function App() {
  return (
    <>
      <Router>
        <nav>
          <Link to="/">Footer</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Footer />} />
          {/* You can add more routes here as needed this was hust an example of how you can route */}
        </Routes>
      </Router>
      <Footer />
    </>
  );

}
 }
 export default App
