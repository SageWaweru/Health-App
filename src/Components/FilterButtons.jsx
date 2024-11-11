import { useContext } from "react";
import GoalsContext from "../Context/GoalsContext";
import { useTheme } from "../Context/ThemeContext";

const FilterButtons =()=>{
  const {theme}=useTheme();
    const {setFilter} = useContext(GoalsContext);
    return (
        
        <div className="mb-6">
             <button onClick={() => setFilter("active")}  className={`w-24  m-2 text-orange-50 ${theme === 'dark' ? 'bg-cyan-700' : 'bg-cyan-800'}`}>
            Active
          </button>
          <button onClick={() => setFilter("all")}  className={`w-24 m-2 text-orange-50 ${theme === 'dark' ? 'bg-orange-700 ' : 'bg-orange-600'}`}>
            All
          </button>
          <button onClick={() => setFilter("completed")}  className={`w-24  m-2 text-orange-50 ${theme === 'dark' ? 'bg-emerald-700' : 'bg-emerald-800'}`}>
            Completed
          </button>
        </div>
      );
}
export default FilterButtons;
