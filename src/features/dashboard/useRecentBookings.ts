import { useQuery } from '@tanstack/react-query'
import { ISOStringFormat, subDays } from 'date-fns'
import { useSearchParams } from 'react-router-dom'
import { getBookingsAfterDate } from '../../services/apiBookings'
import { BookingType } from '../../types'

export function useRecentBookings() {
  const [searchParams] = useSearchParams()

  const numDays = !searchParams.get('last')
    ? 7
    : Number(searchParams.get('last'))

  const queryDate = subDays(new Date(), numDays).toISOString()

  const { data: bookings, isLoading: isLoadingBookings } = useQuery({
    queryFn: () => getBookingsAfterDate(queryDate as ISOStringFormat),
    queryKey: ['bookings', `last-${numDays}`],
  })

  return { bookings, isLoadingBookings } as {
    bookings: Partial<BookingType>[]
    isLoadingBookings: boolean
  }
}
