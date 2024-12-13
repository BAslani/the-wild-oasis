import { useQueryClient, useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { updateCabin as updateCabinApi } from '../../services/apiCabins'

export function useUpdateCabin() {
  const queryClient = useQueryClient()
  const { mutate: updateCabin, isPending: isUpdating } = useMutation({
    mutationFn: updateCabinApi,
    onSuccess: () => {
      toast.success('New Cabin successfully updated')
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      })
    },
    onError: (err) => toast.error(err.message),
  })

  return { updateCabin, isUpdating }
}
