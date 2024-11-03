import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Login from './pages/Login'
import Account from './pages/Account'
import '@fontsource/sora'
import PageNotFound from "./pages/PageNotFound"
import PrivateRoute from "./services/PrivateRoute"
import AppLayout from "./ui/AppLayout"
import Dashboard from "./pages/Dashboard"
import MyCertificates from "./pages/MyCertificates"
import Courses from "./pages/Courses"
import ForgotPassword from "./pages/ForgotPassword"
import ResetPassword from "./pages/ResetPassword"
import Course from './features/courses/Course'
import Quiz from './features/quiz/Quiz'
import MyCourses from "./pages/MyCourses"
import Users from "./pages/Users"
import Certificates from "./pages/Certificates"
import theme from "./utils/theme"
import { ThemeProvider } from "@emotion/react"


// const PageNotFound = lazy(() => import("./pages/PageNotFound"));
// const Login = lazy(() => import("./pages/Login"));
// const Account = lazy(() => import("./pages/Account"));
// const Users = lazy(() => import("./pages/Users"));
// const Dashboard = lazy(() => import("./pages/Dashboard"));
// const Courses = lazy(() => import("./pages/Courses"));
// const MyCourses = lazy(() => import("./pages/MyCourses"));
// const Certificates = lazy(() => import("./pages/Certificates"));


function App() {
  return (
    <ThemeProvider theme={theme} >
      <BrowserRouter >
        <Routes>
          <Route element=
            {

              <PrivateRoute checkAuth="true" >
                <AppLayout />
              </PrivateRoute>
            }
          >
            {/* Global Routes */}

            <Route index element={<Navigate replace to="dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="account" element={<Account />} />
            <Route path="courses" element={<Courses />} />
            <Route path="course">
              <Route index element={<Course />} />
              <Route path="quiz/:quizId" element={<Quiz />} />
            </Route>


            {/* Staff routes */}
            <Route element=
              {
                <PrivateRoute allowedRoles={['Staff']} />
              }
            >
              <Route path="my-certificates" element={<MyCertificates />} />
            </Route>

            {/* Admin routes */}
            <Route element=
              {
                <PrivateRoute allowedRoles={['Admin']} />
              }
            >
              <Route path="users" element={<Users />} />
            </Route>

            {/* SubAdmin & Staff routes */}
            <Route element=
              {
                <PrivateRoute allowedRoles={['SubAdmin']} />
              }
            >
              <Route path="my-courses" element={<MyCourses />} />
            </Route>

            {/* SubAdmin & Admin routes */}
            <Route element=
              {
                <PrivateRoute allowedRoles={['Admin', 'SubAdmin']} />
              }
            >
              <Route path="certificates" Component={Certificates} />
            </Route>

          </Route>
          {/* Guest Routes */}
          <Route path="login" element={<Login />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="*" element={<PageNotFound />} />

        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
