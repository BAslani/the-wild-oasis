import { useQuery } from '@tanstack/react-query'
import { BookingType } from '../../types'
import { getBookins } from '../../services/apiBookings'

export function useBookings() {
  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery({
    queryKey: ['bookings'],
    queryFn: getBookins,
  })

  return { bookings, isLoading, error } as {
    bookings: BookingType[]
    isLoading: boolean
    error: Error
  }
}
