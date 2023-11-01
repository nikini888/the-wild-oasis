import styled from 'styled-components'
import Logout from '../features/authentication/Logout'
import UserAvatar from '../features/authentication/UserAvatar'
import ButtonIcon from './ButtonIcon'
import Row from './Row'
import { HiOutlineMoon, HiOutlineSun, HiOutlineUser } from 'react-icons/hi2'
import { useNavigate } from 'react-router-dom'
import { useDarkMode } from '../context/DarkModeContext'

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: 2em;
`

function Header() {
  const navigate = useNavigate()
  const { isDarkMode, toggleDarkMode } = useDarkMode()
  return (
    <StyledHeader>
      <UserAvatar />
      <Row $type="horizontal">
        <ButtonIcon onClick={() => navigate('/account')}>
          <HiOutlineUser />
        </ButtonIcon>
        <ButtonIcon onClick={toggleDarkMode}>
          {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
        </ButtonIcon>
        <Logout />
      </Row>
    </StyledHeader>
  )
}

export default Header
