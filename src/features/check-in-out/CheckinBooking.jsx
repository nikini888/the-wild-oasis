import styled from 'styled-components'
import BookingDataBox from '../../features/bookings/BookingDataBox'

import Row from '../../ui/Row'
import Heading from '../../ui/Heading'
import ButtonGroup from '../../ui/ButtonGroup'
import Button from '../../ui/Button'
import ButtonText from '../../ui/ButtonText'
import Checkbox from '../../ui/Checkbox'

import { useMoveBack } from '../../hooks/useMoveBack'
import { useBooking } from '../bookings/useBooking'
import { useEffect, useState } from 'react'
import { formatCurrency } from '../../utils/helpers'
import { useSettings } from '../../../../../jonasschmedtmann/ultimate-react-course-main/17-the-wild-oasis/final-6-final/src/features/settings/useSettings'
import Spinner from '../../ui/Spinner'
import { useCheckin } from './useCheckin'
import Empty from '../../ui/Empty'

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`

function CheckinBooking() {
  const moveBack = useMoveBack()
  const { booking, isLoading } = useBooking()
  const { settings, isLoading: isLoadingSettings } = useSettings()
  const { checkin, isCheckingIn } = useCheckin()
  const [confirmPaid, setConfirmPaid] = useState(false)
  const [addBreakfast, setAddBreakfast] = useState(false)
  useEffect(() => {
    if (!booking) return
    setConfirmPaid(booking?.isPaid ?? false)
  }, [booking])
  if (isLoading || isLoadingSettings) return <Spinner />
  if (!booking) return <Empty resource="booking" />

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking

  const optionalBreakfastPrice = settings.breakfastPrice * numGuests * numNights
  function handleCheckin() {
    if (!confirmPaid) return
    if (addBreakfast) {
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: totalPrice + optionalBreakfastPrice,
        },
      })
    } else {
      checkin({ bookingId, breakfast: {} })
    }
  }

  return (
    <>
      <Row $type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      {!hasBreakfast && (
        <Box>
          <Checkbox
            id="breakfast"
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((add) => !add)
              setConfirmPaid(false)
            }}
          >
            Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}?
          </Checkbox>
        </Box>
      )}
      <Box>
        <Checkbox
          id="paid"
          checked={confirmPaid}
          onChange={() => setConfirmPaid((ispaid) => !ispaid)}
          disabled={confirmPaid || isCheckingIn}
        >
          I confirm that {guests.fullName} has paid the total amount of {` `}
          {!addBreakfast
            ? formatCurrency(totalPrice)
            : ` ${formatCurrency(
                totalPrice + optionalBreakfastPrice
              )} (${formatCurrency(totalPrice)} + ${formatCurrency(
                optionalBreakfastPrice
              )})`}
        </Checkbox>
      </Box>
      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckingIn}>
          Check in booking #{bookingId}
        </Button>

        <Button
          $variation="secondary"
          onClick={moveBack}
          disabled={isCheckingIn}
        >
          Back
        </Button>
      </ButtonGroup>
    </>
  )
}

export default CheckinBooking
