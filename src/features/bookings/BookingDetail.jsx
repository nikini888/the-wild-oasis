import styled from 'styled-components'

import BookingDataBox from './BookingDataBox'
import Row from '../../ui/Row'
import Heading from '../../ui/Heading'
import Tag from '../../ui/Tag'
import ButtonGroup from '../../ui/ButtonGroup'
import Button from '../../ui/Button'
import ButtonText from '../../ui/ButtonText'
import ConfirmDelete from '../../ui/ConfirmDelete'

import { useMoveBack } from '../../hooks/useMoveBack'
import { useBooking } from './useBooking'
import Spinner from '../../ui/Spinner'
import { useDeleteBooking } from './useDeleteBooking'
import Empty from '../../../../../jonasschmedtmann/ultimate-react-course-main/17-the-wild-oasis/final-6-final/src/ui/Empty'
import { useNavigate } from 'react-router-dom'
import CheckoutButton from '../check-in-out/CheckoutButton'
import Modal from '../../ui/Modal'

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`

function BookingDetail() {
  const { booking, isLoading } = useBooking()
  const { deleteBooking, isDeleting } = useDeleteBooking()
  const moveBack = useMoveBack()
  const navigate = useNavigate()
  if (isLoading) return <Spinner />
  if (!booking) return <Empty resource="booking" />

  const isWorking = isDeleting || isLoading
  const { status, id: bookingId } = booking
  const statusToTagName = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  }

  return (
    <>
      <Row $type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace('-', ' ')}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === 'checked-in' && <CheckoutButton bookingId={bookingId} />}
        {status === 'unconfirmed' && (
          <>
            <Button
              variation="primary"
              onClick={() => navigate(`/checkin/${bookingId}`)}
              disabled={isWorking}
            >
              Check in
            </Button>
            <Modal>
              <Modal.Open openItem="confirmDel">
                <Button variation="danger" disabled={isWorking}>
                  Delete booking
                </Button>
              </Modal.Open>
              <Modal.Window name="confirmDel">
                <ConfirmDelete
                  resourceName={`booking #${bookingId}`}
                  onConfirm={() =>
                    deleteBooking(bookingId, {
                      onSettled: () => navigate('/bookings'),
                    })
                  }
                  disabled={isWorking}
                />
              </Modal.Window>
            </Modal>
          </>
        )}
        <Button $variation="secondary" onClick={moveBack} disabled={isWorking}>
          Back
        </Button>
      </ButtonGroup>
    </>
  )
}

export default BookingDetail
