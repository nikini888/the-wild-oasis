import { useMutation, useQueryClient } from '@tanstack/react-query'
import { signUpUser as signUpUserApi } from '../../services/apiAuth'
import toast from 'react-hot-toast'

export function useSignupUser() {
  const queryClient = useQueryClient()

  const { mutate: signUpUser, isLoading: isSigningUp } = useMutation({
    mutationFn: ({ email, password, fullName }) =>
      signUpUserApi(email, password, fullName),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] })
      toast.success('User successfully create.')
    },
    onError: (err) => {
      toast.error(err.message)
    },
  })
  return { signUpUser, isSigningUp }
}
