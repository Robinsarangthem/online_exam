import { AlertCircle, BookOpen, Edit, Eye, FileText, Plus, Trash2, TrendingUp, Trophy, Users } from "lucide-react";

export default function HomeDashboard() {
    const StatsCard = ({ title, value, change, icon: Icon, color }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold mt-2 text-gray-800">{value}</p>
          <div className="flex items-center mt-2">
            <TrendingUp className="text-green-500 mr-1" size={16} />
            <span className="text-green-500 text-sm font-medium">{change}</span>
          </div>
        </div>
        <div className={`p-4 rounded-2xl ${color}`}>
          <Icon className="text-white" size={24} />
        </div>
      </div>
    </div>
  );
};
    const stats = [
  { title: 'Total Exams', value: '248', change: '+12%', icon: BookOpen, color: 'bg-gradient-to-r from-blue-500 to-blue-600' },
  { title: 'Active Students', value: '1,824', change: '+8%', icon: Users, color: 'bg-gradient-to-r from-green-500 to-green-600' },
  { title: 'Questions Bank', value: '5,672', change: '+24%', icon: FileText, color: 'bg-gradient-to-r from-purple-500 to-purple-600' },
  { title: 'Avg. Score', value: '78.5%', change: '+5%', icon: Trophy, color: 'bg-gradient-to-r from-orange-500 to-orange-600' },
];

const recentExams = [
  { name: 'Mathematics Quiz 1', students: 45, status: 'Active', date: '2024-06-03' },
  { name: 'Physics Midterm', students: 67, status: 'Completed', date: '2024-06-02' },
  { name: 'Chemistry Test 3', students: 32, status: 'Scheduled', date: '2024-06-04' },
  { name: 'Biology Final', students: 89, status: 'Active', date: '2024-06-03' },
];
  return (

    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Exams */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-800">Recent Exams</h3>
            <button className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-200 flex items-center space-x-2">
              <Plus size={16} />
              <span>Create Exam</span>
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Exam Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Students</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentExams.map((exam, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4 font-medium text-gray-800">{exam.name}</td>
                    <td className="py-4 px-4 text-gray-600">{exam.students}</td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        exam.status === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : exam.status === 'Completed' 
                          ? 'bg-gray-100 text-gray-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {exam.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-600">{exam.date}</td>
                    <td className="py-4 px-4">
                      <div className="flex space-x-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Eye size={16} />
                        </button>
                        <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                          <Edit size={16} />
                        </button>
                        <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions & Alerts */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center space-x-2">
                <Plus size={18} />
                <span>Create New Exam</span>
              </button>
              <button className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-4 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 flex items-center space-x-2">
                <FileText size={18} />
                <span>Add Questions</span>
              </button>
              <button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-3 px-4 rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all duration-200 flex items-center space-x-2">
                <Users size={18} />
                <span>Manage Students</span>
              </button>
            </div>
          </div>

          {/* System Alerts */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-4">System Alerts</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                <AlertCircle className="text-yellow-500 mt-0.5" size={16} />
                <div>
                  <p className="text-sm font-medium text-yellow-800">Server Maintenance</p>
                  <p className="text-xs text-yellow-600">Scheduled for tonight 2-4 AM</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg border-l-4 border-green-400">
                <AlertCircle className="text-green-500 mt-0.5" size={16} />
                <div>
                  <p className="text-sm font-medium text-green-800">Backup Completed</p>
                  <p className="text-xs text-green-600">All data backed up successfully</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
