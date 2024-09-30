import React from "react";
// import { Link, useLocation } from "react-router-dom";
import {
  HomeIcon,
  UsersIcon,
  NewspaperIcon,
  MailIcon,
  BarChartIcon,
  LogOutIcon,
  LayoutIcon,
  CircleHelp,
} from "lucide-react";
import Link from "next/link";

export function Sidebar() {
    //   const location = useLocation();
    const location = "/";
  const menuItems = [
    { icon: HomeIcon, label: "Home", path: "/" },
    { icon: UsersIcon, label: "Manage Users", path: "/manage-users" },
    {
      icon: LayoutIcon,
      label: "Manage Landing Page",
      path: "/manage-landing-page",
    },
    { icon: NewspaperIcon, label: "Blogs", path: "/blogs" },
    { icon: MailIcon, label: "Newsletters", path: "/newsletters" },
    { icon: BarChartIcon, label: "Analytics", path: "/analytics" },
    { icon: CircleHelp , label: "FAQS", path: "/faq" },
  ];

  return (
    <aside
      className="hidden sm:flex sm:flex-col w-64 bg-gradient-to-b from-blue-600 to-blue-800 text-white"
    >
      <div
        className="flex items-center justify-center h-20"
      >
        <h1 className="text-3xl font-bold">
          AgentCoach.AI
        </h1>
      </div>
      <nav className="flex-grow">
        <ul className="flex flex-col py-4">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                href={item.path}
                className={`flex items-center px-6 py-3 text-white hover:bg-blue-700 transition-colors duration-200 ${
                  location.pathname === item.path ? "bg-blue-700" : ""
                }`}
              >
                <item.icon
                  className="h-5 w-5 mr-3"
                />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4">
        <button
          className="flex items-center text-white opacity-75 hover:opacity-100 transition-opacity duration-200"
        >
          <LogOutIcon className="h-5 w-5 mr-3" />
          Logout
        </button>
      </div>
    </aside>
  );
}
