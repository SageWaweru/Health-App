/* eslint-disable react/prop-types */

import { AlertTriangle, CheckCircle, Info, AlertCircle } from "lucide-react";

const FitnessFeedback = ({ waterIntake, sleepHours, exercises }) => {
  // Analyze water intake
  const getWaterStatus = (glasses) => {
    if (glasses >= 8 && glasses <= 12) {
      return {
        status: "Well Hydrated",
        message: "Great job staying hydrated!",
        icon: "success",
      };
    } else if (glasses >= 6 && glasses < 8) {
      return {
        status: "Adequate",
        message: "Try to drink a bit more water throughout the day.",
        icon: "info",
      };
    } else if (glasses >= 4 && glasses < 6) {
      return {
        status: "Below Optimal",
        message:
          "You're at risk of mild dehydration. Increase your water intake.",
        icon: "warning",
      };
    } else if (glasses < 4) {
      return {
        status: "Dehydrated",
        message:
          "You need to drink more water! Set reminders throughout the day.",
        icon: "error",
      };
    } else if (glasses > 12) {
      return {
        status: "Excessive",
        message: "Consider reducing water intake to avoid overhydration.",
        icon: "warning",
      };
    }
    return {
      status: "No Data",
      message: "Track your water intake to get feedback.",
      icon: "info",
    };
  };

  // Analyze sleep
  const getSleepStatus = (hours) => {
    if (hours >= 7 && hours <= 9) {
      return {
        status: "Healthy",
        message: "You're getting optimal sleep!",
        icon: "success",
      };
    } else if (hours >= 6 && hours < 7) {
      return {
        status: "Below Average",
        message: "Try to get to bed a bit earlier tonight.",
        icon: "info",
      };
    } else if (hours >= 4 && hours < 6) {
      return {
        status: "Unhealthy",
        message: "You need more sleep! Aim for 7-9 hours.",
        icon: "warning",
      };
    } else if (hours < 4) {
      return {
        status: "Very Unhealthy",
        message: "Severe sleep deprivation! Prioritize sleep tonight.",
        icon: "error",
      };
    } else if (hours > 9 && hours <= 11) {
      return {
        status: "Above Average",
        message:
          "You're getting more sleep than average. Monitor your energy levels.",
        icon: "info",
      };
    } else if (hours > 11) {
      return {
        status: "Very Unhealthy",
        message:
          "Excessive sleep may indicate health issues. Consider consulting a doctor.",
        icon: "warning",
      };
    }
    return {
      status: "No Data",
      message: "Track your sleep to get feedback.",
      icon: "info",
    };
  };

  // Analyze exercise
  const getExerciseStatus = (type, minutes) => {
    switch (type) {
      case "cardio":
        if (minutes >= 20 && minutes <= 60) {
          return {
            status: "Optimal",
            message: "Great cardio session!",
            icon: "success",
          };
        } else if (minutes > 60 && minutes <= 90) {
          return {
            status: "Above Average",
            message: "Impressive cardio workout! Ensure proper recovery.",
            icon: "info",
          };
        } else if (minutes > 90) {
          return {
            status: "Very High",
            message:
              "Watch for signs of overtraining with long cardio sessions.",
            icon: "warning",
          };
        } else {
          return {
            status: "Below Optimal",
            message: "Aim for at least 20 minutes of cardio.",
            icon: "warning",
          };
        }
      case "strength":
        if (minutes >= 20 && minutes <= 45) {
          return {
            status: "Optimal",
            message: "Perfect strength training duration!",
            icon: "success",
          };
        } else if (minutes > 45 && minutes <= 60) {
          return {
            status: "Above Average",
            message: "Great strength session! Don't forget to rest.",
            icon: "info",
          };
        } else if (minutes > 60) {
          return {
            status: "Very High",
            message: "Consider splitting long strength sessions across days.",
            icon: "warning",
          };
        } else {
          return {
            status: "Below Optimal",
            message: "Aim for at least 20 minutes of strength training.",
            icon: "warning",
          };
        }
      default:
        return {
          status: "No Data",
          message: "Track your exercise to get feedback.",
          icon: "info",
        };
    }
  };

  const renderIcon = (type) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case "error":
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const waterFeedback = getWaterStatus(waterIntake);
  const sleepFeedback = getSleepStatus(sleepHours);
  const cardioFeedback = getExerciseStatus("cardio", exercises.cardio);
  const strengthFeedback = getExerciseStatus("strength", exercises.strength);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm space-y-6">
      <h2 className="text-lg font-semibold mb-4">Daily Health Insights</h2>

      {/* Water Feedback */}
      <div className="flex items-start gap-3 p-4 bg-cyan-50 rounded-lg">
        {renderIcon(waterFeedback.icon)}
        <div>
          <h3 className="font-medium text-gray-900">
            Hydration Status: {waterFeedback.status}
          </h3>
          <p className="text-gray-600">{waterFeedback.message}</p>
        </div>
      </div>

      {/* Sleep Feedback */}
      <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-lg">
        {renderIcon(sleepFeedback.icon)}
        <div>
          <h3 className="font-medium text-gray-900">
            Sleep Quality: {sleepFeedback.status}
          </h3>
          <p className="text-gray-600">{sleepFeedback.message}</p>
        </div>
      </div>

      {/* Exercise Feedback */}
      <div className="flex items-start gap-3 p-4 bg-emerald-50 rounded-lg">
        {renderIcon(cardioFeedback.icon)}
        <div>
          <h3 className="font-medium text-gray-900">
            Cardio Status: {cardioFeedback.status}
          </h3>
          <p className="text-gray-600">{cardioFeedback.message}</p>
        </div>
      </div>

      <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
        {renderIcon(strengthFeedback.icon)}
        <div>
          <h3 className="font-medium text-gray-900">
            Strength Training: {strengthFeedback.status}
          </h3>
          <p className="text-gray-600">{strengthFeedback.message}</p>
        </div>
      </div>
    </div>
  );
};

export default FitnessFeedback;
