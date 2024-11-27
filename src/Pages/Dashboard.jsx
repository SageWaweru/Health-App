{/* <h1>
  The first screen users see after logging in. It provides a summary of goals,
  health logs, recent journal entries, or notifications (such as reminders and
  new forum posts).
</h1>; */}

import { Link, Outlet } from 'react-router-dom'
import GoalList from '../Components/GoalList'
import Footer from '../Components/Footer.jsx'
import { useTheme } from "../Context/ThemeContext"; 


function Dashboard() {
  const { theme } = useTheme();

  return (
    <div style={{ width: "80vw", maxWidth: "80vw" }} className={`flex flex-wrap flex-col max-w-4xl mx-auto ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
      <div className="bg-custom-image bg-cover bg-center  h-96 flex flex-wrap rounded-md  flex-col justify-center mb-10">
        <h1 className={`text-3xl ${theme === 'dark' ? 'text-gray-600' : 'text-orange-600 outline-2 outline-cyan-800'}`}>Set Your Goals <br /> and Start The Journey To being Your Best Self!</h1>
        <span className={`h-10 text-center flex flex-row justify-center align-center w-40 self-center m-6 rounded-md ${theme === 'dark' ? 'bg-orange-700 text-orange-50' : 'bg-orange-600 text-amber-50'}`}>
      <Link to="/goals" className='text-center text-2xl'>Set Goals</Link>
     </span>
      </div>
      <div className={`shadow-lg p-2 ${theme === 'dark' ? 'bg-gray-600 text-white' : 'bg-stone-100 text-black'}`}>
        <h1 className={`text-2xl ${theme === 'dark' ? 'bg-gray-600 text-white' : 'bg-stone-100 text-black'}`}>Goals</h1>
        <GoalList/>
      </div>
     <Outlet/>
      <div>
        
      </div>
<Footer/>
    </div>
  )
}

export default Dashboard
