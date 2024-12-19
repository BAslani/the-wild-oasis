import { FormEvent, useState } from 'react'
import Button from '../../ui/Button'
import Form from '../../ui/Form'
import Input from '../../ui/Input'
import FormRowVertical from '../../ui/FormRowVertical'
import { useLogin } from './useLogin'
import SpinnerMini from '../../ui/Spinner.Mini'

function LoginForm() {
  const [email, setEmail] = useState('behzad@gmail.com')
  const [password, setPassword] = useState('pass1994')
  const { login, isLogingIn } = useLogin()

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!email || !password) return
    login(
      { email, password },
      {
        onSettled: () => {
          setPassword('')
        },
      }
    )
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label='Email address' error=''>
        <Input
          type='email'
          id='email'
          // This makes this form better for password managers
          autoComplete='username'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLogingIn}
        />
      </FormRowVertical>
      <FormRowVertical label='Password' error=''>
        <Input
          type='password'
          id='password'
          autoComplete='current-password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLogingIn}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button disabled={isLogingIn} variation='primary' size='large'>
          {isLogingIn ? <SpinnerMini /> : 'Login'}
        </Button>
      </FormRowVertical>
    </Form>
  )
}

export default LoginForm
