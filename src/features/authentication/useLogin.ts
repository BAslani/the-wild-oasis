import { useMutation, useQueryClient } from '@tanstack/react-query'
import { login as loginApi } from '../../services/apiAuth'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Session, User, WeakPassword } from '@supabase/supabase-js'

interface LoginCredentials {
  email: string
  password: string
}

interface LoginResponse {
  user: User
  session: Session
  weakPassword?: WeakPassword
}

export function useLogin() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { mutate: login, isPending: isLogingIn } = useMutation<
    LoginResponse,
    Error,
    LoginCredentials
  >({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(['user'], user.user)
      navigate('/dashboard', { replace: true })
    },
    onError: (err) => {
      console.error('Error:', err)

      toast.error(err.message)
    },
  })

  return { login, isLogingIn }
}
