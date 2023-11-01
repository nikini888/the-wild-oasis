import { subDays } from 'date-fns'
import { useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getBookingsAfterDate } from '../../services/apiBookings'

export function useRecentBookings() {
  const [searchParams] = useSearchParams()

  const numDays = +searchParams.get('last') || 7

  const queryDate = subDays(new Date(), numDays).toISOString()

  const { data: recentBookings, isLoading } = useQuery({
    queryKey: ['bookings', `last-${numDays}`],
    queryFn: () => getBookingsAfterDate(queryDate),
  })

  return { recentBookings, isLoading }
}
