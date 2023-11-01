import { useMutation, useQueryClient } from '@tanstack/react-query'
import { loginUser } from '../../services/apiAuth'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export function useLogin() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const {
    isLoading: isLoggingIn,
    mutate: loggingIn,
    error,
  } = useMutation({
    mutationFn: loginUser,
    onSuccess: (user) => {
      queryClient.setQueryData(['user'], user.user)
      navigate('/dashboard', { replace: true })
    },
    onError: (err) => {
      console.log('Error', err)
      toast.error(`Provided email or password are incorrect.`)
    },
  })
  return { isLoggingIn, loggingIn, error }
}
