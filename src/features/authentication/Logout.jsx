import ButtonIcon from '../../ui/ButtonIcon'
import { HiArrowRightOnRectangle } from 'react-icons/hi2'
import { useLogout } from './useLogout'
import SpinnerMini from '../../ui/SpinnerMini'

function Logout() {
  const { loggingOut, isLoggingOut } = useLogout()
  return (
    <ButtonIcon onClick={loggingOut} disabled={isLoggingOut}>
      {isLoggingOut ? <SpinnerMini /> : <HiArrowRightOnRectangle />}
    </ButtonIcon>
  )
}

export default Logout
