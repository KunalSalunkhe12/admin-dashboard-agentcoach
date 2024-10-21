import React from "react";
import { CheckCircleIcon, UserIcon } from "lucide-react";
import Link from "next/link";

// The updated TopUsers component
export function TopUsers({ topUsers }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Our Top Users
      </h2>
      <p className="text-sm text-gray-600 mb-6">
        View Our Most Engaged Users for Last Week
      </p>
      <div className="space-y-4">
        {topUsers.map((user, index) => (
          <div
            key={user.user_id}
            className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
          >
            <div className="flex items-center">
              <img
                src={`${user.imageUrl}`}
                alt={user.name || "User Avatar"}
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <span className="text-sm font-medium text-gray-700">
                  {user.emailAddresses[0].emailAddress || "Anonymous User"} 
                </span>
                <div className="flex items-center mt-1">
                  <CheckCircleIcon className="h-4 w-4 text-blue-500 mr-1" />
                  <span className={`text-xs font-medium text-blue-500 ${user?.publicMetadata?.trialStatus ? "text-blue-500":"text-gray-500"}`}>
                  {user?.publicMetadata?.trialStatus ? "Free":"Paid"}
                  </span>
                </div>
              </div>
            </div>
            <span className="text-lg font-semibold text-gray-800">
              #{index + 1}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-between items-center">
        {/* <div className="text-center">
          <p className="text-2xl font-bold text-green-500">0</p>
          <p className="text-sm text-gray-600">Paid</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-blue-500">{topUsers.length}</p>
          <p className="text-sm text-gray-600">Free</p>
        </div> */}
        <Link href="/manage-users">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300">
            View All Users
          </button>
        </Link>
      </div>
    </div>
  );
}
