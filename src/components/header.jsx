import React from "react";
import { BellIcon } from "lucide-react";
import Image from "next/image";

export function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex-1"></div>
          <div className="flex items-center space-x-4">
            {/* <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors duration-200">
              <BellIcon className="h-5 w-5" />
            </button> */}
            <div className="flex items-center space-x-2">
              <Image
                width={100}
                height={100}
                className="h-10 w-10 rounded-full object-cover border-2 border-blue-500"
                src="/admin.jpg"
                alt="User avatar"
              />

              <span className="font-medium text-gray-800">Jeff Hammerberg</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
