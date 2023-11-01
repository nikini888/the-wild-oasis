import { formatCurrency } from '../../utils/helpers'
import Stat from './Stat'
import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from 'react-icons/hi2'
function Stats({ bookings, stays, numDays, totalCabins }) {
  const totalBookings = bookings?.length
  const totalSale = bookings?.reduce(
    (total, curr) => (total += curr.totalPrice),
    0
  )
  const checkedIn = stays?.length
  const occupation =
    stays?.reduce((totalNights, curr) => totalNights + curr.numNights, 0) /
    (totalCabins * numDays)
  return (
    <>
      <Stat
        icon={<HiOutlineBriefcase />}
        title="Bookings"
        value={totalBookings}
        color="blue"
      />
      <Stat
        icon={<HiOutlineBanknotes />}
        title="Sales"
        value={formatCurrency(totalSale)}
        color="green"
      />
      <Stat
        icon={<HiOutlineCalendarDays />}
        title="Check ins"
        value={checkedIn}
        color="indigo"
      />
      <Stat
        icon={<HiOutlineChartBar />}
        title="Occupancy rate"
        value={Math.round(occupation * 100) + '%'}
        color="yellow"
      />
    </>
  )
}

export default Stats
