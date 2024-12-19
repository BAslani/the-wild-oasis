import { ReactNode, useEffect } from 'react'
import { useUser } from '../features/authentication/useUser'
import styled from 'styled-components'
import Spinner from './Spinner'
import { useNavigate } from 'react-router-dom'

type Props = {
  children: ReactNode
}

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`

export default function ProtectedRoute({ children }: Props) {
  const navigate = useNavigate()
  const { isLoading, isAuthenticated } = useUser()

  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate('/login')
  }, [isAuthenticated, isLoading, navigate])

  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    )

  if (isAuthenticated) return children
}
