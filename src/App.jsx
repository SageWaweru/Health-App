import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css'
import MentalHealth from './Pages/MentalHealth';
import Dashboard from './Pages/Dashboard';
import Goals from './Pages/Goals';
import { GoalsProvider } from './Context/GoalsProvider';
import Reminder from './Components/Reminder';

function App() {

  return (
  
     <div className='flex flex-wrap flex-col'>
       <GoalsProvider>
       <MentalHealth/>
        <Reminder/>
         <Router>
          <nav>
          <Link to="/">Dashboard</Link>
            <Link to="/footer">Footer</Link>
          </nav>
          <Routes>
            <Route path="/" element={<Dashboard/>} />
           <Route path="/goals" element={<Goals />} />
            <Route path="/footer" element={<Footer/>} />
            {/* You can add more routes here as needed this was hust an example of how you can route */}
          </Routes>
             </Router>
       </GoalsProvider>
     </div>
  )
}

export default App
