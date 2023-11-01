import { useNavigate } from 'react-router-dom'
import { useUser } from '../features/authentication/useUser'
import SpinnerFullPage from './SpinnerFullPage'
import { useEffect } from 'react'

function ProtectedRoute({ children }) {
  const navigate = useNavigate()
  //1. Loading authenticated user
  const { isLoading, isAuthenticated } = useUser()
  //3.If No authenticated user, redirect to the login
  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate('/login')
  }, [isAuthenticated, isLoading, navigate])

  //2.While loading return SpinnerFullPage
  if (isLoading) return <SpinnerFullPage />

  //4.If authenticated user, render the app
  if (isAuthenticated) return children
}

export default ProtectedRoute
