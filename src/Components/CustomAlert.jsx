/* eslint-disable react/prop-types */
import React from "react";
import { Bell, X } from "lucide-react";

// Custom Alert Component
const CustomAlert = ({ message, type = "info", onClose }) => {
  const bgColor = {
    info: "bg-blue-50 border-blue-200",
    warning: "bg-yellow-50 border-yellow-200",
    error: "bg-red-50 border-red-200",
  }[type];

  return (
    <div
      className={`${bgColor} border rounded-lg p-4 flex items-center justify-between shadow-sm animate-fade-in`}
    >
      <div className="flex items-center gap-2">
        <Bell className="h-4 w-4 text-blue-500" />
        <p className="text-sm text-gray-700">{message}</p>
      </div>
      <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

export default CustomAlert;
