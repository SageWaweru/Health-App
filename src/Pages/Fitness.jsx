import { useState, useEffect } from "react";
import Footer from '../Components/Footer.jsx'

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
} from "recharts";
import CustomAlert from "../Components/CustomAlert";
import FitnessFeedback from "../Components/FitnessFeedback";

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// Sample data for the charts
const weeklyData = [
  {
    day: "Mon",
    water: 8,
    sleep: 7,
    totalExercise: 45,
    cardio: 20,
    strength: 15,
    flexibility: 10,
  },
  {
    day: "Tue",
    water: 6,
    sleep: 8,
    totalExercise: 30,
    cardio: 15,
    strength: 15,
    flexibility: 0,
  },
  {
    day: "Wed",
    water: 7,
    sleep: 6,
    totalExercise: 60,
    cardio: 30,
    strength: 20,
    flexibility: 10,
  },
  {
    day: "Thu",
    water: 9,
    sleep: 8,
    totalExercise: 40,
    cardio: 20,
    strength: 10,
    flexibility: 10,
  },
  {
    day: "Fri",
    water: 8,
    sleep: 7,
    totalExercise: 30,
    cardio: 15,
    strength: 15,
    flexibility: 0,
  },
  {
    day: "Sat",
    water: 5,
    sleep: 9,
    totalExercise: 0,
    cardio: 0,
    strength: 0,
    flexibility: 0,
  },
  {
    day: "Sun",
    water: 7,
    sleep: 8,
    totalExercise: 45,
    cardio: 25,
    strength: 10,
    flexibility: 10,
  },
];

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

  // Data states
  const [mockData, setMockData] = useState(weeklyData);
  const [mockMonthlyData, setMockMonthlyData] = useState([]);
  const [selectedDay, setSelectedDay] = useState("");

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

  // Handle Save action
  function handleSave() {
    if (!selectedDay) return;

    const newEntry = {
      day: selectedDay,
      water: waterIntake,
      sleep: sleepHours,
      exercise: exercises,
    };

    //   Add to mockData or create a new array if it exceeds 7
    if (mockData.length < 7) {
      setMockData((prev) => [...prev, newEntry]);
    } else {
      // Start a new array if the previous one exceeds 7
      setMockData([newEntry]);
    }

    //   Add to mockMonthlyData if it has less than 4 items
    if (mockMonthlyData.length < 4) {
      setMockMonthlyData((prev) => [...prev, newEntry]);
    }
    console.log(newEntry);
    //   Restore default Values
    setWaterIntake(0);
    setSleepHours(8);
    setExercises({
      cardio: 0,
      strength: 0,
      flexibility: 0,
      sports: 0,
    });
    setSelectedDay("");
  }

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
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="water"
                  stroke="#5EA4BF"
                  name="Water (glasses)"
                />
              </LineChart>
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
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="sleep"
                  stroke="#D88624"
                  name="Sleep (hours)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Exercise Minutes Card */}
        <div className="p-6 bg-emerald-50 rounded-xl shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Dumbbell className="text-emerald-800" />
            <h2 className="text-lg font-semibold">Exercise</h2>
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
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="cardio"
                stackId="exercise"
                fill="#22C55E"
                name="Cardio"
              />
              <Bar
                dataKey="strength"
                stackId="exercise"
                fill="#10B981"
                name="Strength"
              />
              <Bar
                dataKey="flexibility"
                stackId="exercise"
                fill="#059669"
                name="Flexibility"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Save and Edit */}
      <div className="flex items-center gap-4 justify-between">
        <div className="flex items-center gap-4 justify-start">
          <select
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
            className="p-2 border rounded-lg bg-white text-black"
          >
            <option value="" disabled>
              Choose a day
            </option>
            {daysOfWeek.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-4 justify-end">
          <button
            className="w-[100px] bg-cyan-600 flex items-center justify-between py-2 px-3 focus:outline-none transform transition-transform duration-200 hover:scale-105"
            onClick={handleSave}
          >
            <span className="text-white mr-2">Save</span>
            <Save />
          </button>
          <button className="w-[100px] bg-emerald-600 flex items-center justify-between py-2 px-3 focus:outline-none transform transition-transform duration-200 hover:scale-105">
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
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="water"
                stroke="#5EA4BF"
                name="Water (glasses)"
              />
              <Line
                type="monotone"
                dataKey="sleep"
                stroke="#D88624"
                name="Sleep (hours)"
              />
              <Line
                type="monotone"
                dataKey="totalExercise"
                stroke="#3A7A6B"
                name="Total Exercise (min)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default Fitness;
