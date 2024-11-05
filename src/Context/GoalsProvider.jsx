import { useState } from "react";
import GoalsContext from "./GoalsContext"
import PropTypes from "prop-types";


export const GoalsProvider = ({ children }) => {
    const [filter, setFilter]= useState('All');
    const [goals, setGoals] = useState([
      { title: "Drink Water", nextReminder: new Date(Date.now() + 60000).toISOString(), completed: false, id: Date.now() },
    ]);
  
    const addGoal = (goal) => {
      const newGoal = {
          ...goal,
          id: Date.now(),
          completed: false,
          nextReminder: goal.nextReminder, // Directly use nextReminder as set by user
      };
      
      setGoals((prevGoals) => [...prevGoals, newGoal]);
      console.log("Goals Context:", goals);
  };
  
    const markComplete = (goalId) => {
      setGoals((prevGoals) =>
        prevGoals.map((goal) =>
          goal.id === goalId ? { ...goal, completed: !goal.completed } : goal
        )
      );
    };
  
    const deleteGoal = (goalId) => {
      setGoals((prevGoals) => prevGoals.filter((goal) => goal.id !== goalId));
    };
  
    const filteredGoals = goals.filter((goal) => {
        if (filter === "all") return true;
        if (filter === "active") return !goal.completed;
        if (filter === "completed") return goal.completed;
        return true;
      });

    return (
      <GoalsContext.Provider value={{ goals:filteredGoals, addGoal, markComplete, deleteGoal,setFilter,setGoals }}>
        {children}
      </GoalsContext.Provider>
    );
  };

  GoalsProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };