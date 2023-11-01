import styled from 'styled-components'
import Logo from './Logo'
import MainNav from './MainNav'

const StyleSidebar = styled.aside`
  border-right: 1px solid var(--color-grey-100);
  grid-area: 1/1/3/2;
  padding: 3.2rem 2.4rem;
  background-color: var(--color-grey-0);
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`
function Sidebar() {
  return (
    <StyleSidebar>
      <Logo />
      <MainNav />
    </StyleSidebar>
  )
}

export default Sidebar
