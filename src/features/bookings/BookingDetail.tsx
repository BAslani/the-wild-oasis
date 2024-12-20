import styled from 'styled-components'

import Row from '../../ui/Row'
import Heading from '../../ui/Heading'
import Tag from '../../ui/Tag'
import ButtonGroup from '../../ui/ButtonGroup'
import Button from '../../ui/Button'
import ButtonText from '../../ui/ButtonText'

import { useMoveBack } from '../../hooks/useMoveBack'
import { useBooking } from './useBooking'
import Spinner from '../../ui/Spinner'
import BookingDataBox from './BookingDataBox'
import { useNavigate } from 'react-router-dom'
import { useCheckout } from '../check-in-out/useCheckout'
import Modal from '../../ui/Modal'
import { useDeleteBooking } from '../check-in-out/useDeleteBooking'
import ConfirmDelete from '../../ui/ConfirmDelete'
import Empty from '../../ui/Empty'

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`

type BookingStatus = 'unconfirmed' | 'checked-in' | 'checked-out'

function BookingDetail() {
  const { booking, isLoading } = useBooking()
  const { checkout, isCheckingOut } = useCheckout()
  const { deleteBooking, isDeletingBooking } = useDeleteBooking()
  const moveBack = useMoveBack()
  const navigate = useNavigate()

  if (isLoading) return <Spinner />
  if (!booking) return <Empty resource={'booking'} />

  const { status, id: bookingId } = booking

  const statusToTagName: Record<BookingStatus, string> = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  }

  return (
    <>
      <Row typeof='horizontal'>
        <HeadingGroup>
          <Heading as='h1'>Booking #{bookingId}</Heading>
          <Tag typeof={statusToTagName[status as BookingStatus]}>
            {status.replace('-', ' ')}
          </Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === 'unconfirmed' && (
          <Button
            size='medium'
            variation='primary'
            onClick={() => navigate(`/checkin/${bookingId}`)}
          >
            Check in
          </Button>
        )}
        {status === 'checked-in' && (
          <Button
            size='medium'
            variation='primary'
            disabled={isCheckingOut}
            onClick={() => checkout({ bookingId })}
          >
            Check out
          </Button>
        )}
        <Modal>
          <Modal.Open opens='delete'>
            <Button size='medium' variation='danger'>
              Delete booking
            </Button>
          </Modal.Open>
          <Modal.Window name='delete'>
            <ConfirmDelete
              disabled={isCheckingOut || isDeletingBooking}
              onConfirm={() =>
                deleteBooking(bookingId, {
                  onSuccess: () => navigate(-1),
                })
              }
              resourceName='booking'
            />
          </Modal.Window>
        </Modal>
        <Button size='medium' variation='secondary' onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  )
}

export default BookingDetail
