import Button from '../../ui/Button'
import { useCheckout } from './useCheckout'

type Props = {
  bookingId: number
}

function CheckoutButton({ bookingId }: Props) {
  const { checkout, isCheckingOut } = useCheckout()
  return (
    <Button
      disabled={isCheckingOut}
      onClick={() => checkout({ bookingId })}
      variation='primary'
      size='small'
    >
      Check out
    </Button>
  )
}

export default CheckoutButton
