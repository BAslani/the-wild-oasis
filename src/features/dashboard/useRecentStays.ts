import { useQuery } from '@tanstack/react-query'
import { ISOStringFormat, subDays } from 'date-fns'
import { useSearchParams } from 'react-router-dom'
import { getStaysAfterDate } from '../../services/apiBookings'
import { StaysType } from '../../types'

export function useRecentStays() {
  const [searchParams] = useSearchParams()

  const numDays = !searchParams.get('last')
    ? 7
    : Number(searchParams.get('last'))

  const queryDate = subDays(new Date(), numDays).toISOString()

  const { data: stays, isLoading: isLoadingStays } = useQuery({
    queryFn: () => getStaysAfterDate(queryDate as ISOStringFormat),
    queryKey: ['stays', `last-${numDays}`],
  })

  const confirmedStays = stays?.filter(
    (stay) => stay.status === 'checked-in' || stay.status === 'checked-out'
  )

  return { stays, isLoadingStays, confirmedStays, numDays } as {
    isLoadingStays: boolean
    confirmedStays: StaysType[]
    numDays: number
  }
}
