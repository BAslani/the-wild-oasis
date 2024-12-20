import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from 'react-icons/hi2'
import { BookingType } from '../../types'
import Stat from './Stat'
import { formatCurrency } from '../../utils/helpers'

type Props = {
  bookings: Partial<BookingType>[]
  confirmedStays: Partial<BookingType>[]
  numDays: number
  cabinCount: number
}

export default function Stats({
  bookings,
  confirmedStays,
  cabinCount,
  numDays,
}: Props) {
  const numBookings = bookings.length
  const totalSales = bookings.reduce((acc, cur) => acc + cur.totalPrice!, 0)
  const totalCheckins = confirmedStays.length

  const occupation =
    confirmedStays.reduce((acc, cur) => acc + cur.numNights!, 0) /
    (numDays * cabinCount)

  return (
    <>
      <Stat
        title='Bookings'
        color='blue'
        icon={<HiOutlineBriefcase />}
        value={JSON.stringify(numBookings)}
      />
      <Stat
        title='Sales'
        color='green'
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(totalSales)}
      />
      <Stat
        title='Check ins'
        color='indigo'
        icon={<HiOutlineCalendarDays />}
        value={JSON.stringify(totalCheckins)}
      />
      <Stat
        title='Occupancy rate'
        color='yellow'
        icon={<HiOutlineChartBar />}
        value={JSON.stringify(Math.round(occupation * 100)) + '%'}
      />
    </>
  )
}
