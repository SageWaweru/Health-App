import { useContext, useState, useEffect } from "react";
import GoalsContext from "../Context/GoalsContext";
import { db, auth } from "../firebase-config";  // Import auth
import { collection, addDoc, updateDoc, doc, getDoc } from "firebase/firestore";
import PropTypes from "prop-types";
import { useTheme } from "../Context/ThemeContext"; 


function GoalForm({ goalIdToEdit, setGoalIdToEdit }) {
  const { theme } = useTheme();
  const { addGoal } = useContext(GoalsContext);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [reminderTime, setReminderTime] = useState("");
  const [reminderInterval, setReminderInterval] = useState("");
  const [reminderUnit, setReminderUnit] = useState("minutes");

  // Fetch goal data for editing
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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentUser = auth.currentUser;  // Get the current user
    if (!currentUser) {
      alert("Please sign in to create or edit goals.");
      return;
    }
    if (!title.trim()) {
      alert("Please enter a goal title");
      return;
    }

    if (!reminderTime) {
      alert("Please select a reminder time.");
      return;
    }

    // Validate the reminder time format
    const [hours, minutes] = reminderTime.split(":").map(Number);

    if (isNaN(hours) || isNaN(minutes)) {
      alert("Invalid reminder time format. Please use HH:mm.");
      return;
    }

    // Ensure hours and minutes are valid ranges
    if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
      alert("Reminder time should be between 00:00 and 23:59.");
      return;
    }

    // Calculate next reminder time
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
      userId: currentUser.uid,  // Associate goal with current user
    };

    try {
      if (goalIdToEdit) {
        // Update existing goal
        await updateDoc(doc(db, "goals", goalIdToEdit), goalData);
        alert("Goal updated successfully!");
      } else {
        // Add new goal
        await addDoc(collection(db, "goals"), goalData);
        addGoal(goalData);
        alert("Goal added successfully!");
      }

      // Reset form and close the goal form
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
    <div className={`flex justify-center p-6 rounded-md ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
      <div style={{width:"50vw"}} className={`shadow-lg rounded-md ${theme === 'dark' ? 'bg-gray-200 text-black' : 'bg-stone-50 text-black'}`}>
        <h2 style={{width:"50vw"}}  className="bg-cyan-800 self-center rounded-t-md font-semibold h-12 text-center text-xl text-orange-50 pt-2">
          {goalIdToEdit ? "Edit Goal" : "Add Goal"}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col flex-wrap text-left p-6">
          <div className="grid grid-cols-2 gap-8">
            <div className="flex flex-col">
              <label htmlFor="goal" className="mb-2">Goal Name</label>
              <input
                type="text"
                placeholder="Enter Goal"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className={`h-10 rounded-md p-2 shadow-md ${theme === 'dark' ? 'text-gray-600' : 'text-black'}`}
              />
              <label htmlFor="date" className="mb-2 mt-4">Date Set</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className={`h-10 rounded-md p-2 shadow-md ${theme === 'dark' ? 'text-gray-600' : 'text-black'}`}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="time" className="mb-2">Reminder Time</label>
              <input
                type="time"
                value={reminderTime}
                onChange={(e) => setReminderTime(e.target.value)}
                className={`h-10 rounded-md p-2 shadow-md ${theme === 'dark' ? 'text-gray-600' : 'text-black'}`}
              />
              <label htmlFor="frequency" className="mb-2 mt-4">Reminder Frequency</label>
              <input
                type="number"
                placeholder="Every 1 Minute"
                value={reminderInterval}
                onChange={(e) => setReminderInterval(e.target.value)}
                className={`h-10 rounded-md p-2 shadow-md ${theme === 'dark' ? 'text-gray-600' : 'text-black'}`}
              />
              <br />
              <select value={reminderUnit} onChange={(e) => setReminderUnit(e.target.value)} className={`shadow-md h-8 rounded-md ${theme === 'dark' ? 'text-gray-600 bg-white' : 'bg-stone-50 text-black'}`}>
                <option value="minutes">Minutes</option>
                <option value="hours">Hours</option>
                <option value="days">Days</option>
                <option value="weeks">Weeks</option>
              </select>
              <br />
            </div>
          </div>
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
    </div>
  );
}

GoalForm.propTypes = {
  goalIdToEdit: PropTypes.string,  
  setGoalIdToEdit: PropTypes.func.isRequired, 
};

export default GoalForm;

