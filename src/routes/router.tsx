import { lazy } from "react";
import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import PrivateRoute from "../ui/PrivateRoute";
import PublicRoute from "../ui/PublicRoute";
import AppLayout from "../ui/AppLayout";
import ErrorBoundary from "../Error/ErrorBoundary.tsx";
import NotificationPage from "../features/notifications/NotificationPage.tsx";

const PageNotFound = lazy(() => import("../pages/PageNotFound.tsx"));
const Login = lazy(() => import("../pages/Login.tsx"));
const Account = lazy(() => import("../pages/Account.tsx"));
const Users = lazy(() => import("../pages/Users.tsx"));
const Dashboard = lazy(() => import("../pages/Dashboard/Dashboard.tsx"));
const Courses = lazy(() => import("../pages/Courses.tsx"));
const ForgotPassword = lazy(() => import("../pages/ForgotPassword.tsx"));
const ResetPassword = lazy(() => import("../pages/ResetPassword.tsx"));
const Course = lazy(() => import("../features/courses/Course.tsx"));
const Quiz = lazy(() => import("../features/quiz/Quiz.tsx"));
const Departments = lazy(() => import("../pages/Departments.tsx"));
const Department = lazy(() => import("../features/departments/Department.tsx"));
const Notifications = lazy(() => import("../pages/Notifications.tsx"));

const router = createBrowserRouter([
  {
    path: "/*",
    element: (
      <ErrorBoundary>
        <Outlet />
      </ErrorBoundary>
    ),
    children: [
      {
        element: (
          <PrivateRoute checkAuth={true}>
            <Outlet />
          </PrivateRoute>
        ),
        children: [
          {
            element: <AppLayout />,
            children: [
              { index: true, element: <Navigate to="dashboard" replace /> },
              { path: "dashboard", element: <Dashboard /> },
              { path: "account", element: <Account /> },
              {
                path: "notifications",
                children: [
                  { index: true, element: <Notifications /> },
                  { path: ":notificationId", element: <NotificationPage /> },
                ],
              },
              // Staff routes
              // {
              //   element: (
              //     <PrivateRoute allowedRoles={["Staff"]}>
              //       <Outlet />
              //     </PrivateRoute>
              //   ),
              //   children: [

              //   ],
              // },
              // Admin routes
              {
                element: (
                  <PrivateRoute allowedRoles={["Admin"]}>
                    <Outlet />
                  </PrivateRoute>
                ),
                children: [
                  { path: "users", element: <Users /> },
                  {
                    path: "departments",
                    children: [
                      { index: true, element: <Departments /> },
                      { path: ":departmentId", element: <Department /> },
                    ],
                  },
                  {
                    path: "courses",
                    children: [
                      { index: true, element: <Courses /> },

                      {
                        path: ":courseId",
                        children: [
                          { index: true, element: <Course /> },
                          { path: "quiz/:quizId", element: <Quiz /> },
                        ],
                      },
                    ],
                  },
                ],
              },
              // SubAdmin & Staff routes
              {
                element: (
                  <PrivateRoute allowedRoles={["SubAdmin", "Staff"]}>
                    <Outlet />
                  </PrivateRoute>
                ),
                children: [
                  {

                    path: "my-courses", children: [
                      { index: true, element: <Courses /> },


                      {
                        path: ":courseId",
                        children: [
                          { index: true, element: <Course /> },
                          { path: "quiz/:quizId", element: <Quiz /> },
                        ],
                      },
                    ],
                  },
                ],
              },

              // // SubAdmin & Admin routes
              // {
              //   element: (
              //     <PrivateRoute allowedRoles={["Admin", "SubAdmin"]}>
              //       <Outlet />
              //     </PrivateRoute>
              //   ),
              //   children: [
              //     {  }
              //   ],
              // },
            ],
          },
        ],
      },
      // Guest Routes
      {
        element: <PublicRoute />,
        children: [
          { path: "login", element: <Login /> },
          { path: "forgot-password", element: <ForgotPassword /> },
          { path: "reset-password", element: <ResetPassword /> },
        ],
      },
      {
        element: <PageNotFound />, //TODO: implement 404 page, unauthorized pages
        path: "*",
      },
    ],
  },
]);

export default router;
