import styled from 'styled-components'
import { format, ISOStringFormat, isToday } from 'date-fns'

import Tag from '../../ui/Tag'
import Table from '../../ui/Table'

import { formatCurrency } from '../../utils/helpers'
import { formatDistanceFromNow } from '../../utils/helpers'
import { BookingType } from '../../types'
import Menus from '../../ui/Menus'
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiEye,
  HiTrash,
} from 'react-icons/hi2'
import { useNavigate } from 'react-router-dom'
import { useCheckout } from '../check-in-out/useCheckout'
import Modal from '../../ui/Modal'
import { useDeleteBooking } from '../check-in-out/useDeleteBooking'
import ConfirmDelete from '../../ui/ConfirmDelete'

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`

const Amount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
`

type Props = {
  booking: BookingType
}

type BookingStatus = 'unconfirmed' | 'checked-in' | 'checked-out'

function BookingRow({
  booking: {
    id: bookingId,
    startDate,
    endDate,
    numNights,
    totalPrice,
    status,
    guests: { fullName: guestName, email },
    cabins: { name: cabinName },
  },
}: Props) {
  const navigate = useNavigate()
  const { checkout, isCheckingOut } = useCheckout()
  const { deleteBooking, isDeletingBooking } = useDeleteBooking()

  const statusToTagName: Record<BookingStatus, string> = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  }

  return (
    <Table.Row>
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? 'Today'
            : formatDistanceFromNow(startDate.toString() as ISOStringFormat)}
          &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), 'MMM dd yyyy')} &mdash;
          {format(new Date(endDate), 'MMM dd yyyy')}
        </span>
      </Stacked>

      <Tag typeof={statusToTagName[status as BookingStatus]}>
        {status.replace('-', ' ')}
      </Tag>

      <Amount>{formatCurrency(totalPrice)}</Amount>
      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={JSON.stringify(bookingId)}></Menus.Toggle>
          <Menus.List id={JSON.stringify(bookingId)}>
            <Menus.Button
              icon={<HiEye />}
              onClick={() => navigate(`/bookings/${bookingId}`)}
            >
              see Details
            </Menus.Button>
            {status === 'unconfirmed' && (
              <Menus.Button
                icon={<HiArrowDownOnSquare />}
                onClick={() => navigate(`/checkin/${bookingId}`)}
              >
                Check in
              </Menus.Button>
            )}
            {status === 'checked-in' && (
              <Menus.Button
                disabled={isCheckingOut || isDeletingBooking}
                icon={<HiArrowUpOnSquare />}
                onClick={() => checkout({ bookingId })}
              >
                Check out
              </Menus.Button>
            )}
            <Modal.Open opens='delete'>
              <Menus.Button icon={<HiTrash />}>Delete booking</Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>
        <Modal.Window name='delete'>
          <ConfirmDelete
            resourceName='booking'
            disabled={isCheckingOut || isDeletingBooking}
            onConfirm={() => deleteBooking(bookingId)}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  )
}

export default BookingRow
