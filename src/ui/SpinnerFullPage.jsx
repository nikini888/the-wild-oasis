import styled from 'styled-components'
import Spinner from './Spinner'

const FullPageSpinner = styled.div`
  height: 100vh;
  background-color: var(--color-greyu-50);
  display: grid;
  place-content: center;
`

function SpinnerFullPage() {
  return (
    <FullPageSpinner>
      <Spinner />
    </FullPageSpinner>
  )
}

export default SpinnerFullPage
