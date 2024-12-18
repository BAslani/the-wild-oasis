import { useQuery, useQueryClient } from '@tanstack/react-query'
import { BookingType } from '../../types'
import { getBookins } from '../../services/apiBookings'
import { useSearchParams } from 'react-router-dom'
import { PAGE_SIZE } from '../../utils/constants'

export function useBookings() {
  const [searchParams] = useSearchParams()
  const queryClient = useQueryClient()

  const filterValue = searchParams.get('status')
  const filter =
    !filterValue || filterValue === 'all'
      ? null
      : { field: 'status', value: filterValue }

  const sortByRaw = searchParams.get('sortBy') || 'startDate-desc'
  const [field, direction] = sortByRaw.split('-')
  const sortBy = { field, direction }

  const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'))

  const { isLoading, error, data } = useQuery({
    queryKey: ['bookings', filter, sortBy, page],
    queryFn: () => getBookins({ filter, sortBy, page }),
  })

  const { data: bookings, count } =
    (data as {
      data: BookingType[]
      count: number
    }) || {}

  // prefetching
  const pageCount = Math.ceil(count / PAGE_SIZE)
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page + 1],
      queryFn: () => getBookins({ filter, sortBy, page: page + 1 }),
    })

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page - 1],
      queryFn: () => getBookins({ filter, sortBy, page: page - 1 }),
    })

  return { bookings, isLoading, error, count } as {
    bookings: BookingType[]
    isLoading: boolean
    error: Error
    count: number
  }
}
