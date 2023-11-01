import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateUser as updateUserApi } from '../../services/apiAuth'
import toast from 'react-hot-toast'

export function useUpdateUser() {
  const queryClient = useQueryClient()

  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: ({ fullName, password, avatar }) =>
      updateUserApi({ fullName, password, avatar }),
    onSuccess: () => {
      toast.success('User successfully update.')
      queryClient.invalidateQueries({ queryKey: ['user'] })
    },
    onError: (err) => {
      toast.error(err.message)
    },
  })
  return { updateUser, isUpdating }
}
