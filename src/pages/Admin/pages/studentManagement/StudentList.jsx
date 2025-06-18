// import { useMutation, useQuery } from "@tanstack/react-query";
// import { Edit, Mail, Phone, Plus, Trash2, User } from "lucide-react";
// import { useState } from "react";
// import { toast } from "react-toastify";
// import {
//   addStudentRegister,
//   getStudentList,
//   updateStudent,
// } from "../../../../api/apiService";
// import Loading from "../../../../components/ui/Loading";

// export default function StudentList() {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingStudent, setEditingStudent] = useState(null);
//   const [students, setStudents] = useState([]);
//   const [formData, setFormData] = useState({
//     studentName: "",
//     studentID: "",
//     email: "",
//     course: "",
//   });

//   const { mutate: addStudent } = useMutation({
//     mutationFn:  ,
//     onSuccess: (data) => {
//       setStudents((prev) => [...prev, data]);
//       setIsModalOpen(false);
//       setFormData({ studentName: "", email: "", studentID: "", course: "" });
//       toast.success("Student added successfully!");
//     },
//     onError: (error) => {
//       console.error("Error adding student:", error);
//       toast.error("Failed to add student. Please try again.");
//       // Handle error (e.g., show a toast notification)
//     },
//   });
//   // const [formData, setFormData] = useState({
//   const handleAdd = () => {
//     setEditingStudent(null);
//     setFormData({ studentName: "", email: "", studentID: "", course: "" });
//     setIsModalOpen(true);
//   };

//   const { data: studentList, isLoading } = useQuery({
//     queryKey: ["studentList"],
//     queryFn: getStudentList,
//   });
//   console.log(studentList, "student Data");

//   const handleEdit = (student) => {
//     console.log(student._id, "student data");
//     setEditingStudent(student);
//     setFormData(student);
//     setIsModalOpen(true);
//     // handleEditStudent(student);
//   };
//   console.log(editingStudent._id, "editingStudent id");
//   const handleDelete = (id) => {
//     setStudents(studentList?.students.filter((student) => student._id !== id));
//   };
//   const { mutate: handlUpdateStudent } = useMutation({
//     mutationFn: (studentData) => updateStudent({ id, studentData }),
//     onSuccess: (data, variables) => {
//       // Use variables.id instead of editingStudent._id
//       setStudents((prev) =>
//         prev.map((student) =>
//           student._id === variables.id ? { ...data } : student
//         )
//       );
//       setIsModalOpen(false);
//       setFormData({ studentName: "", email: "", studentID: "", course: "" });
//       setEditingStudent(null);
//       toast.success("Student updated successfully!");
//     },
//     onError: (error) => {
//       console.error("Error updating student:", error);
//       toast.error("Failed to update student. Please try again.");
//     },
//   });

//   // const handleSubmit = () => {
//   //   if (
//   //     !formData.studentName ||
//   //     !formData.email ||
//   //     !formData.studentID ||
//   //     !formData.course
//   //   ) {
//   //     return;
//   //   }
//   //   const studentData = {
//   //     studentID: formData.studentID,
//   //     studentName: formData.studentName, // Changed from 'student' to 'studentName'
//   //     email: formData.email,
//   //     course: formData.course,
//   //   };
//   //   addStudent(studentData);
//   //   if (editingStudent) {
//   //     const updatedStudentData = {
//   //       newStudentID: formData.studentID,
//   //       newStudentName: formData.studentName,
//   //       newEmail: formData.email,
//   //       newCourse: formData.course,
//   //     };
//   //     handlUpdateStudent(editingStudent._id, updatedStudentData);
//   //     setStudents(
//   //       studentList?.students?.map((student) =>
//   //         student_id === editingStudent._id
//   //           ? { ...formData, id: editingStudent._id }
//   //           : student
//   //       )
//   //     );
//   //   } else {
//   //     const newStudent = {
//   //       newStudentName: formData.studentName,
//   //       newEmail: formData.email,
//   //       newCourse: formData.course,
//   //       studentID: formData.studentID,
//   //     };
//   //     setStudents([...students, newStudent]);
//   //   }
//   //   setIsModalOpen(false);
//   //   setFormData({ studentName: "", email: "", studentID: "", course: "" });
//   // };

