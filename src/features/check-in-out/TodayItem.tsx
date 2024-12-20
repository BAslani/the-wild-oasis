import styled from 'styled-components'
import { BookingType } from '../../types'
import Tag from '../../ui/Tag'
import { Flag } from '../../ui/Flag'
import Button from '../../ui/Button'
import { Link } from 'react-router-dom'
import CheckoutButton from './CheckoutButton'

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`

const Guest = styled.div`
  font-weight: 500;
`

type Props = {
  activity: BookingType
}

export default function TodayItem({ activity }: Props) {
  const { id, status, guests, numNights } = activity
  return (
    <StyledTodayItem>
      {status === 'unconfirmed' && <Tag typeof='green'>Arriving</Tag>}
      {status === 'checked-in' && <Tag typeof='blue'>Departing</Tag>}

      <Flag src={guests.countryFlag} alt={`Flag of ${guests.country}`} />

      <Guest>{guests.fullName}</Guest>

      <div>{numNights}</div>

      {status === 'unconfirmed' && (
        <Button
          as={Link}
          to={`/checkin/${id}`}
          size='small'
          variation='primary'
        >
          Check in
        </Button>
      )}
      {status === 'checked-in' && <CheckoutButton bookingId={id} />}
    </StyledTodayItem>
  )
}
