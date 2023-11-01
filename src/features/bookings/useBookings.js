import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getBookings } from '../../services/apiBookings'
import { useSearchParams } from 'react-router-dom'
import { DATA_PER_PAGE } from '../../utils/constants'

export function useBookings() {
  const queryClient = useQueryClient()
  const [searchParams] = useSearchParams()

  //1.Filter
  const filterValue = searchParams.get('status')
  const filters =
    !filterValue || filterValue === 'all'
      ? null
      : [{ filterField: 'status', value: filterValue, method: 'eq' }]

  //2.Sort
  const sortByRaw = searchParams.get('sortBy') || 'startDate-desc'
  const [fieled, direction] = sortByRaw.split('-')
  const sortBy = { fieled, direction }

  //3.Pagination
  const page = +searchParams.get('page') || 1

  //Query
  const {
    data: { data: bookings, count } = {},
    error,
    isLoading,
  } = useQuery({
    queryKey: ['bookings', filters, sortBy, page],
    queryFn: () => getBookings({ filters, sortBy, page }),
  })

  //Prefetching
  const pageCount = Math.ceil(count / DATA_PER_PAGE)

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ['bookings', filters, sortBy, page - 1],
      queryFn: () => getBookings({ filters, sortBy, page: page - 1 }),
    })
  }
  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ['bookings', filters, sortBy, page + 1],
      queryFn: () => getBookings({ filters, sortBy, page: page + 1 }),
    })
  }

  return { bookings, count, error, isLoading }
}
