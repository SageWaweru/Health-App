import { useEffect, useContext } from "react";
import GoalsContext from "../Context/GoalsContext";

const calculateNextReminder = (current, interval, unit) => {
  const next = new Date(current);

  if (isNaN(next.getTime())) {
    console.error("Invalid date:", current);
    return null; 
  }

  switch (unit) {
    case "minutes":
      next.setMinutes(next.getMinutes() + interval);
      break;
    case "hours":
      next.setHours(next.getHours() + interval);
      break;
    case "days":
      next.setDate(next.getDate() + interval);
      break;
    case "weeks":
      next.setDate(next.getDate() + interval * 7);
      break;
    default:
      console.error("Invalid unit:", unit);
      return null; 
  }

 
  return next.toISOString();
};


function requestPermission() {
  if ("Notification" in window) {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        console.log("Notification permission granted.");
      } else {
        alert("To receive your reminders, allow us to send you notifications in settings");
      }
    });
  }
}

function Reminder() {
  const { goals, setGoals } = useContext(GoalsContext);

  useEffect(() => {
    requestPermission();

    const sendNotification = (title, body) => {
      if (Notification.permission === "granted") {
        console.log("Sending notification for goal:", title);
        new Notification(title, { body });
      }
    };

    const interval = setInterval(() => {
      const now = new Date();
      console.log("Current time:", now);
      console.log("Checking reminders at:", now);

   
      setGoals((prevGoals) =>
        prevGoals.map((goal) => {
          console.log("Current goal:", goal);
          console.log("Goal nextReminder:", goal.nextReminder);
    
          if (goal.nextReminder && new Date(goal.nextReminder) <= now) {
            console.log("Sending notification for goal:", goal.title);
            sendNotification(`Remember to ${goal.title}`);
    

            const nextReminder = calculateNextReminder(now, goal.reminderInterval, goal.reminderUnit);
    
            if (nextReminder) {
              return { ...goal, nextReminder };
            } else {
             
              console.error("Invalid nextReminder value for goal:", goal.title);
              return goal;
            }
          }
          return goal;
        })
      );
    }, 60000); 

    return () => clearInterval(interval); 
  }, [goals, setGoals]);

  return null;
}

export default Reminder;
