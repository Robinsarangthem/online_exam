import { Bell, Menu, Search, User } from "lucide-react";
import { useAdmin } from "../../../context/AdminContext";

export default function Header() {
    const {adminData} = useAdmin()
    console.log(adminData)
return (
   <header className="bg-white shadow-lg border-b border-gray-100 px-4 sm:px-8 py-3 sm:py-4 fixed top-0 right-0 left-0 md:left-64 z-10">
    <div className="flex items-center justify-between gap-4">
        {/* Search Section - Full width on mobile, constrained on larger screens */}
        <div className="flex-1 md:flex-initial">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                    type="text"
                    placeholder="Search..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-full w-full md:w-64 lg:w-96 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm bg-gray-50"
                />
            </div>
        </div>
        
        {/* Right Section - Compact on mobile */}
        <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
            {/* Notification Bell */}
            <button className="relative p-2 text-gray-600 hover:text-indigo-600 transition-colors">
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    3
                </span>
            </button>
            
            {/* User Profile */}
            <div className="flex items-center space-x-3 bg-gray-50 rounded-full px-3 py-2">
                <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="text-white" size={16} />
                </div>
                {/* Hide user details on very small screens, show on sm and up */}
                <div className="hidden sm:block">
                    <p className="font-medium text-gray-800 text-sm whitespace-nowrap uppercase">{adminData?.adminData?.username}</p>
                    <p className="text-xs text-gray-500 uppercase">{adminData?.adminData?.role}</p>
                </div>
            </div>
        </div>
    </div>
</header>
);
};

