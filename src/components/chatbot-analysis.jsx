import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

// Define the colors for the chart slices
const COLORS = [
  "#3B82F6", // Blue
  "#10B981", // Green
  "#F59E0B", // Yellow
  "#EF4444", // Red
  "#8B5CF6", // Purple
  "#EC4899", // Pink
]

// Main component to render AI chatbot analysis
export function ChatbotAnalysis({ aiUsage, aiUsagePercentages }) {
  // Convert aiUsage and aiUsagePercentages into the format expected by the chart and UI
  const data = Object.keys(aiUsage).map((key) => ({
    name: key,
    value: parseFloat(aiUsagePercentages[key]),
    messages: aiUsage[key],
  }));

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        AI Chatbot Analysis
      </h2>
      <p className="text-sm text-gray-600 mb-6">
        Weekly Stats Analysis of AI Chatbots
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Progress Bars for each category */}
        <div>
          {data.map((item, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-700">
                  {item.name}
                </span>
                <span className="text-sm font-semibold text-gray-900">
                  {item.value}% Usage
                </span>
              </div>
              <div className="flex items-center">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full"
                    style={{
                      width: `${item.value}%`,
                      backgroundColor: COLORS[index],
                    }}
                  ></div>
                </div>
                <span className="ml-2 text-xs text-gray-500">
                  {item.messages} Messages
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Pie chart for the usage distribution */}
        <div className="flex flex-col items-center justify-center">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Legend for the chart */}
          <div className="mt-4 grid grid-cols-3 gap-2 w-full">
            {data.map((item, index) => (
              <div key={index} className="flex items-center">
                <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: COLORS[index] }}
                ></div>
                <span className="text-xs text-gray-600 truncate">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
