import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createUpdateCabin as updateCabinApi } from '../../services/apiCabins'
import toast from 'react-hot-toast'

export function useUpdateCabin() {
  const queryClient = useQueryClient()

  const { isLoading: isUpdating, mutate: updateCabin } = useMutation({
    mutationFn: ({ newCabin, id }) => updateCabinApi(newCabin, id),
    onSuccess: () => {
      toast.success('Cabin successfully update.')
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      })
    },
    onError: (err) => toast.error(err.message),
  })

  return { isUpdating, updateCabin }
}
