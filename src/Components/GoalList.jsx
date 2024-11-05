import { useContext } from "react"
import GoalsContext from "../Context/GoalsContext"
import FilterButtons from '../Components/FilterButtons'

function GoalList() {
    const{goals, markComplete,deleteGoal}= useContext(GoalsContext)
    
  return (
    <div>
              <FilterButtons/>
        {goals.map((goal)=>(
            <div key={goal.id} className="bg-white mb-2 flex p-2 rounded flex justify-between">
                <div className="flex ">
                    <input type="checkbox" role="button" onClick={()=>markComplete(goal.id)} className="mr-2"/>
                    <h3 className={goal.completed ? "line-through" : ""}>{goal.title}</h3>
                </div>
                <button onClick={() => deleteGoal(goal.id)} className="bg-cyan-800 text-orange-50 w-24 float-right">Delete</button>
            </div>
        ))}
    </div>
  )
}

export default GoalList