import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createUpdateCabin as createCabinApi } from '../../services/apiCabins'
import toast from 'react-hot-toast'

export function useCreateCabin() {
  const queryClient = useQueryClient()

  const { isLoading: isCreating, mutate: createCabin } = useMutation({
    mutationFn: (cabin, id) => createCabinApi(cabin, id),
    onSuccess: () => {
      toast.success('Cabin successfully create.')
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      })
    },
    onError: (err) => toast.error(err.message),
  })
  return { isCreating, createCabin }
}
