import { useState, useEffect } from "react";
import GoalsContext from "./GoalsContext";
import PropTypes from "prop-types";
import { db } from "../firebase-config";
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';

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
  const [filter, setFilter] = useState("All");
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    const fetchGoals = async () => {
      const goalsCollection = collection(db, "goals");
      const goalsSnapshot = await getDocs(goalsCollection);
      const goalsList = goalsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setGoals(goalsList);
    };
    
    fetchGoals();
  }, []);

  const addGoal = async (goal) => {
    const { reminderFrequency = 1, reminderUnit = "days" } = goal;
    const newGoal = {
      ...goal,
      completed: false,
      reminderFrequency,
      reminderUnit,
      nextReminder: calculateNextReminder(reminderFrequency, reminderUnit),
    };

    try {
      const docRef = await addDoc(collection(db, "goals"), newGoal);
      setGoals((prevGoals) => [...prevGoals, { ...newGoal, id: docRef.id }]);
    } catch (error) {
      console.error("Error adding goal:", error);
    }
  };

  const markComplete = async (goalId) => {
    const goal = goals.find((g) => g.id === goalId);
    if (!goal) return;

    try {
      const goalRef = doc(db, "goals", goalId);
      await updateDoc(goalRef, { completed: !goal.completed });
      setGoals((prevGoals) =>
        prevGoals.map((goal) =>
          goal.id === goalId ? { ...goal, completed: !goal.completed } : goal
        )
      );
    } catch (error) {
      console.error("Error updating goal completion status:", error);
    }
  };

  const deleteGoal = async (goalId) => {
    try {
      const goalRef = doc(db, "goals", goalId);
      await deleteDoc(goalRef);
      setGoals((prevGoals) => prevGoals.filter((goal) => goal.id !== goalId));
    } catch (error) {
      console.error("Error deleting goal:", error);
    }
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
