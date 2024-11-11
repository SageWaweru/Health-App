import { useContext,useState } from "react";
import GoalsContext from "../Context/GoalsContext";
import FilterButtons from '../Components/FilterButtons';
import GoalForm from "./GoalForm";
import { useTheme } from "../Context/ThemeContext"; 


function GoalList() {
  const { theme } = useTheme();
  const { goals, markComplete, deleteGoal } = useContext(GoalsContext);
  const [goalIdToEdit, setGoalIdToEdit] = useState(null);

  return (
    <div className={`${theme === 'dark' ? 'bg-gray-800 ' : 'bg-stone-white'}`}>
      <div className={` mb-4 ${theme === 'dark' ? 'bg-gray-600 text-white' : 'bg-stone-100 text-black'}`}>
        <FilterButtons />
        {goals.length > 0 ? (
          goals.map((goal) => (
            <div key={goal.id} className={`mb-2  p-2 rounded flex flex-col ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
              <h2 className="mb-2 flex align-left">
                {new Date(goal.date).toLocaleDateString() || goal.date}
              </h2>
              <div className="flex justify-between">
                <div className="flex p-2">
                  <input
                    type="checkbox"
                    role="button"
                    checked={goal.completed}
                    onChange={() => markComplete(goal.id)}
                    className="mr-2"
                  />
                  <h3 className={goal.completed ? "line-through" : ""}>{goal.title}</h3>
                </div>
                <div className="space-x-4 float-right">
                  <button
                    onClick={() => deleteGoal(goal.id)}
                    className={`text-orange-50 w-24 ${theme === 'dark' ? 'bg-cyan-700' : 'bg-cyan-800'}`}
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => setGoalIdToEdit(goal.id)}
                    className={`text-orange-50 w-24 ${theme === 'dark' ? 'bg-orange-700' : 'bg-orange-600'}`}
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className={`${theme === 'dark' ? 'text-white ' : 'text-gray-500'}`}>No goals to display.</p>
        )}
       
      </div>
       <div className={`p-4 flex justify-center ${theme === 'dark' ? 'bg-gray-800 ' : 'bg-stone-100 '}`}>
          {goalIdToEdit && (
            <GoalForm goalIdToEdit={goalIdToEdit} setGoalIdToEdit={setGoalIdToEdit}  />
          )}
        </div>
    </div>
  );
}

export default GoalList;
