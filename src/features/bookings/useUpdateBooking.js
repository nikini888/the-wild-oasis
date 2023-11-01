import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateBooking as updateBookingApi } from '../../services/apiBookings'
import toast from 'react-hot-toast'

export function useUpdateBooking() {
  const queryClient = useQueryClient()

  const { mutate: updateBooking, isLoading: isUpdating } = useMutation({
    mutationFn: ({ bookingId, newBooking }) =>
      updateBookingApi(bookingId, newBooking),
    onSuccess: () => {
      toast.success('Booking successfully update.')
      queryClient.invalidateQueries({ queryKey: ['bookings'] })
    },
    onError: (err) => {
      toast.error(err.message)
    },
  })
  return { updateBooking, isUpdating }
}
