import React from 'react';
import { Suspense } from "react"
import {RouterProvider } from "react-router-dom"
import { Provider } from "react-redux"
import { QueryClientProvider } from "@tanstack/react-query"
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

import SpinnerLoader from "./ui/SpinnerLoader.tsx"

import theme from "./utils/theme.js"
import store from './store.js'

import '@fontsource/sora'
import queryClient from "./cache/queryClient.js"
import router from "./utils/router.tsx"


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
