import { useContext, useState } from "react";
import GoalsContext from "../Context/GoalsContext";

function GoalForm() {
  const { addGoal } = useContext(GoalsContext);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [reminderTime, setReminderTime] = useState("");
  const [reminderInterval, setReminderInterval] = useState("");
  const [reminderUnit, setReminderUnit] = useState("minutes");

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Ensure the title is not empty
    if (!title.trim()) {
      alert("Please enter a goal title");
      return;
    }
  
    // Ensure reminderTime is not empty and is in the correct format
    if (!reminderTime) {
      alert("Please select a reminder time.");
      return;
    }
  
    const [hours, minutes] = reminderTime.split(":").map(Number);
  
    // Check if the split resulted in valid hours and minutes
    if (isNaN(hours) || isNaN(minutes)) {
      alert("Invalid reminder time format. Please use HH:mm.");
      return;
    }
  
    const nextReminder = new Date();
    nextReminder.setHours(hours, minutes, 0, 0);
  
    // If the date is invalid (due to an incorrect `reminderTime` or other issue)
    if (isNaN(nextReminder.getTime())) {
      alert("Invalid date created. Please check the reminder time.");
      return;
    }
  
    // Add the goal
    addGoal({
      title,
      date,
      reminderTime,
      nextReminder: nextReminder.toISOString(),
      reminderInterval: parseInt(reminderInterval, 10) || 1,
      reminderUnit,
    });
  
    // Reset form after submission
    setTitle("");
    setDate("");
    setReminderTime("");
    setReminderInterval(""); 
    setReminderUnit("minutes");
  };
  

  return (
    <div className="bg-stone-50 w-96 shadow-lg rounded-md">
      <h2 className="bg-cyan-800 w-96 self-center rounded-t-md font-semibold h-12 text-center text-xl text-orange-50 pt-2">
        Goal Setting & Habit Reminders
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col flex-wrap text-left p-6">
        <label htmlFor="goal" className="mb-2">
          Goal Name
        </label>
        <input
          type="text"
          placeholder="Enter Goal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="h-10 rounded-md p-2 shadow-md"
        />
         <label htmlFor="date" className="mb-2 mt-4">
          Date Set
        </label>
        <input
          type="Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="h-10 rounded-md p-2 shadow-md"
        />
        <label htmlFor="time" className="mb-2 mt-4">
          Reminder Time
        </label>
        <input
          type="time"
          value={reminderTime}
          onChange={(e) => setReminderTime(e.target.value)}
          className="h-10 rounded-md p-2 shadow-md"
        />
        <label htmlFor="frequency" className="mb-2 mt-4">
          Reminder Frequency
        </label>
        <input
          type="number"
          placeholder="Every 1 Minute"
          value={reminderInterval}
          onChange={(e) => setReminderInterval(e.target.value)}
          className="h-10 rounded-md p-2 shadow-md"
        />{" "}
        <br />
        <select value={reminderUnit} onChange={(e) => setReminderUnit(e.target.value)}>
          <option value="minutes">Minutes</option>
          <option value="hours">Hours</option>
          <option value="days">Days</option>
          <option value="weeks">Weeks</option>
        </select>{" "}
        <br />
        <button className="bg-cyan-800 h-10 text-orange-50" type="submit">
          Add Goal
        </button>
      </form>
    </div>
  );
}

export default GoalForm;