//   const handleSubmit = () => {
//     // Validation
//     if (
//       !formData.studentName ||
//       !formData.email ||
//       !formData.studentID ||
//       !formData.course
//     ) {
//       return;
//     }

//     if (editingStudent && editingStudent._id) {
//       // Update existing student
//       const updatedStudentData = {
//         newStudentID: formData.studentID,
//         newStudentName: formData.studentName,
//         newEmail: formData.email,
//         newCourse: formData.course,
//       };

//       // Call API to update student
//       handlUpdateStudent(
//         { id: editingStudent?._id },
//         { studentData: updatedStudentData }
//       );

//       // Update local state
//       setStudents(
//         studentList?.students?.map((student) =>
//           student._id === editingStudent._id
//             ? { ...student, ...updatedStudentData }
//             : student
//         )
//       );
//     } else {
//       // Add new student
//       const newStudentData = {
//         studentID: formData.studentID,
//         studentName: formData.studentName,
//         email: formData.email,
//         course: formData.course,
//       };

//       // Call API to add student
//       addStudent(newStudentData);

//       // Update local state (you might want to wait for API response instead)
//       setStudents([...students, newStudentData]);
//     }

//     // Reset form and close modal
//     setIsModalOpen(false);
//     setFormData({ studentName: "", email: "", studentID: "", course: "" });
//     setEditingStudent(null); // Clear editing state
//   };

//   const handleInputChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   if (isLoading) {
//     return <Loading />;
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
//           <div className="flex justify-between items-center">
//             <div>
//               <h1 className="text-lg md:text-2xl lg:text-xl font-bold text-gray-900 mb-2">
//                 Student Management
//               </h1>
//               <p className="text-gray-600">
//                 Manage your student database efficiently
//               </p>
//             </div>
//             <button
//               onClick={handleAdd}
//               className="bg-indigo-600 hover:bg-indigo-700 text-white px-2 sm:px-3 md:px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors"
//             >
//               <Plus size={20} />
//               Add Student
//             </button>
//           </div>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
//           <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
//             <div className="flex  items-center">
//               <div className="p-1 lg:p-3 rounded-full bg-indigo-100 text-indigo-600">
//                 <User size={24} />
//               </div>
//               <div className="ml-4">
//                 <p className="text-sm font-medium text-gray-600">
//                   Total Students
//                 </p>
//                 <p className="text-2xl font-bold text-gray-900">
//                   {studentList?.students?.length}
//                 </p>
//               </div>
//             </div>
//           </div>
//           <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
//             <div className="flex items-center">
//               <div className="p-3 rounded-full bg-blue-100 text-blue-600">
//                 <Mail size={24} />
//               </div>
//             </div>
//           </div>
//           <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
//             <div className="flex items-center">
//               <div className="p-3 rounded-full bg-purple-100 text-purple-600">
//                 <Phone size={24} />
//               </div>
//               <div className="ml-4">
//                 <p className="text-sm font-medium text-gray-600">Avg Grade</p>
//                 <p className="text-2xl font-bold text-gray-900">B+</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Student Table */}
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
//           <div className="px-6 py-4 border-b border-gray-200">
//             <h2 className="text-lg font-semibold text-gray-900">
//               Students List
//             </h2>
//           </div>
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Student
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Contact
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Course
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Registration ID
//                   </th>
//                   <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {studentList?.students?.map((student) => (
//                   <tr
//                     key={student._id}
//                     className="hover:bg-gray-50 transition-colors"
//                   >
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex items-center">
//                         <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
//                           <span className="text-indigo-600 font-medium text-sm">
//                             {student.studentName.charAt(0).toUpperCase()}
//                           </span>
//                         </div>
//                         <div className="ml-4">
//                           <div className="text-sm font-medium text-gray-900">
//                             {student.studentName}
//                           </div>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-900">
//                         {student.email}
//                       </div>
//                       <div className="text-sm text-gray-500">
//                         {student.phone}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-900">
//                         {student.course}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span
//                         className={
//                           "inline-flex px-2 py-1 text-sm font-semibold rounded-full "
//                         }
//                       >
//                         {student?.studentID}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                       <button
//                         onClick={() => handleEdit(student)}
//                         className="text-indigo-600 hover:text-indigo-900 mr-4 p-1 hover:bg-indigo-50 rounded transition-colors"
//                       >
//                         <Edit size={16} />
//                       </button>
//                       <button
//                         onClick={() => handleDelete(student.id)}
//                         className="text-red-600 hover:text-red-900 p-1 hover:bg-red-50 rounded transition-colors"
//                       >
//                         <Trash2 size={16} />
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Modal */}
//         {isModalOpen && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//             <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
//               <div className="px-6 py-4 border-b border-gray-200">
//                 <h3 className="text-lg font-semibold text-gray-900">
//                   {editingStudent ? "Edit Student" : "Add New Student"}
//                 </h3>
//               </div>
//               <div className="p-6">
//                 <div className="space-y-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Student Name
//                     </label>
//                     <input
//                       type="text"
//                       name="studentName"
//                       value={formData.studentName}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Student ID
//                     </label>
//                     <input
//                       type="text"
//                       name="studentID"
//                       value={formData.studentID}
//                       onChange={handleInputChange}
//                       placeholder="e.g., 1901CS0115"
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Email
//                     </label>
//                     <input
//                       type="email"
//                       name="email"
//                       value={formData.email}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Course
//                     </label>
//                     <input
//                       type="text"
//                       name="course"
//                       value={formData.course}
//                       onChange={handleInputChange}
//                       placeholder="e.g., CSE, ECE, ME"
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                     />
//                   </div>
//                 </div>
//                 <div className="flex justify-end gap-3 mt-6">
//                   <button
//                     type="button"
//                     onClick={() => setIsModalOpen(false)}
//                     className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="button"
//                     onClick={handleSubmit}
//                     className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md transition-colors"
//                   >
//                     {editingStudent ? "Update" : "Add"} Student
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Edit, Mail, Phone, Plus, Trash2, User } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import {
  addStudentRegister,
  deleteStudent,
  getStudentList,
  updateStudent,
} from "../../../../api/apiService";
import Loading from "../../../../components/ui/Loading";

