import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Login from './pages/Login.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Signup from './pages/Signup.jsx';
import WelcomePage from './pages/WelcomePage.jsx';
import OnlineExamInterface from './pages/OnlineExamInterface.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MainLayout from './Layout/MainLayout.jsx';
import AdminDashboard from './pages/Admin/AdminDashboard.jsx';
import QuizeQuestionCreate from './pages/Admin/pages/examManagement/QuizeQuestionCreate.jsx';
import HomeDashboard from './pages/Admin/pages/main/HomeDashboard.jsx';
import { AdminProvider } from './context/AdminContext.jsx';
import ExamManagement from './pages/Admin/pages/examManagement/ExamManagement.jsx';
import PageNotFound from './pages/PageNotFound.jsx';
import Results from './pages/results/Results.jsx';
import CheckIfAlreadyAuthenticated from './components/auth/CheckIfAlreadyAuthenticated.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import ProtectedRoute from './components/element/ProtectedRoute.jsx';
import ReviewExamResults from './pages/results/ReviewExamResults.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      {/* //dashboard route for admin */}
      <Route path='/admin' element={<AdminDashboard />}>
        <Route path='dashboard' element={<HomeDashboard />} />
        <Route path='exam-questions' element={<ExamManagement />} />
      </Route>
      {/* //main routes */}
      
      <Route element={<ProtectedRoute />}>
      <Route path='/' element={<WelcomePage />} />
      <Route path='/online-exam' element={<MainLayout />}/>
      <Route path='/results/:resultId' element={<Results />} /> 
      <Route path = "/review-exam-results/:resultId" element={<ReviewExamResults   />} />
      </Route>
      <Route path ='/auth' element={<CheckIfAlreadyAuthenticated />}>
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<Signup />} /> 
      </Route>
      <Route path='*' element={<PageNotFound/>}/>
     </Route>
  )
);

const queryClient = new QueryClient();
createRoot(document.getElementById('root')).render(

  <AdminProvider>
    <AuthProvider>
   <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} /> 
     <ToastContainer />
   </QueryClientProvider>
   </AuthProvider>
  </AdminProvider>
)
