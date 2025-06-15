import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import { AdminLogin, StudentLogin } from '../api/apiService';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

export default function LoginForms() {
  const {login} = useAuth()
  const [loginType, setLoginType] = useState('student');
  const [formData, setFormData] = useState({
    studentID: '',
    studentName: '',
    email: '',
    admincode: ''
  });
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const value = e.target.name === 'admincode' ? e.target.value.replace(/[^0-9]/g, '') : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

    const {mutate: studentMutation, isPending: studentPending, isError: studentError} = useMutation({
      mutationFn: StudentLogin,
      onSuccess: (response) => {
        // Check the structure of the response and log it for debugging
        console.log('Student login response:', response);

        // Try to access the student data from different possible response structures
        const studentData = response?.student || response?.data?.student || response?.data;

        if (studentData) {
          login();
          toast.success('Student login successful');
          // Save student data to localStorage
          localStorage.setItem('student', JSON.stringify(studentData));
          window.location.href = '/';
        } else {
          toast.error('Student data not found in response');
        }
      },
      onError: (error) => {
        toast.error('Student login failed');
        console.error('Login failed:', error);
      }
    });

  const {mutate: adminMutation, isPending: adminPending, isError: adminError} = useMutation({
    mutationFn: AdminLogin,
    onSuccess: (response) => {
      console.log(response?.admin,"admin response");  
      toast.success('Admin login successful');
      window.location.href = '/admin/dashboard';
      login();

      // localStorage.setItem('adminData', JSON.stringify({response: response?.admin}));
      // // navigate('/admin/dashboard', { state: { adminData: response?.admin, token: response?.token } });
        
      // }));
    },
    onError: (error) => {
      toast.error('Admin login failed');
      console.error('Admin login failed:', error);
    }
  });

  const isPending = studentPending || adminPending;
  const isError = studentError || adminError;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (loginType === 'student') {
      if (!formData.studentID || !formData.studentName) {
        toast.error('Please fill in all required fields');
        return;
      }
      studentMutation({
        studentID: formData.studentID,
        studentName: formData.studentName
      });
    } 
    else {
      if (!formData.email || !formData.admincode) {
        toast.error('Please fill in all required fields');
        return;
      }
      adminMutation({
        email: formData.email,
        admincode: Number(formData.admincode)
      });
    }
  };

  // if (isPending) {
  //   return <div className="text-center text-gray-600">Logging in...</div>;
  // }
  // if (isError) {
  //   return <div className="text-center text-red-600">Login failed. Please try again.</div>;
  // }
  // if (data) {
  //   return <div className="text-center text-green-600">Login successful!</div>;
  // }

  // if (data && data.status === 'error') {
  //   return <div className="text-center text-red-600">Login failed: {data.message}</div>;
  // }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Login Type Selector */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="flex">
            <button
              onClick={() => setLoginType('student')}
              className={`flex-1 py-4 px-6 font-semibold transition-all duration-300 ${
                loginType === 'student'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Student Login
            </button>
            <button
              onClick={() => setLoginType('admin')}
              className={`flex-1 py-4 px-6 font-semibold transition-all duration-300 ${
                loginType === 'admin'
                  ? 'bg-teal-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Admin Login
            </button>
          </div>

          {/* Form Content */}
          <div className="p-8">
            <div className="text-center mb-8">
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                loginType === 'student' ? 'bg-green-100' : 'bg-teal-100'
              }`}>
                {loginType === 'student' ? (
                  <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                  </svg>
                ) : (
                  <svg className="w-8 h-8 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                {loginType === 'student' ? 'Student Portal' : 'Admin Dashboard'}
              </h2>
              <p className="text-gray-600 mt-2">
                {loginType === 'student' 
                  ? 'Access your exams and results' 
                  : 'Manage exams and students'
                }
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Student Login Fields */}
              {loginType === 'student' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Student Name
                    </label>
                    <input
                      type="text"
                      name="studentName"
                      value={formData.studentName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                      placeholder="Enter your student Name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                     Student ID
                    </label>
                    <input
                      type="text"
                      name="studentID"
                      value={formData.studentID}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                      placeholder="Enter your Student ID"
                      required
                    />
                  </div>
                </>
              )}

              {/* Admin Login Fields */}
              {loginType === 'admin' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Admin Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                      placeholder="Enter admin email"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Admin Code
                    </label>
                    <input
                      type="text"
                      name="admincode"
                      value={formData.admincode || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                      placeholder="Enter admin code"
                      required
                    />
                  </div>
                </>
              )}

              {/* Remember Me & Forgot Password */}
              

                      <button
                      type="submit"
                      className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-colors ${
                        loginType === 'student'
                        ? 'bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-200'
                        : 'bg-teal-600 hover:bg-teal-700 focus:ring-4 focus:ring-teal-200'
                      } ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
                      disabled={isPending}
                      >
                      {isPending 
                        ? 'Logging in...' 
                        : loginType === 'student' 
                        ? 'Login to Portal' 
                        : 'Access Dashboard'
                      }
                      </button>
                      {isError && (
                      <p className="mt-2 text-sm text-red-600 text-center">
                        Login failed. Please try again.
                      </p>
                      )}
            </form>

                    {/* Additional Links */}
            <div className="mt-6 text-center">
              {loginType === 'student' && (
                <p className="text-sm text-gray-600">
                  Don't have an account?{' '}
                  <Link to={'/'} className="text-green-600 hover:text-green-500 font-medium">
                    Contact your instructor
                  </Link>
                </p>
              )}
              {loginType === 'admin' && (
                <p className="text-sm text-gray-600">
                  Need help?{' '}
                  <Link className="text-teal-600 hover:text-teal-500 font-medium">
                    Contact IT Support
                  </Link>
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            Secure exam platform • Protected by end-to-end encryption
          </p>
        </div>
      </div>
    </div>
  );
}