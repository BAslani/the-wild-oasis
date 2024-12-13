import Form from '../../ui/Form'
import FormRow from '../../ui/FormRow'
import Input from '../../ui/Input'
import Spinner from '../../ui/Spinner'
import { useSettings } from './useSettings'
import { useUpdateSetting } from './useUpdateSetting'

function UpdateSettingsForm() {
  const {
    settings = {
      minBookingLength: NaN,
      maxBookingLength: NaN,
      maxGuestsPerBooking: NaN,
      breakfastPrice: NaN,
    },
    isLoading,
    error,
  } = useSettings()

  const { updateSetting, isUpdating } = useUpdateSetting()

  if (isLoading) return <Spinner />

  if (error) return <p>error</p>

  const {
    minBookingLength,
    maxBookingLength,
    maxGuestsPerBooking,
    breakfastPrice,
  } = settings

  function handleUpdateSetting(
    e: React.FocusEvent<HTMLInputElement, Element>,
    field: string
  ) {
    const { value } = e.target
    if (!value) return
    updateSetting({ [field]: value })
  }

  return (
    <Form>
      <FormRow label='Minimum nights/booking' error={''}>
        <Input
          type='number'
          id='min-nights'
          defaultValue={minBookingLength}
          onBlur={(e) => handleUpdateSetting(e, 'minBookingLength')}
          disabled={isUpdating}
        />
      </FormRow>

      <FormRow label='Maximum nights/booking' error={''}>
        <Input
          type='number'
          id='max-nights'
          defaultValue={maxBookingLength}
          onBlur={(e) => handleUpdateSetting(e, 'maxBookingLength')}
          disabled={isUpdating}
        />
      </FormRow>

      <FormRow label='Maximum guests/booking' error={''}>
        <Input
          type='number'
          id='max-guests'
          defaultValue={maxGuestsPerBooking}
          onBlur={(e) => handleUpdateSetting(e, 'maxGuestsPerBooking')}
          disabled={isUpdating}
        />
      </FormRow>

      <FormRow label='Breakfast price' error={''}>
        <Input
          type='number'
          id='breakfast-price'
          defaultValue={breakfastPrice}
          onBlur={(e) => handleUpdateSetting(e, 'breakfastPrice')}
          disabled={isUpdating}
        />
      </FormRow>
    </Form>
  )
}

export default UpdateSettingsForm