export default function StudentList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [formData, setFormData] = useState({
    studentName: "",
    studentID: "",
    email: "",
    course: "",
  });

  const queryClient = useQueryClient();

  // Fetch students query
  const {
    data: studentList,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["studentList"],
    queryFn: getStudentList,
  });

  // Add student mutation
  const { mutate: addStudent, isPending: isAdding } = useMutation({
    mutationFn: addStudentRegister,
    onSuccess: () => {
      queryClient.invalidateQueries(["studentList"]);
      resetForm();
      toast.success("Student added successfully!");
    },
    onError: (error) => {
      console.error("Error adding student:", error);
      toast.error("Failed to add student. Please try again.");
    },
  });

  // Update student mutation
  const { mutate: handleUpdateStudent, isPending: isUpdating } = useMutation({
    mutationFn: ({ id, studentData }) => updateStudent(id, studentData),
    onSuccess: () => {
      queryClient.invalidateQueries(["studentList"]);
      resetForm();
      toast.success("Student updated successfully!");
    },
    onError: (error) => {
      console.error("Error updating student:", error);
      toast.error("Failed to update student. Please try again.");
    },
  });

  // Delete student mutation
  const { mutate: handleDeleteStudent, isPending: isDeleting } = useMutation({
    mutationFn: (id) => deleteStudent(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["studentList"]);
      toast.success("Student deleted successfully!");
    },
    onError: (error) => {
      console.error("Error deleting student:", error);
      toast.error("Failed to delete student. Please try again.");
    },
  });

  // Helper functions
  const resetForm = () => {
    setIsModalOpen(false);
    setFormData({ studentName: "", email: "", studentID: "", course: "" });
    setEditingStudent(null);
  };

  const validateForm = () => {
    if (!formData.studentName.trim()) {
      toast.error("Student name is required");
      return false;
    }
    if (!formData.studentID.trim()) {
      toast.error("Student ID is required");
      return false;
    }
    if (!formData.email.trim()) {
      toast.error("Email is required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    if (!formData.course.trim()) {
      toast.error("Course is required");
      return false;
    }
    return true;
  };

  // Event handlers
  const handleAdd = () => {
    setEditingStudent(null);
    setFormData({ studentName: "", email: "", studentID: "", course: "" });
    setIsModalOpen(true);
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
    setFormData({
      studentName: student.studentName || "",
      studentID: student.studentID || "",
      email: student.email || "",
      course: student.course || "",
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      handleDeleteStudent(id);
    }
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    if (editingStudent) {
      // Update existing student
      const updatedStudentData = {
        newStudentID: formData.studentID,
        newStudentName: formData.studentName,
        newEmail: formData.email,
        newCourse: formData.course,
      };

      handleUpdateStudent({
        id: editingStudent._id,
        studentData: updatedStudentData,
      });
    } else {
      // Add new student
      const newStudentData = {
        studentID: formData.studentID,
        studentName: formData.studentName,
        email: formData.email,
        course: formData.course,
      };

      addStudent(newStudentData);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Loading and error states
  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">
            Error Loading Students
          </h2>
          <p className="text-gray-600">{error.message}</p>
          <button
            onClick={() => queryClient.invalidateQueries(["studentList"])}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const students = studentList?.students || [];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-lg md:text-2xl lg:text-xl font-bold text-gray-900 mb-2">
                Student Management
              </h1>
              <p className="text-gray-600">
                Manage your student database efficiently
              </p>
            </div>
            <button
              onClick={handleAdd}
              disabled={isAdding || isUpdating}
              className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white px-2 sm:px-3 md:px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors"
            >
              <Plus size={20} />
              Add Student
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-1 lg:p-3 rounded-full bg-indigo-100 text-indigo-600">
                <User size={24} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Total Students
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {students.length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                <Mail size={24} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Active Courses
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {new Set(students.map((s) => s.course)).size}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <Phone size={24} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Enrolled This Month
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {
                    students.filter((s) => {
                      const createdAt = new Date(s.createdAt);
                      const now = new Date();
                      return (
                        createdAt.getMonth() === now.getMonth() &&
                        createdAt.getFullYear() === now.getFullYear()
                      );
                    }).length
                  }
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                <User size={24} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Active Students
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {students.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Student Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Students List
            </h2>
          </div>

          {students.length === 0 ? (
            <div className="px-6 py-8 text-center">
              <User size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No students found
              </h3>
              <p className="text-gray-500">
                Get started by adding your first student.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Student
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Course
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Registration ID
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {students.map((student) => (
                    <tr
                      key={student._id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                            <span className="text-indigo-600 font-medium text-sm">
                              {student.studentName?.charAt(0)?.toUpperCase() ||
                                "N"}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {student.studentName}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {student.email}
                        </div>
                        <div className="text-sm text-gray-500">
                          {student.phone || "No phone"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {student.course}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-sm font-semibold text-gray-700 bg-gray-100 rounded-full">
                          {student.studentID}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleEdit(student)}
                          disabled={isUpdating}
                          className="text-indigo-600 hover:text-indigo-900 disabled:text-indigo-400 mr-4 p-1 hover:bg-indigo-50 rounded transition-colors"
                          title="Edit student"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(student._id)}
                          disabled={isDeleting || isUpdating}
                          className="text-red-600 hover:text-red-900 disabled:text-red-400 p-1 hover:bg-red-50 rounded transition-colors"
                          title="Delete student"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  {editingStudent ? "Edit Student" : "Add New Student"}
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Student Name *
                    </label>
                    <input
                      type="text"
                      name="studentName"
                      value={formData.studentName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Enter student name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Student ID *
                    </label>
                    <input
                      type="text"
                      name="studentID"
                      value={formData.studentID}
                      onChange={handleInputChange}
                      placeholder="e.g., 1901CS0115"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Enter email address"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Course *
                    </label>
                    <input
                      type="text"
                      name="course"
                      value={formData.course}
                      onChange={handleInputChange}
                      placeholder="e.g., CSE, ECE, ME"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={resetForm}
                    disabled={isAdding || isUpdating}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400 rounded-md transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isAdding || isUpdating}
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 rounded-md transition-colors flex items-center gap-2"
                  >
                    {(isAdding || isUpdating) && (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    )}
                    {editingStudent ? "Update" : "Add"} Student
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
