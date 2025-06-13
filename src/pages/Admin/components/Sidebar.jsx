import { 
  Users, 
  BookOpen, 
  FileText, 
  BarChart3, 
  Settings, 
  Home,
  LogOut
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { NavLink, replace, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

// Sidebar Component
export const Sidebar = ({ activeTab, setActiveTab }) => {
  useEffect(() => {
    const savedTab = localStorage.getItem('activeTab');
    if (savedTab) {
      setActiveTab(savedTab);
    }
  }, []);
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'exam-questions', label: 'Exams', icon: BookOpen },
    { id: 'questions', label: 'Questions', icon: FileText },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'results', label: 'Results', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
    {  label: 'Logout', icon: LogOut },
  ];

const [isSidebarOpen, setIsSidebarOpen] = useState(false);
const navigate = useNavigate();
const {logout} = useAuth()


const handleLogout = () => {
    logout()
    navigate('auth/login',replace);
    
};

return (
    <>
       {/* Hamburger button - visible on mobile */}
            <button 
                className="lg:hidden fixed top-4 left-4 z-20 p-2 rounded-md bg-indigo-800/50 hover:bg-indigo-800 transition-all duration-300 text-white"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}    
            >
                <div className="w-6 h-5 flex flex-col justify-between">
                    <span className={`h-0.5 w-full bg-white transition-all duration-300 ${isSidebarOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                    <span className={`h-0.5 w-full bg-white transition-all duration-300 ${isSidebarOpen ? 'opacity-0' : ''}`}></span>
                    <span className={`h-0.5 w-full bg-white transition-all duration-300 ${isSidebarOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                </div>
            </button>

            {/* Sidebar */}
                <div className={`bg-gradient-to-b from-indigo-900 to-purple-900 text-white w-64 h-screen fixed left-0 top-0 p-6 shadow-2xl overflow-y-auto z-10 transition-transform duration-300 lg:translate-x-0 ${
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}>
                    <div className="mb-8">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">
                        ExamHub Admin
                    </h1>
                    </div>
                    
                    <nav className="space-y-2">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        return item.id ? (
                        <NavLink
                            to={`/admin/${item.id}`}
                            key={item.id}
                            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 hover:bg-white/10 ${
                            activeTab === item.id ? 'bg-white/20' : ''
                            }`}
                            onClick={() => {
                            setActiveTab(item.id);
                            localStorage.setItem('activeTab', item.label);
                            setIsSidebarOpen(false);
                            }}
                        >
                            <Icon size={20} />
                            <span className="font-medium">{item.label}</span>
                        </NavLink>
                        ) : (
                        <button
                            key="logout"
                            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 hover:bg-white/10"
                            onClick={handleLogout}
                        >
                            <Icon size={20} />
                            <span className="font-medium">{item.label}</span>
                        </button>
                        );
                })}
            </nav>
        </div>

        {/* Overlay for mobile */}
        {isSidebarOpen && (
            <div 
                className="lg:hidden fixed inset-0 bg-black/50 z-0"
                onClick={() => setIsSidebarOpen(false)}
            />
        )}
    </>
);
};
