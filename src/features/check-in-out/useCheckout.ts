import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateBooking } from '../../services/apiBookings'
import toast from 'react-hot-toast'
import { BookingType } from '../../types'

export function useCheckout() {
  const queryClient = useQueryClient()
  const { mutate: checkout, isPending: isCheckingOut } = useMutation<
    BookingType,
    Error,
    {
      bookingId: number
    }
  >({
    mutationFn: ({ bookingId }) =>
      updateBooking(bookingId, {
        status: 'checked-out',
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked out`)
      queryClient.invalidateQueries({
        queryKey: ['booking'],
      })
    },
    onError: () => toast.error('There was an error while checking out'),
  })

  return { checkout, isCheckingOut }
}
