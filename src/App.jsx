// import Auth from './Pages/Auth'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import MentalHealth from "./Pages/MentalHealth";
import Dashboard from "./Pages/Dashboard";
import Goals from "./Pages/Goals";
import { GoalsProvider } from "./Context/GoalsProvider";
import Reminder from "./Components/Reminder";
import SupportCommunity from "./Pages/SupportCommunity";
import Fitness from "./Pages/Fitness.jsx";
import {UserRoundPen} from "lucide-react";

function App() {
  return (
    <div className="flex flex-wrap flex-col">
      <GoalsProvider>
        <Reminder />
        <Router>
          <nav className="p-3 shadow-lg pb-3 mb-4 container mx-auto flex justify-between items-center">
            
            <div className="gap-2 mb-4 space-x-4 items-center ">
            <Link to="/">Dashboard</Link>
            <Link to="/Community">Support & Community</Link>
            <Link to="/MentalHealth">Mental Health</Link>
            <Link to="/Fitness">Fitness</Link>
            <Link to="/User">Login</Link>
          </div>
           <div>
              <Link to="/Profile" ><UserRoundPen/></Link>
            </div>
          </nav>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/goals" element={<Goals />} />
            <Route path="/Community" element={<SupportCommunity />} />
            <Route path="/MentalHealth" element={<MentalHealth />} />
            {/* <Route path="/User" element={<Auth/>} /> */}
            <Route path="/Fitness" element={<Fitness />} />

            {/* You can add more routes here as needed this was hust an example of how you can route */}
          </Routes>
        </Router>
      </GoalsProvider>
    </div>
  );
}

export default App;
