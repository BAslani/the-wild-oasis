import { HiArrowRightOnRectangle } from 'react-icons/hi2'
import ButtonIcon from '../../ui/ButtonIcon'
import { useLogout } from './useLogout'
import SpinnerMini from '../../ui/Spinner.Mini'

export default function Logout() {
  const { logout, isLogingOut } = useLogout()
  return (
    <ButtonIcon disabled={isLogingOut} onClick={() => logout()}>
      {isLogingOut ? <SpinnerMini /> : <HiArrowRightOnRectangle />}
    </ButtonIcon>
  )
}
