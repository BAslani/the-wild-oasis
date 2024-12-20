import { useQuery } from '@tanstack/react-query'
import { getStaysTodayActivity } from '../../services/apiBookings'
import { BookingType } from '../../types'

export function useTodayActivity() {
  const { data: activities, isLoading } = useQuery({
    queryFn: getStaysTodayActivity,
    queryKey: ['today-activiry'],
  })

  return { activities, isLoading } as {
    activities: BookingType[]
    isLoading: boolean
  }
}
