import { db } from "../Components/Firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import {
  Droplets,
  Dumbbell,
  Moon,
  Pencil,
  Save,
  Clock,
  Bell,
} from "lucide-react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  BarChart,
  Bar,
  ReferenceLine,
} from "recharts";
import CustomAlert from "../Components/CustomAlert";
import FitnessFeedback from "../Components/FitnessFeedback";

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function Fitness() {
  // Display Current Day
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  // Input Cards State
  const [waterIntake, setWaterIntake] = useState(0);
  const [sleepHours, setSleepHours] = useState(8);
  const [goal, setGoal] = useState("stay-hydrated");
  const [alerts, setAlerts] = useState([]);
  const [exercises, setExercises] = useState({
    cardio: 0,
    strength: 0,
    flexibility: 0,
    sports: 0,
  });

  const [weeklyData, setWeeklyData] = useState([]);

  // Editing States
  const [isEditing, setIsEditing] = useState(false);
  const [latestDocId, setLatestDocId] = useState(null);

  // Update current date/time
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Water reminder every 2 hours
  useEffect(() => {
    const reminderInterval = setInterval(() => {
      const newAlert = {
        id: Date.now(),
        message: "Time to drink water! Stay hydrated throughout the day.",
        type: "info",
      };
      setAlerts((curr) => [...curr, newAlert]);
    }, 7200000); // 2 hours
    return () => clearInterval(reminderInterval);
  }, []);

  // Handle alert removal
  const removeAlert = (alertId) => {
    setAlerts((curr) => curr.filter((alert) => alert.id !== alertId));
  };

  // Assign Day of the week
  const getDayOfWeek = () => {
    const today = new Date();
    const dayIndex = today.getDay(); // Get day index (0 = Sunday, 6 = Saturday)
    return weekDays[dayIndex === 0 ? 6 : dayIndex - 1]; // Adjust if Sunday (0) to Sunday=6
  };

  // Fetch Weekly Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "fitness"));
        const formattedData = weekDays.map((day) => {
          const dayData = querySnapshot.docs
            .map((doc) => doc.data())
            .find((data) => data.dayOfWeek === day);

          return {
            dayOfWeek: day,
            waterIntake: dayData ? dayData.waterIntake : 0,
            sleepHours: dayData ? dayData.sleepHours : 0,
            cardioTime: dayData ? dayData.cardioTime || 0 : 0,
            strengthTrainingTime: dayData
              ? dayData.strengthTrainingTime || 0
              : 0,
            yogaTime: dayData ? dayData.yogaTime || 0 : 0,
            sportsTime: dayData ? dayData.sportsTime || 0 : 0,
            // Calculate total exercise time
            totalExercise: dayData
              ? (dayData.cardioTime || 0) +
                (dayData.strengthTrainingTime || 0) +
                (dayData.yogaTime || 0) +
                (dayData.sportsTime || 0)
              : 0,
          };
        });

        setWeeklyData(formattedData);
        console.log(formattedData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  // Fetch Latest Document
  useEffect(() => {
    const fetchLatestDoc = async () => {
      const q = query(
        collection(db, "fitness"),
        orderBy("createdAt", "desc"),
        limit(1)
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        const data = doc.data();
        setLatestDocId(doc.id);
        setWaterIntake(data.waterIntake || 0);
        setSleepHours(data.sleepHours || 8);
        setExercises({
          cardio: data.cardioTime || 0,
          strength: data.strengthTrainingTime || 0,
          flexibility: data.yogaTime || 0,
          sports: data.sportsTime || 0,
        });
      }
    };
    fetchLatestDoc();
  }, []);

  const handleEdit = () => setIsEditing(true);

  // store our db collection in a ref
  // const fitnessDataRef = collection(db, "fitness");

  // Function to save data to database
  const handleSave = async () => {
    const currentDay = getDayOfWeek();
    try {
      if (isEditing && latestDocId) {
        const docRef = doc(db, "fitness", latestDocId);
        await updateDoc(docRef, {
          waterIntake,
          sleepHours,
          cardioTime: exercises.cardio,
          strengthTrainingTime: exercises.strength,
          yogaTime: exercises.flexibility,
          sportsTime: exercises.sports,
          dayOfWeek: currentDay,
        });
        setIsEditing(false);
      } else {
        await addDoc(collection(db, "fitness"), {
          waterIntake,
          sleepHours,
          cardioTime: exercises.cardio,
          strengthTrainingTime: exercises.strength,
          yogaTime: exercises.flexibility,
          sportsTime: exercises.sports,
          createdAt: new Date(), // Timestamp for sorting
          dayOfWeek: currentDay,
        });
      }
    } catch (error) {
      console.error("Error saving document: ", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header Section with DateTime and Profile Selection*/}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Daily Health Tracker</h1>
          <div className="flex items-center gap-2 text-gray-600">
            <Clock size={16} />
            {currentDateTime.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>

        <select
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          className="p-2 border rounded-lg bg-white text-black"
        >
          <option value="stay-hydrated">Stay Hydrated</option>
          <option value="sleep-better">Sleep Better</option>
          <option value="exercise-more">Exercise More</option>
        </select>
      </div>

      {/* Water Reminder Alert */}
      <div className="fixed top-4 right-4 z-50 space-y-4">
        {alerts.map((alert) => (
          <CustomAlert
            key={alert.id}
            message={alert.message}
            type={alert.type}
            onClose={() => removeAlert(alert.id)}
          />
        ))}
      </div>

      {/* Input cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Water Input section */}
        <div className="p-6 bg-cyan-50 rounded-xl shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Droplets className="text-cyan-500" />
            <h2 className="text-lg font-semibold text-black">Water Intake</h2>
          </div>
          <input
            type="number"
            value={waterIntake}
            onChange={(e) => setWaterIntake(Number(e.target.value))}
            min="0"
            max="20"
            className="w-full p-2 border rounded"
            placeholder="Glasses (250ml)"
          />
          <div className="mt-2 text-sm text-gray-600">Goal: 8 glasses</div>
          <div className="h-48 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="2 2" />
                <XAxis dataKey="dayOfWeek" />
                <YAxis
                  label={{
                    value: "Water Intake (glasses)",
                    angle: -90,
                    position: "insideLeft",
                  }}
                />
                <Tooltip />
                <Bar
                  dataKey="waterIntake"
                  fill="#5EA4BF"
                  name="Water (glasses)"
                  radius={[4, 4, 0, 0]} // Rounded top corners
                />
                {/* Add target line for 8 glasses */}
                <ReferenceLine
                  y={8}
                  stroke="#2C5282"
                  strokeDasharray="3 3"
                  label="Goal"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sleep Hours */}
        <div className="p-6 bg-orange-50 rounded-xl shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Moon className="text-orange-500" />
            <h2 className="text-lg font-semibold text-black">Sleep Hours</h2>
          </div>
          <input
            type="range"
            value={sleepHours}
            onChange={(e) => setSleepHours(Number(e.target.value))}
            min="0"
            max="12"
            step="0.5"
            className="w-full"
          />
          <div className="mt-2 text-center text-black">{sleepHours} hours</div>
          <div className="h-48 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="dayOfWeek" />
                <YAxis
                  label={{
                    value: "Sleep Hours",
                    angle: -90,
                    position: "insideLeft",
                  }}
                />
                <Tooltip />
                <Bar
                  type="monotone"
                  dataKey="sleepHours"
                  fill="#D88624"
                  name="Sleep (hours)"
                  radius={[4, 4, 0, 0]} // Rounded top corners
                />
                {/* Add target line for recommended 8 hours of sleep */}
                <ReferenceLine
                  y={8}
                  stroke="#C05621"
                  strokeDasharray="3 3"
                  label="Recommended"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Exercise Minutes Card */}
        <div className="p-6 bg-emerald-50 rounded-xl shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Dumbbell className="text-emerald-800" />
            <h2 className="text-lg font-semibold text-black">Exercise</h2>
          </div>

          {/* Exercise Type Inputs */}
          <div className="space-y-3">
            <div>
              <label className="text-sm text-gray-600">Cardio (minutes)</label>
              <input
                type="number"
                value={exercises.cardio}
                onChange={(e) =>
                  setExercises({ ...exercises, cardio: Number(e.target.value) })
                }
                className="w-full p-2 border rounded"
                placeholder="Minutes"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">Strength Training</label>
              <input
                type="number"
                value={exercises.strength}
                onChange={(e) =>
                  setExercises({
                    ...exercises,
                    strength: Number(e.target.value),
                  })
                }
                className="w-full p-2 border rounded"
                placeholder="Minutes"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">Flexibility/Yoga</label>
              <input
                type="number"
                value={exercises.flexibility}
                onChange={(e) =>
                  setExercises({
                    ...exercises,
                    flexibility: Number(e.target.value),
                  })
                }
                className="w-full p-2 border rounded"
                placeholder="Minutes"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">Sports/Other</label>
              <input
                type="number"
                value={exercises.sports}
                onChange={(e) =>
                  setExercises({ ...exercises, sports: Number(e.target.value) })
                }
                className="w-full p-2 border rounded"
                placeholder="Minutes"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Exercise Breakdown Chart */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Exercise Breakdown</h2>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="dayOfWeek" />
              <YAxis
                label={{
                  value: "Exercise (minutes)",
                  angle: -90,
                  position: "insideLeft",
                }}
              />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="cardioTime"
                stackId="a"
                fill="#22C55E"
                name="Cardio"
              />
              <Bar
                dataKey="strengthTrainingTime"
                stackId="a"
                fill="#10B981"
                name="Strength"
              />
              <Bar
                dataKey="yogaTime"
                stackId="a"
                fill="#059669"
                name="Flexibility"
              />
              <Bar
                dataKey="sportsTime"
                stackId="a"
                fill="#047857"
                name="Sports"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Save and Edit */}
      <div className="flex items-center gap-4 justify-end">
        <div className="flex items-center gap-4 justify-between">
          <button
            className="w-[100px] bg-cyan-600 flex items-center justify-between py-2 px-3 focus:outline-none transform transition-transform duration-200 hover:scale-105"
            onClick={handleSave}
          >
            <span className="text-white mr-2">
              {isEditing ? "Update" : "Save"}
            </span>
            <Save />
          </button>
          <button
            className="w-[100px] bg-emerald-600 flex items-center justify-between py-2 px-3 focus:outline-none transform transition-transform duration-200 hover:scale-105"
            onClick={handleEdit}
          >
            <span className="text-white mr-2">Edit</span>
            <Pencil />
          </button>
        </div>
      </div>

      {/* Feedback */}
      <FitnessFeedback
        waterIntake={waterIntake}
        sleepHours={sleepHours}
        exercises={exercises}
      />

      {/* Chart Section */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Weekly Overview</h2>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="dayOfWeek" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="waterIntake"
                stroke="#5EA4BF"
                name="Water (glasses)"
              />
              <Line
                type="monotone"
                dataKey="sleepHours"
                stroke="#D88624"
                name="Sleep (hours)"
              />
              <Line
                type="monotone"
                dataKey="totalExercise"
                stroke="#22C55E"
                name="Total Exercise (min)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Fitness;
