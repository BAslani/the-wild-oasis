import { useQuery } from '@tanstack/react-query'
import { getCabins } from '../../services/apiCabins'
import { CabinType } from '../../types'

export function useCabins() {
  const { isLoading, data: cabins } = useQuery({
    queryKey: ['cabins'],
    queryFn: getCabins,
  })

  return { cabins, isLoading } as { cabins: CabinType[]; isLoading: boolean }
}
