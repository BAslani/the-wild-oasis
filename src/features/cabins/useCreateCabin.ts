import { useQueryClient, useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { createCabin as createCabinApi } from '../../services/apiCabins'

export function useCreateCabin() {
  const queryClient = useQueryClient()
  const { mutate: createCabin, isPending: isCreating } = useMutation({
    mutationFn: createCabinApi,
    onSuccess: () => {
      toast.success('New Cabin successfully created')
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      })
    },
    onError: (err) => toast.error(err.message),
  })
  return { createCabin, isCreating }
}
