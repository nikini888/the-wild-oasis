import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'react-hot-toast'
import { Suspense, lazy } from 'react'
import { DarkModeProvider } from './context/DarkModeContext'

import AppLayout from './ui/AppLayout'
import GlobalStyles from './styles/GlobalStyles'
import ProtectedRoute from './ui/ProtectedRoute'
import Spinner from './ui/Spinner'

const Dashboard = lazy(() => import('./pages/Dashboard'))
const PageNotFound = lazy(() => import('./pages/PageNotFound'))
const Bookings = lazy(() => import('./pages/Bookings'))
const Login = lazy(() => import('./pages/Login'))
const Settings = lazy(() => import('./pages/Settings'))
const Account = lazy(() => import('./pages/Account'))
const Users = lazy(() => import('./pages/Users'))
const Cabins = lazy(() => import('./pages/Cabins'))
const Booking = lazy(() => import('./pages/Booking'))
const Checkin = lazy(() => import('./pages/Checkin'))

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 60 * 1000 },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <GlobalStyles />
      <Suspense fallback={<Spinner />}>
        <DarkModeProvider>
          <BrowserRouter>
            <Routes>
              <Route
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="bookings" element={<Bookings />} />
                <Route path="booking/:bookingId" element={<Booking />} />
                <Route path="checkin/:bookingId" element={<Checkin />} />
                <Route path="cabins" element={<Cabins />} />
                <Route path="users" element={<Users />} />
                <Route path="setting" element={<Settings />} />
                <Route path="account" element={<Account />} />
              </Route>
              <Route path="login" element={<Login />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </BrowserRouter>
        </DarkModeProvider>
      </Suspense>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: '8px' }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 3000,
          },
          style: {
            fontSize: '16px',
            maxWidth: '500px',
            padding: '16px 24px',
            backgroundColor: 'var(--color-grey-0)',
            color: 'var(--color-grey-700)',
          },
        }}
      />
    </QueryClientProvider>
  )
}

export default App
