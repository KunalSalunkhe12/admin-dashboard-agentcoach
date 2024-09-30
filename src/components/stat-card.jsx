import React from "react";

export function StatCard({ icon, title, value, trend, className }) {
  const trendColor = trend === "up" ? "text-green-500" : "text-red-500";
  const trendIcon = trend === "up" ? "↑" : "↓";

  return (
    <div
      className={`rounded-lg shadow-lg p-6 bg-white dark:bg-gray-800 transition-all duration-300 hover:shadow-xl ${className}`}
    >
      <div className="flex items-center justify-between">
        <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900">
          {icon}
        </div>
        {/* <div className={`flex items-center ${trendColor}`}>
          {trendIcon}
          <span className="ml-1 text-sm font-medium">{trendValue}%</span>
        </div> */}
      </div>
      <div className="mt-4">
        <p className="text-2xl font-semibold text-gray-800 dark:text-white">
          {value}
        </p>
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
          {title}
        </p>
      </div>
    </div>
  );
}
