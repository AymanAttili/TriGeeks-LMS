import { lazy } from "react";
import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import PrivateRoute from "../ui/PrivateRoute";
import PublicRoute from "../ui/PublicRoute";
import AppLayout from "../ui/AppLayout";
import Department from "../features/departments/Department";


const PageNotFound = lazy(() => import("../pages/PageNotFound"));
const Login = lazy(() => import("../pages/Login"));
const Account = lazy(() => import("../pages/Account"));
const Users = lazy(() => import("../pages/Users"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Courses = lazy(() => import("../pages/Courses"));
const MyCourses = lazy(() => import("../pages/MyCourses"));
const Certificates = lazy(() => import("../pages/Certificates"));
const MyCertificates = lazy(() => import("../pages/MyCertificates"));
const ForgotPassword = lazy(() => import("../pages/ForgotPassword"));
const ResetPassword = lazy(() => import("../pages/ResetPassword"));
const Course = lazy(() => import("../features/courses/Course"));
const Quiz = lazy(() => import("../features/quiz/Quiz"));
const Departments = lazy(() => import("../pages/Departments"));


const router = createBrowserRouter([
    {
        element:
            <PrivateRoute checkAuth="true">
                <Outlet />
            </PrivateRoute>,
        children: [
            {
                element:
                    <AppLayout />,
                children: [
                    { index: true, element: <Navigate to="dashboard" replace /> },
                    { path: 'dashboard', element: <Dashboard /> },
                    { path: 'account', element: <Account /> },
                    { path: 'courses', element: <Courses /> },
                    {
                        path: 'course',
                        children: [
                            { index: true, element: <Course /> },
                            { path: 'quiz/:quizId', element: <Quiz /> },
                        ]
                    },
                    // Staff routes
                    {
                        element:
                            <PrivateRoute allowedRoles={['Staff']} >
                                <Outlet />
                            </PrivateRoute>,
                        children: [
                            { path: 'my-certificates', element: <MyCertificates /> },
                        ]
                    },
                    // Admin routes
                    {
                        element:
                            <PrivateRoute allowedRoles={['Admin']} >
                                <Outlet />
                            </PrivateRoute>,
                        children: [
                            { path: 'users', element: <Users /> },
                            {
                                path: 'departments', children: [
                                    { index: true, element: <Departments /> },
                                    { path: '/departments/:departmentId', element: <Department /> },
                                ]
                            },
                        ]
                    },
                    // SubAdmin & Staff routes
                    {
                        element:
                            <PrivateRoute allowedRoles={['SubAdmin', 'Staff']} >
                                <Outlet />
                            </PrivateRoute>,
                        children: [
                            { path: 'my-courses', element: <MyCourses /> },
                        ]
                    },
                    // SubAdmin & Admin routes
                    {
                        element:
                            <PrivateRoute allowedRoles={['Admin', 'SubAdmin']} >
                                <Outlet />
                            </PrivateRoute>,
                        children: [
                            { path: 'certificates', element: <Certificates /> },
                        ]
                    }
                ]
            }
        ]
    },
    // Guest Routes
    {
        element: <PublicRoute />,
        children: [
            { path: 'login', element: <Login /> },
            { path: 'forgot-password', element: <ForgotPassword /> },
            { path: 'reset-password', element: <ResetPassword /> },
        ]
    },
    {
        element: <PageNotFound />,
        path: "*"
    }
]);

export default router;