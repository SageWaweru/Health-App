import { useState, useEffect } from "react";
import GoalsContext from "./GoalsContext";
import PropTypes from "prop-types";

const calculateNextReminder = (frequency, unit) => {
  const nextReminder = new Date();

  if (isNaN(nextReminder.getTime())) {
    console.error("Invalid current date");
    return null;
  }

  if (isNaN(frequency) || frequency <= 0) {
    console.error("Invalid frequency:", frequency);
    return null;
  }

  switch (unit) {
    case "minutes":
      nextReminder.setMinutes(nextReminder.getMinutes() + frequency);
      break;
    case "hours":
      nextReminder.setHours(nextReminder.getHours() + frequency);
      break;
    case "days":
      nextReminder.setDate(nextReminder.getDate() + frequency);
      break;
    case "weeks":
      nextReminder.setDate(nextReminder.getDate() + frequency * 7);
      break;
    default:
      console.error("Invalid unit:", unit);
      return null;
  }

  return nextReminder.toISOString();
};


export const GoalsProvider = ({ children }) => {
  const [filter, setFilter] = useState('All');
  const [goals, setGoals] = useState([
    {
      title: "Drink Water",
      date:"09/03/2024",
      reminderFrequency: 1,
      reminderUnit: "days",
      nextReminder: calculateNextReminder(1, "days"),
      completed: false,
      id: Date.now(),
    },
  ]);

  const addGoal = (goal) => {
    const { reminderFrequency = 1, reminderUnit = "days" } = goal;
    const newGoal = {
      ...goal,
      id: Date.now(),
      completed: false,
      reminderFrequency,
      reminderUnit,
      nextReminder: calculateNextReminder(reminderFrequency, reminderUnit),
    };

    setGoals((prevGoals) => [...prevGoals, newGoal]);
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

 
  useEffect(() => {
    console.log("Updated Goals:", goals);
  }, [goals]);

  return (
    <GoalsContext.Provider value={{ goals: filteredGoals, addGoal, markComplete, deleteGoal, setFilter, setGoals }}>
      {children}
    </GoalsContext.Provider>
  );
};

GoalsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
