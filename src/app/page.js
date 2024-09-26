"use client";
import React, { useEffect, useState } from "react";
import { UsersIcon, MessageSquareIcon, ClockIcon } from "lucide-react";
import { StatCard } from "@/components/stat-card";
import { ChatbotAnalysis } from "@/components/chatbot-analysis";
import { TopUsers } from "@/components/top-users";
import { getDashboardData } from "@/functions/getDashboardData";
import Loading from "@/components/Loading";

export default function page() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [dashboardData, setDashboardData] = useState({});
  useEffect(() => {
    getDashboardData(setDashboardData, setLoading, setError);
  }, []);


  if (loading) {
    return <Loading/>
  }
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome to <span className="text-blue-600">AgentCoach.ai</span> - Your
          AI Coach
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          icon={<UsersIcon className="h-6 w-6 text-blue-600" />}
          title="Total Users"
          value={dashboardData?.totalUsers || 0}
          trend="up"
          trendValue="5"
          className="border-l-4 border-blue-500"
        />

        <StatCard
          icon={<MessageSquareIcon className="h-6 w-6 text-green-600" />}
          title="Total Messages"
          value={dashboardData?.totalMessages || 0}
          trend="up"
          trendValue="12"
          className="border-l-4 border-green-500"
        />

        <StatCard
          icon={<ClockIcon className="h-6 w-6 text-purple-600" />}
          title="Hours of Engagement"
          value="1000"
          trend="up"
          trendValue="8"
          className="border-l-4 border-purple-500"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ChatbotAnalysis
          aiUsagePercentages={dashboardData?.aiUsagePercentages || {}}
          aiUsage={dashboardData?.aiUsage || {}}
        />
        <TopUsers topUsers={dashboardData?.latestUsers || []} />
      </div>
    </div>
  );
}
