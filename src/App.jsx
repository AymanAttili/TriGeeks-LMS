import { lazy, Suspense } from "react"
import { BrowserRouter, Navigate, Route, RouterProvider, Routes } from "react-router-dom"
import { Provider } from "react-redux"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ThemeProvider } from "@emotion/react"
import { DialogsProvider, NotificationsProvider } from "@toolpad/core"

// import Login from './pages/Login'
// import Account from './pages/Account'
// import PageNotFound from "./pages/PageNotFound"
// import Dashboard from "./pages/Dashboard"
// import Courses from "./pages/Courses"
// import ForgotPassword from "./pages/ForgotPassword"
// import ResetPassword from "./pages/ResetPassword"
// import MyCertificates from "./pages/MyCertificates"
// import MyCourses from "./pages/MyCourses"
// import Users from "./pages/Users"
// import Certificates from "./pages/Certificates"

import SpinnerLoader from "./ui/SpinnerLoader"

import theme from "./utils/theme"
import store from './store'

import '@fontsource/sora'
import queryClient from "./cache/queryClient"
import router from "./utils/router.jsx"


function App() {

  return (
    <ThemeProvider theme={theme} >
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <NotificationsProvider>
            <DialogsProvider>
              <Suspense fallback={<SpinnerLoader />} >
                <RouterProvider router={router} />
              </Suspense>
              <ReactQueryDevtools
                initialIsOpen={false}
                position="left"
                buttonPosition="bottom-left"
              />
            </DialogsProvider>
          </NotificationsProvider>
        </Provider>
      </QueryClientProvider>
    </ThemeProvider >
  )
}

export default App
