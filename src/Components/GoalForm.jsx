import { useContext, useState } from 'react'
import GoalsContext from '../Context/GoalsContext';

function GoalForm() {
    const {addGoal}= useContext(GoalsContext);
    const [title, setTitle]= useState("");
    const [reminderTime, setReminderTime]= useState("");
    const [dueDate, setDueDate]= useState("");

    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (title.trim()) {
            const [hours, minutes] = reminderTime.split(":").map(Number);
            const nextReminder = new Date();
            nextReminder.setHours(hours, minutes, 0, 0);
            addGoal({
                title,
                reminderTime,
                nextReminder:  nextReminder.toISOString(),
            });
            setTitle("");
            setReminderTime("");
            setDueDate("");
        }
    };
    
  return (
    <div className='bg-stone-50 w-96 shadow-lg rounded-md' >
        <h2 className='bg-cyan-800 w-96 self-center rounded h-12 text-center text-xl text-orange-50 pt-2'>Goal Setting & Habit Reminders</h2>
        <form onSubmit={handleSubmit} className='flex flex-col flex-wrap text-left p-6'>
            <label htmlFor="goal " className='mb-2' >Goal Name</label> 
         <input type="text" placeholder='Enter Goal' value={title} onChange={(e)=>setTitle(e.target.value)}required className='h-10 rounded-md p-2 shadow-md' /> 
         <label htmlFor="frequency" className='mb-2 mt-4'>Reminder Time</label> 
         <input type="time" value={reminderTime} onChange={(e)=>setReminderTime(e.target.value)}required className='h-10 rounded-md p-2 shadow-md'/> 
        <label htmlFor="dueDate" className='mb-2 mt-4'>Due Date(if applicable)</label> 
         <input type="date" placeholder='Due Date(If applicable)' value={dueDate} onChange={(e)=>setDueDate(e.target.value)} className='h-10 rounded-md p-2 shadow-md'/> <br />
         <button className='bg-cyan-800 h-10 text-orange-50' type='submit'>Add Goal</button>
        </form>
    </div>
  );
};

export default GoalForm;