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
import Image from "next/image";

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
    {
      icon: NewspaperIcon,
      label: "Blogs",
      path: "https://agentcoachblogteamlumio.wordpress.com/",
    },
    { icon: MailIcon, label: "Newsletters", path: "/newsletters" },
    { icon: BarChartIcon, label: "Analytics", path: "/analytics" },
    { icon: CircleHelp, label: "FAQs", path: "/faq" },
  ];

  return (
    <aside className="hidden sm:flex sm:flex-col w-64 bg-gradient-to-b from-blue-600 to-blue-800 text-white">
      <Image
        src="/asxosan.png"
        className="pl-2 mt-2 h-16 w-52"
        height={56}
        width={192}
        alt="Logo"
      />
      <nav className="flex-grow">
        <ul className="flex flex-col py-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              {item.label === "Blogs" ? (
                <a
                  href={item.path}
                  target="_blank"
                  className={`flex items-center px-6 py-3 text-white hover:bg-blue-700 transition-colors duration-200 ${
                    location === item.path ? "bg-blue-700" : ""
                  }`}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.label}
                </a>
              ) : (
                <Link
                  href={item.path}
                  className={`flex items-center px-6 py-3 text-white hover:bg-blue-700 transition-colors duration-200 ${
                    location.pathname === item.path ? "bg-blue-700" : ""
                  }`}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4">
        <button className="flex items-center text-white opacity-75 hover:opacity-100 transition-opacity duration-200">
          <LogOutIcon className="h-5 w-5 mr-3" />
          Logout
        </button>
      </div>
    </aside>
  );
}
