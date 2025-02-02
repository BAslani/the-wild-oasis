import Input from '../../ui/Input'
import Form from '../../ui/Form'
import Button from '../../ui/Button'
import FileInput from '../../ui/FileInput'
import Textarea from '../../ui/Textarea'
import { useForm } from 'react-hook-form'
import { CabinType } from '../../types'
import FormRow from '../../ui/FormRow'
import styled from 'styled-components'
import { useUpdateCabin } from './useUpdateCabin'

const StyledRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`

type Props = {
  cabinToEdit: CabinType
  onCloseModal?: () => void
}

function UpdateCabinForm({ cabinToEdit, onCloseModal }: Props) {
  const { register, handleSubmit, getValues, formState } = useForm<CabinType>({
    defaultValues: cabinToEdit,
  })

  const { errors } = formState
  const { updateCabin, isUpdating } = useUpdateCabin()

  function onSubmit(data: CabinType) {
    updateCabin(data, {
      onSuccess: () => {
        onCloseModal?.()
      },
    })
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label='Cabin name' error={errors.name?.message || ''}>
        <Input
          disabled={isUpdating}
          type='text'
          id='name'
          {...register('name', {
            required: 'Required',
          })}
        />
      </FormRow>

      <FormRow
        label='Maximum capacity'
        error={errors.maxCapacity?.message || ''}
      >
        <Input
          disabled={isUpdating}
          type='number'
          id='maxCapacity'
          {...register('maxCapacity', {
            required: 'Required',
            min: {
              value: 1,
              message: 'Capacity should be at least 1',
            },
          })}
        />
      </FormRow>

      <FormRow label='Regular price' error={errors.regularPrice?.message || ''}>
        <Input
          disabled={isUpdating}
          type='number'
          id='regularPrice'
          {...register('regularPrice', {
            required: 'Required',
            min: {
              value: 1,
              message: 'Price cannot be 0',
            },
          })}
        />
      </FormRow>

      <FormRow label='Discount' error={errors.discount?.message || ' '}>
        <Input
          disabled={isUpdating}
          type='number'
          id='discount'
          defaultValue={0}
          {...register('discount', {
            required: 'Required',
            validate: (valu) =>
              valu <= getValues().regularPrice ||
              'Discount should be less than the regular price',
          })}
        />
      </FormRow>

      <FormRow
        label='Description for website'
        error={errors.description?.message || ''}
      >
        <Textarea
          typeof='number'
          id='description'
          disabled={isUpdating}
          defaultValue=''
          {...register('description', {
            required: 'Required',
          })}
        />
      </FormRow>

      <FormRow label='Cabin photo' error={errors.image?.message || ''}>
        <FileInput
          id='image'
          accept='image/*'
          disabled={isUpdating}
          {...register('image')}
        />
      </FormRow>

      <StyledRow>
        {/* type is an HTML attribute! */}
        <Button
          onClick={onCloseModal}
          size='medium'
          variation='secondary'
          type='reset'
        >
          Cancel
        </Button>
        <Button variation='primary' size='medium' disabled={isUpdating}>
          Edit cabin
        </Button>
      </StyledRow>
    </Form>
  )
}

export default UpdateCabinForm
