import React, { useState } from 'react'
import QuizeQuestionCreate from './QuizeQuestionCreate';
import { Edit, Eye, Plus, Trash2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Examlist } from '../../../../api/apiService';

export default function ExamManagement() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newExam, setNewExam] = useState({
    title: '',
    subject: '',
    duration: '',
    totalQuestions: '',
    passingScore: '',
    scheduledDate: '',
    instructions: ''
  });

  const {data:examList, isLoading } = useQuery({
    queryKey: ['examList'],
    queryFn:Examlist,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  })
  console.log(examList,"exam Data");
  // const handleCreateExam = () => {
  //   if (newExam.title && newExam.subject && newExam.duration) {
  //     const examId = `EX${String(exams.length + 1).padStart(3, '0')}`;
  //     const exam = {
  //       id: examId,
  //       ...newExam,
  //       status: 'Draft',
  //       createdDate: new Date().toISOString().split('T')[0],
  //       enrolledStudents: 0,
  //       completedStudents: 0
  //     };
  //     setExams([...exams, exam]);
  //     setNewExam({
  //       title: '',
  //       subject: '',
  //       duration: '',
  //       totalQuestions: '',
  //       passingScore: '',
  //       scheduledDate: '',
  //       instructions: ''
  //     });
  //     setShowCreateForm(false);
  //   }
  // };

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
            <p className="text-3xl font-bold">{examList?.length}</p> 
          </div>
          {/* <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl">
            <h3 className="text-lg font-semibold mb-2">Active Exams</h3>
            <p className="text-3xl font-bold">{examList.filter(e => e.status === 'Active').length}</p>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-xl">
            <h3 className="text-lg font-semibold mb-2">Completed Exams</h3>
            <p className="text-3xl font-bold">{examList.filter(e => e.status === 'Completed').length}</p>
          </div> */}
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
                <th className="text-left py-4 px-4 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {examList && examList.length > 0 ? (
                examList.map((exam) => (
                  <tr key={exam._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4 font-mono text-sm bg-gray-100 rounded">
                      {exam._id}
                    </td>
                    <td className="py-4 px-4 font-medium text-gray-800">{exam.title}</td>
                    <td className="py-4 px-4 text-gray-600">{exam?.subject}</td>
                    <td className="py-4 px-4 text-gray-600">{exam.duration} min</td>
                    <td className="py-4 px-4 text-gray-600">{exam.questions.length}</td>
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
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-gray-500">
                    No exam found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
