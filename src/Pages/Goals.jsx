import GoalForm from '../Components/GoalForm'
import Footer from '../Components/Footer.jsx'
import { useTheme } from '../Context/ThemeContext.jsx'

function Goals() {
  const { theme } = useTheme();

  return (
    <div className={`rounded-lg h-96 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
<GoalForm/>
<Footer/>
    </div>
  )
}

export default Goals