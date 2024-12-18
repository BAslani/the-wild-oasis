import { useQuery } from '@tanstack/react-query'
import { BookingType } from '../../types'
import { getBooking } from '../../services/apiBookings'
import { useParams } from 'react-router-dom'

export function useBooking() {
  const { bookingId } = useParams()
  const { isLoading, data: booking } = useQuery({
    queryKey: ['booking', bookingId],
    queryFn: () => getBooking(bookingId!),
    retry: false,
  })

  return { booking, isLoading } as { booking: BookingType; isLoading: boolean }
}
