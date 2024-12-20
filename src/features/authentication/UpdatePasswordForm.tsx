import { useForm } from 'react-hook-form'
import Button from '../../ui/Button'
import Form from '../../ui/Form'
import FormRow from '../../ui/FormRow'
import Input from '../../ui/Input'
import { useUpdateUser } from './useUpdateUser'
import styled from 'styled-components'

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`

type UpdatePasswordFormSchema = {
  password: string
  passwordConfirm: string
}

function UpdatePasswordForm() {
  const { register, handleSubmit, formState, getValues, reset } =
    useForm<UpdatePasswordFormSchema>()
  const { errors } = formState

  const { updateUser, isUpdatingUser } = useUpdateUser()

  function onSubmit({ password }: { password: string }) {
    updateUser({ password }, { onSuccess: () => reset() })
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        label='Password (min 8 characters)'
        error={errors?.password?.message}
      >
        <Input
          type='password'
          id='password'
          autoComplete='current-password'
          disabled={isUpdatingUser}
          {...register('password', {
            required: 'This field is required',
            minLength: {
              value: 8,
              message: 'Password needs a minimum of 8 characters',
            },
          })}
        />
      </FormRow>

      <FormRow
        label='Confirm password'
        error={errors?.passwordConfirm?.message}
      >
        <Input
          type='password'
          autoComplete='new-password'
          id='passwordConfirm'
          disabled={isUpdatingUser}
          {...register('passwordConfirm', {
            required: 'This field is required',
            validate: (value) =>
              getValues().password === value || 'Passwords need to match',
          })}
        />
      </FormRow>
      <FormRow>
        <ButtonContainer>
          <Button
            size='medium'
            onClick={() => reset()}
            type='reset'
            variation='secondary'
          >
            Cancel
          </Button>
          <Button variation='primary' size='medium' disabled={isUpdatingUser}>
            Update password
          </Button>
        </ButtonContainer>
      </FormRow>
    </Form>
  )
}

export default UpdatePasswordForm
