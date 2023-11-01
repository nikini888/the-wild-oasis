import styled from 'styled-components'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'

const StyleAppLayout = styled.div`
  height: 100dvh;
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
`
const Main = styled.main`
  padding: 4rem 4.8rem 6.4rem;
  background-color: var(--color-grey-50);
`
const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  gap: 3.2rem;
  flex-direction: column;
`

function AppLayout() {
  return (
    <StyleAppLayout>
      <Header />
      <Sidebar />
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyleAppLayout>
  )
}

export default AppLayout
