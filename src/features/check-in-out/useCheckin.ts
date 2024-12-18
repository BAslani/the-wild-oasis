import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateBooking } from '../../services/apiBookings'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { BookingType } from '../../types'

export function useCheckin() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { mutate: checkin, isPending: isCheckingIn } = useMutation<
    BookingType,
    Error,
    {
      bookingId: number
      breakfast?: {
        hasBreakfast: boolean
        extrasPrice: number
        totalPrice: number
      }
    }
  >({
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        status: 'checked-in',
        isPaid: true,
        ...breakfast,
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked in`)
      queryClient.invalidateQueries({
        queryKey: ['booking'],
      })
      navigate('/')
    },
    onError: () => toast.error('There was an error while checking in'),
  })

  return { checkin, isCheckingIn }
}
