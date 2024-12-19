import styled from 'styled-components'
import Button from '../../ui/Button'
import Form from '../../ui/Form'
import FormRow from '../../ui/FormRow'
import Input from '../../ui/Input'
import { useForm } from 'react-hook-form'
import { useSignup } from './useSignup'
import SpinnerMini from '../../ui/Spinner.Mini'

type SignupFormSchema = {
  fullName: string
  email: string
  password: string
  passwordConfirm: string
}

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
`

function SignupForm() {
  const { register, formState, handleSubmit, getValues, reset } =
    useForm<SignupFormSchema>()
  const { errors } = formState
  const { signup, isSigningUp } = useSignup()

  function onSubmit({ fullName, email, password }: SignupFormSchema) {
    signup(
      { fullName, email, password },
      {
        onSettled: () => reset(),
      }
    )
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label='Full name' error={errors.fullName?.message}>
        <Input
          disabled={isSigningUp}
          type='text'
          id='fullName'
          {...register('fullName', { required: 'required' })}
        />
      </FormRow>

      <FormRow label='Email address' error={errors.email?.message}>
        <Input
          disabled={isSigningUp}
          type='email'
          id='email'
          {...register('email', {
            required: 'required',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Please provide a valid email address',
            },
          })}
        />
      </FormRow>

      <FormRow
        label='Password (min 8 characters)'
        error={errors.password?.message}
      >
        <Input
          disabled={isSigningUp}
          type='password'
          id='password'
          {...register('password', {
            required: 'required',
            minLength: {
              value: 8,
              message: 'Password should be at leat 8 charachters',
            },
          })}
        />
      </FormRow>

      <FormRow label='Repeat password' error={errors.passwordConfirm?.message}>
        <Input
          disabled={isSigningUp}
          type='password'
          id='passwordConfirm'
          {...register('passwordConfirm', {
            required: 'required',
            validate: (value) =>
              value === getValues().password || "Passwords don't match",
          })}
        />
      </FormRow>

      <FormRow>
        <ButtonContainer>
          <Button size='medium' variation='secondary' type='reset'>
            Cancel
          </Button>

          <Button disabled={isSigningUp} size='medium' variation='primary'>
            {isSigningUp ? <SpinnerMini /> : 'Create new user'}
          </Button>
        </ButtonContainer>
      </FormRow>
    </Form>
  )
}

export default SignupForm
