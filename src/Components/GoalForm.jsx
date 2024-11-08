import { useContext, useState, useEffect } from "react";
import GoalsContext from "../Context/GoalsContext";
import { db } from "../firebase-config";
import { collection, addDoc, updateDoc, doc, getDoc } from "firebase/firestore";
import PropTypes from "prop-types";

function GoalForm({ goalIdToEdit, setGoalIdToEdit }) {
  const { addGoal } = useContext(GoalsContext);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [reminderTime, setReminderTime] = useState("");
  const [reminderInterval, setReminderInterval] = useState("");
  const [reminderUnit, setReminderUnit] = useState("minutes");

  useEffect(() => {
    if (goalIdToEdit) {
      const fetchGoal = async () => {
        const goalDoc = await getDoc(doc(db, "goals", goalIdToEdit));
        if (goalDoc.exists()) {
          const goalData = goalDoc.data();
          setTitle(goalData.title);
          setDate(goalData.date);
          setReminderTime(goalData.reminderTime);
          setReminderInterval(goalData.reminderInterval.toString());
          setReminderUnit(goalData.reminderUnit);
        }
      };
      fetchGoal();
    }
  }, [goalIdToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Please enter a goal title");
      return;
    }

    if (!reminderTime) {
      alert("Please select a reminder time.");
      return;
    }

    const [hours, minutes] = reminderTime.split(":").map(Number);

    if (isNaN(hours) || isNaN(minutes)) {
      alert("Invalid reminder time format. Please use HH:mm.");
      return;
    }

    const nextReminder = new Date();
    nextReminder.setHours(hours, minutes, 0, 0);

    if (isNaN(nextReminder.getTime())) {
      alert("Invalid date created. Please check the reminder time.");
      return;
    }

    const goalData = {
      title,
      date,
      reminderTime,
      nextReminder: nextReminder.toISOString(),
      reminderInterval: parseInt(reminderInterval, 10) || 1,
      reminderUnit,
    };

    try {
      if (goalIdToEdit) {
        await updateDoc(doc(db, "goals", goalIdToEdit), goalData);
        alert("Goal updated successfully!");
      } else {
        await addDoc(collection(db, "goals"), goalData);
        addGoal(goalData);
        alert("Goal added successfully!");
      }
      setTitle("");
      setDate("");
      setReminderTime("");
      setReminderInterval("");
      setReminderUnit("minutes");
      setGoalIdToEdit(null);
    } catch (error) {
      console.error("Error saving goal: ", error);
    }
  };

  return (
    <div className="bg-stone-50 w-96 shadow-lg rounded-md self-center">
      <h2 className="bg-cyan-800 w-96 self-center rounded-t-md font-semibold h-12 text-center text-xl text-orange-50 pt-2">
        {goalIdToEdit ? "Edit Goal" : "Add Goal"}
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col flex-wrap text-left p-6">
        <label htmlFor="goal" className="mb-2">Goal Name</label>
        <input
          type="text"
          placeholder="Enter Goal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="h-10 rounded-md p-2 shadow-md"
        />
        <label htmlFor="date" className="mb-2 mt-4">Date Set</label>
        <input
          type="Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="h-10 rounded-md p-2 shadow-md"
        />
        <label htmlFor="time" className="mb-2 mt-4">Reminder Time</label>
        <input
          type="time"
          value={reminderTime}
          onChange={(e) => setReminderTime(e.target.value)}
          className="h-10 rounded-md p-2 shadow-md"
        />
        <label htmlFor="frequency" className="mb-2 mt-4">Reminder Frequency</label>
        <input
          type="number"
          placeholder="Every 1 Minute"
          value={reminderInterval}
          onChange={(e) => setReminderInterval(e.target.value)}
          className="h-10 rounded-md p-2 shadow-md"
        />
        <br />
        <select value={reminderUnit} onChange={(e) => setReminderUnit(e.target.value)}>
          <option value="minutes">Minutes</option>
          <option value="hours">Hours</option>
          <option value="days">Days</option>
          <option value="weeks">Weeks</option>
        </select>
        <br />
        <button className="bg-cyan-800 h-10 text-orange-50" type="submit">
          {goalIdToEdit ? "Update Goal" : "Add Goal"}
        </button>
        {goalIdToEdit && (
          <button
            type="button"
            onClick={() => setGoalIdToEdit(null)}
            className="mt-2 bg-orange-600 h-10 text-orange-50"
          >
            Cancel Edit
          </button>
        )}
      </form>
    </div>
  );
}

GoalForm.propTypes = {
  goalIdToEdit: PropTypes.string,  
  setGoalIdToEdit: PropTypes.func.isRequired, 
};

export default GoalForm;
