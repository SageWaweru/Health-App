import { useContext } from "react";
import GoalsContext from "../Context/GoalsContext";

const FilterButtons =()=>{
    const {setFilter} = useContext(GoalsContext);
    return (
        
        <div className="mb-6">
             <button onClick={() => setFilter("active")}  className="bg-cyan-800 w-24  m-2 text-orange-50">
            Active
          </button>
          <button onClick={() => setFilter("all")}  className="bg-orange-600 w-24 m-2 text-orange-50">
            All
          </button>
          <button onClick={() => setFilter("completed")}  className="bg-emerald-800 w-24  m-2 text-orange-50">
            Completed
          </button>
        </div>
      );
}
export default FilterButtons;
