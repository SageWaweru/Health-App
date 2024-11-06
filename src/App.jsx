// import Auth from './Pages/Auth'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css'
import MentalHealth from './Pages/MentalHealth';
import Dashboard from './Pages/Dashboard';
import Goals from './Pages/Goals';
import { GoalsProvider } from './Context/GoalsProvider';
import Reminder from './Components/Reminder';
import SupportCommunity from './Pages/SupportCommunity';


function App() {
  return (
  
     <div className='flex flex-wrap flex-col'>
       <GoalsProvider>
        {/* <Auth/> */}
       {/* <MentalHealth/> */}
        <Reminder/>
         <Router>
          <nav className=' space-x-4'>
          <Link to="/">Dashboard</Link>
            <Link to="/Community">Support & Community</Link>
            <Link to="/MentalHealth">Mental Health</Link>
          </nav>
          <Routes>
            <Route path="/" element={<Dashboard/>} />
           <Route path="/goals" element={<Goals />} />
            <Route path="/Community" element={<SupportCommunity/>}/>
            <Route path="/MentalHealth" element={<MentalHealth/>} />
            {/* You can add more routes here as needed this was hust an example of how you can route */}
          </Routes>
             </Router>
       </GoalsProvider>
     </div>
  )
}

export default App
