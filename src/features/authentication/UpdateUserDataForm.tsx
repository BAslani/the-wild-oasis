import { FormEvent, useState } from 'react'

import Button from '../../ui/Button'
import FileInput from '../../ui/FileInput'
import Form from '../../ui/Form'
import FormRow from '../../ui/FormRow'
import Input from '../../ui/Input'

import { useUser } from './useUser'
import styled from 'styled-components'
import { useUpdateUser } from './useUpdateUser'
import SpinnerMini from '../../ui/Spinner.Mini'

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`

function UpdateUserDataForm() {
  const { user } = useUser()
  const email = user?.email || ''
  const currentFullName = user?.user_metadata.fullName || ''

  const { updateUser, isUpdatingUser } = useUpdateUser()

  const [fullName, setFullName] = useState(currentFullName)
  const [avatar, setAvatar] = useState<File | undefined>(undefined)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!fullName) return
    updateUser(
      { fullName, avatar },
      {
        onSuccess: () => {
          setAvatar(undefined)
          ;(e.target as HTMLFormElement).reset()
        },
      }
    )
  }

  function handleCancel() {
    setFullName(currentFullName)
    setAvatar(undefined)
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label='Email address'>
        <Input value={email} disabled />
      </FormRow>
      <FormRow label='Full name'>
        <Input
          disabled={isUpdatingUser}
          type='text'
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          id='fullName'
        />
      </FormRow>
      <FormRow label='Avatar image'>
        <FileInput
          disabled={isUpdatingUser}
          id='avatar'
          accept='image/*'
          onChange={(e) => setAvatar(e.target.files?.[0])}
        />
      </FormRow>
      <FormRow>
        <ButtonContainer>
          <Button
            disabled={isUpdatingUser}
            onClick={handleCancel}
            size='medium'
            type='reset'
            variation='secondary'
          >
            Cancel
          </Button>
          <Button disabled={isUpdatingUser} size='medium' variation='primary'>
            {isUpdatingUser ? <SpinnerMini /> : 'Update account'}
          </Button>
        </ButtonContainer>
      </FormRow>
    </Form>
  )
}

export default UpdateUserDataForm
