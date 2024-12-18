import { useQuery } from '@tanstack/react-query'
import { BookingType } from '../../types'
import { getBookins } from '../../services/apiBookings'
import { useSearchParams } from 'react-router-dom'

export function useBookings() {
  const [searchParams] = useSearchParams()

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

  return { bookings, isLoading, error, count } as {
    bookings: BookingType[]
    isLoading: boolean
    error: Error
    count: number
  }
}
