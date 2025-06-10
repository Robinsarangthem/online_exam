import React, { useState } from 'react'
import QuizeQuestionCreate from './QuizeQuestionCreate';
import { Edit, Eye, Plus, Trash2 } from 'lucide-react';

export default function ExamManagement() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [exams, setExams] = useState([
    {
      id: 'EX001',
      title: 'Mathematics Final Exam',
      subject: 'Mathematics',
      duration: 120,
      totalQuestions: 50,
      passingScore: 60,
      status: 'Active',
      createdDate: '2024-06-01',
      scheduledDate: '2024-06-15',
      enrolledStudents: 45,
      completedStudents: 12
    },
    {
      id: 'EX002',
      title: 'Physics Midterm',
      subject: 'Physics',
      duration: 90,
      totalQuestions: 40,
      passingScore: 55,
      status: 'Scheduled',
      createdDate: '2024-06-02',
      scheduledDate: '2024-06-20',
      enrolledStudents: 38,
      completedStudents: 0
    },
    {
      id: 'EX003',
      title: 'Chemistry Quiz 1',
      subject: 'Chemistry',
      duration: 45,
      totalQuestions: 25,
      passingScore: 70,
      status: 'Completed',
      createdDate: '2024-05-25',
      scheduledDate: '2024-05-30',
      enrolledStudents: 42,
      completedStudents: 42
    }
  ]);

  const [newExam, setNewExam] = useState({
    title: '',
    subject: '',
    duration: '',
    totalQuestions: '',
    passingScore: '',
    scheduledDate: '',
    instructions: ''
  });

  const handleCreateExam = () => {
    if (newExam.title && newExam.subject && newExam.duration) {
      const examId = `EX${String(exams.length + 1).padStart(3, '0')}`;
      const exam = {
        id: examId,
        ...newExam,
        status: 'Draft',
        createdDate: new Date().toISOString().split('T')[0],
        enrolledStudents: 0,
        completedStudents: 0
      };
      setExams([...exams, exam]);
      setNewExam({
        title: '',
        subject: '',
        duration: '',
        totalQuestions: '',
        passingScore: '',
        scheduledDate: '',
        instructions: ''
      });
      setShowCreateForm(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Scheduled': return 'bg-blue-100 text-blue-800';
      case 'Completed': return 'bg-gray-100 text-gray-800';
      case 'Draft': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (showCreateForm) {
    return (
        <QuizeQuestionCreate setShowCreateForm= {setShowCreateForm}/>
    //   <div className="space-y-6">
    //     <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
    //       <div className="flex justify-between items-center mb-6">
    //         <h2 className="text-2xl font-bold text-gray-800">Create New Exam</h2>
    //         <button
    //           onClick={() => setShowCreateForm(false)}
    //           className="text-gray-500 hover:text-gray-700 transition-colors"
    //         >
    //           <span className="text-2xl">×</span>
    //         </button>
    //       </div>

    //       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    //         <div className="space-y-4">
    //           <div>
    //             <label className="block text-sm font-medium text-gray-700 mb-2">Exam Title</label>
    //             <input
    //               type="text"
    //               value={newExam.title}
    //               onChange={(e) => setNewExam({...newExam, title: e.target.value})}
    //               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
    //               placeholder="Enter exam title"
    //             />
    //           </div>

    //           <div>
    //             <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
    //             <select
    //               value={newExam.subject}
    //               onChange={(e) => setNewExam({...newExam, subject: e.target.value})}
    //               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
    //             >
    //               <option value="">Select Subject</option>
    //               <option value="Mathematics">Mathematics</option>
    //               <option value="Physics">Physics</option>
    //               <option value="Chemistry">Chemistry</option>
    //               <option value="Biology">Biology</option>
    //               <option value="English">English</option>
    //               <option value="History">History</option>
    //             </select>
    //           </div>

    //           <div>
    //             <label className="block text-sm font-medium text-gray-700 mb-2">Duration (minutes)</label>
    //             <input
    //               type="number"
    //               value={newExam.duration}
    //               onChange={(e) => setNewExam({...newExam, duration: e.target.value})}
    //               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
    //               placeholder="120"
    //             />
    //           </div>

    //           <div>
    //             <label className="block text-sm font-medium text-gray-700 mb-2">Total Questions</label>
    //             <input
    //               type="number"
    //               value={newExam.totalQuestions}
    //               onChange={(e) => setNewExam({...newExam, totalQuestions: e.target.value})}
    //               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
    //               placeholder="50"
    //             />
    //           </div>
    //         </div>

    //         <div className="space-y-4">
    //           <div>
    //             <label className="block text-sm font-medium text-gray-700 mb-2">Passing Score (%)</label>
    //             <input
    //               type="number"
    //               value={newExam.passingScore}
    //               onChange={(e) => setNewExam({...newExam, passingScore: e.target.value})}
    //               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
    //               placeholder="60"
    //               min="0"
    //               max="100"
    //             />
    //           </div>

    //           <div>
    //             <label className="block text-sm font-medium text-gray-700 mb-2">Scheduled Date</label>
    //             <input
    //               type="date"
    //               value={newExam.scheduledDate}
    //               onChange={(e) => setNewExam({...newExam, scheduledDate: e.target.value})}
    //               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
    //             />
    //           </div>

    //           <div>
    //             <label className="block text-sm font-medium text-gray-700 mb-2">Instructions</label>
    //             <textarea
    //               value={newExam.instructions}
    //               onChange={(e) => setNewExam({...newExam, instructions: e.target.value})}
    //               rows={4}
    //               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
    //               placeholder="Enter exam instructions for students..."
    //             />
    //           </div>
    //         </div>
    //       </div>

    //       <div className="flex justify-end space-x-4 mt-8">
    //         <button
    //           onClick={() => setShowCreateForm(false)}
    //           className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
    //         >
    //           Cancel
    //         </button>
    //         <button
    //           onClick={handleCreateExam}
    //           className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-200"
    //         >
    //           Create Exam
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Exam Management</h2>
          <button
            onClick={() => setShowCreateForm(true)}
            className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-200 flex items-center space-x-2"
          >
            <Plus size={20} />
            <span>Create New Exam</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl">
            <h3 className="text-lg font-semibold mb-2">Total Exams</h3>
            <p className="text-3xl font-bold">{exams.length}</p>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl">
            <h3 className="text-lg font-semibold mb-2">Active Exams</h3>
            <p className="text-3xl font-bold">{exams.filter(e => e.status === 'Active').length}</p>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-xl">
            <h3 className="text-lg font-semibold mb-2">Completed Exams</h3>
            <p className="text-3xl font-bold">{exams.filter(e => e.status === 'Completed').length}</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-4 px-4 font-semibold text-gray-700">Exam Code</th>
                <th className="text-left py-4 px-4 font-semibold text-gray-700">Title</th>
                <th className="text-left py-4 px-4 font-semibold text-gray-700">Subject</th>
                <th className="text-left py-4 px-4 font-semibold text-gray-700">Duration</th>
                <th className="text-left py-4 px-4 font-semibold text-gray-700">Questions</th>
                <th className="text-left py-4 px-4 font-semibold text-gray-700">Students</th>
                <th className="text-left py-4 px-4 font-semibold text-gray-700">Status</th>
                <th className="text-left py-4 px-4 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {exams.map((exam) => (
                <tr key={exam.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4 font-mono text-sm bg-gray-100 rounded">
                    {exam.id}
                  </td>
                  <td className="py-4 px-4 font-medium text-gray-800">{exam.title}</td>
                  <td className="py-4 px-4 text-gray-600">{exam.subject}</td>
                  <td className="py-4 px-4 text-gray-600">{exam.duration} min</td>
                  <td className="py-4 px-4 text-gray-600">{exam.totalQuestions}</td>
                  <td className="py-4 px-4 text-gray-600">
                    {exam.completedStudents}/{exam.enrolledStudents}
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(exam.status)}`}>
                      {exam.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex space-x-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View Details">
                        <Eye size={16} />
                      </button>
                      <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Edit Exam">
                        <Edit size={16} />
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete Exam">
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
    </div>
  );
};

