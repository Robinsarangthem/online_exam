import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CheckIfAlreadyAuthenticated from "./components/auth/CheckIfAlreadyAuthenticated.jsx";
import AdminRoute from "./components/element/AdminRoute.jsx";
import StudentRoute from "./components/element/StudentRoute.jsx";
import { AdminProvider } from "./context/AdminContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import "./index.css";
import MainLayout from "./Layout/MainLayout.jsx";
import AdminDashboard from "./pages/Admin/AdminDashboard.jsx";
import ExamManagement from "./pages/Admin/pages/examManagement/ExamManagement.jsx";
import HomeDashboard from "./pages/Admin/pages/main/HomeDashboard.jsx";
import AllExamResults from "./pages/Admin/pages/results/AllExamResutls.jsx";
import StudentList from "./pages/Admin/pages/studentManagement/StudentList.jsx";
import Login from "./pages/Login.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import Signup from "./pages/Signup.jsx";
import Results from "./pages/studentResults/Results.jsx";
import ReviewExamResults from "./pages/studentResults/ReviewExamResults.jsx";
import WelcomePage from "./pages/WelcomePage.jsx";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      {/* //dashboard route for admin */}
      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<AdminDashboard />}>
          <Route path="dashboard" element={<HomeDashboard />} />
          <Route path="exam-questions" element={<ExamManagement />} />
          <Route path="students-list" element={<StudentList />} />
          <Route path="all-results" element={<AllExamResults />} />
        </Route>
      </Route>
      {/* //main routes */}
      <Route element={<StudentRoute />}>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/online-exam" element={<MainLayout />} />
        <Route path="/results/:resultId" element={<Results />} />
        <Route
          path="/review-exam-results/:resultId"
          element={<ReviewExamResults />}
        />
      </Route>
      <Route path="/auth" element={<CheckIfAlreadyAuthenticated />}>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Route>
  )
);

const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <AdminProvider>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ToastContainer />
      </QueryClientProvider>
    </AuthProvider>
  </AdminProvider>
);
