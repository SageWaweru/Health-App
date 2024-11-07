{/* <h1>
  The first screen users see after logging in. It provides a summary of goals,
  health logs, recent journal entries, or notifications (such as reminders and
  new forum posts).
</h1>; */}

import { Link, Outlet } from 'react-router-dom'
import GoalList from '../Components/GoalList'
function Dashboard() {
  
  return (
    <div style={{ width: "80vw", maxWidth: "80vw" }} className='flex flex-wrap flex-col max-w-4xl mx-auto  '>
      <div className="bg-custom-image bg-cover bg-center  h-96 flex flex-wrap rounded-md  flex-col justify-center mb-10">
        <h1 className=' text-3xl'>Set Your Goals <br /> and Start The Journey To being Your Best Self!</h1>
        <span className='bg-orange-600 h-10 text-center flex flex-row justify-center align-center w-40 self-center m-6 rounded-md'>
      <Link to="/goals" className='text-center text-2xl text-amber-50'>Set Goals</Link>
     </span>
      </div>
      <div className='bg-stone-100 shadow-lg p-2'>
        <h1 className='text-2xl'>Goals</h1>
        <GoalList/>
      </div>
     <Outlet/>
      <div>
        
      </div>
    </div>
  )
}

export default Dashboard
