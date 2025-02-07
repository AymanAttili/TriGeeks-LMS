import React from 'react';
import { Suspense } from "react"
import { RouterProvider } from "react-router-dom"
import { Provider } from "react-redux"
import { QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ThemeProvider } from "@emotion/react"
import { DialogsProvider, NotificationsProvider } from "@toolpad/core"

import SpinnerLoader from "./ui/SpinnerLoader.tsx"

import theme from "./utils/theme.js"

import queryClient from "./cache/queryClient.js"
import router from "./routes/router.tsx"

function App() {

  return (
    <ThemeProvider theme={theme} >
      <QueryClientProvider client={queryClient}>
        <NotificationsProvider>
          <DialogsProvider>
            <Suspense fallback={<SpinnerLoader />} >
              <RouterProvider router={router} />
            </Suspense>
            <ReactQueryDevtools
              initialIsOpen={false}
              buttonPosition="bottom-left"
            />
          </DialogsProvider>
        </NotificationsProvider>
      </QueryClientProvider>
    </ThemeProvider >
  )
}

export default App
