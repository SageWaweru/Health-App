import { useEffect,useContext } from "react";
import GoalsContext from "../Context/GoalsContext";

function requestPermission() {
    if ("Notification" in window) {
        Notification.requestPermission().then((permission) => {
            if (permission === "granted") {
              console.log("Notification permission granted.");
            } else {
            alert("To recieve your reminders, allow us to send you notifications in settings");
            }
          });
    }
  }

  const updateReminder = (goal) => {
    const updatedGoal = { ...goal };
    const nextReminder = new Date(updatedGoal.nextReminder);
    nextReminder.setDate(nextReminder.getDate() + 1); 
    updatedGoal.nextReminder = nextReminder.toISOString();
    return updatedGoal;
  };
  
function Reminder() {
    const{goals, setGoals} = useContext(GoalsContext);

    useEffect(()=>{
        requestPermission();

        const sendNotification = (title, body) => {
            if (Notification.permission === "granted") {
                console.log("Sending notification for goal:", title); 
              new Notification(title, { body });
            }
          };

        const interval = setInterval(()=>{
            const now = new Date ();
            console.log("Current time:", now);
            console.log("Checking reminders at:", now);
            setGoals((prevGoals) =>
            prevGoals.map((goal) => {
                console.log("Current goal:", goal);
                console.log("Goal nextReminder:", goal.nextReminder);
               if(goal.nextReminder && new Date(goal.nextReminder) <=now){
                console.log("Sending notification for goal:", goal.title);
                sendNotification(`Remember to ${goal.title}`);
                return updateReminder(goal);
               } 
               return goal;
            })
        );
        }, 60000);
        return () => clearInterval(interval); 
    }, [goals,setGoals]);
  
  return null;
}

export default Reminder;