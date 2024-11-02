import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Login from './pages/Login'
import Account from './pages/Account'
import '@fontsource/sora'
import PageNotFound from "./pages/PageNotFound"
import PrivateRoute from "./services/PrivateRoute"
import AppLayout from "./ui/AppLayout"
import Dashboard from "./pages/Dashboard"
import Courses from "./pages/Courses"
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
          {/* User Routes */}
          <Route element=
            {
              <PrivateRoute allowedRoles={['admin', 'staff', 'user']} >
                <AppLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<Navigate replace to="dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="account" element={<Account />} />
            <Route path="my-courses" element={<MyCourses />} />
            <Route path="courses" element={<Courses />} />
            <Route path="certificates" element={<Certificates />} />
          </Route>

          {/* Admin routes */}
          <Route element=
            {
              <PrivateRoute allowedRoles={['admin']} >
                <AppLayout />
              </PrivateRoute>
            }
          >
            <Route path="users" element={<Users />} />
          </Route>

          {/* Guest Routes */}
          <Route path="login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />

        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
