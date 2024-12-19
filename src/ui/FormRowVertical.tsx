import styled from 'styled-components'
import { ReactElement } from 'react'

const StyledFormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr;
  gap: 1rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:has(button) {
    gap: 1rem;
  }
`

const Label = styled.label`
  font-weight: 500;
`

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`

type Props = {
  label?: string
  error?: string
  children: ReactElement
}

export default function FormRow({ label, error, children }: Props) {
  return (
    <StyledFormRow>
      <Label htmlFor={children?.props.id}>{label}</Label>
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  )
}
