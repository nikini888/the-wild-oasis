import { useForm } from 'react-hook-form'

import { useUpdateCabin } from './useUpdateCabin'
import { useCreateCabin } from './useCreateCabin'

import Input from '../../ui/Input'
import Form from '../../ui/Form'
import Button from '../../ui/Button'
import FileInput from '../../ui/FileInput'
import Textarea from '../../ui/Textarea'
import FormRow from '../../ui/FormRow'

function CreateCabinForm({ cabinToUpdate = {}, onCloseModal }) {
  const { id: updateId, ...updateCabinValues } = cabinToUpdate
  const isUpdateSession = Boolean(updateId)

  const {
    formState: { errors },
    register,
    reset,
    getValues,
    handleSubmit,
  } = useForm({ defaultValues: isUpdateSession ? updateCabinValues : {} })

  const { isCreating, createCabin } = useCreateCabin()
  const { isUpdating, updateCabin } = useUpdateCabin()

  const isWorking = isCreating || isUpdating

  function onSubmit(cabin) {
    const image = typeof cabin.image === 'string' ? cabin.image : cabin.image[0]
    if (isUpdateSession)
      updateCabin(
        { newCabin: { ...cabin, image }, id: updateId },
        { onSuccess: () => onCloseModal?.() }
      )
    else {
      createCabin(
        { ...cabin, image },
        {
          onSuccess: () => {
            reset()
            onCloseModal?.()
          },
        }
      )
    }
  }
  function onError(err) {
    // console.log(err);
  }
  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      $type={onCloseModal ? 'modal' : 'regular'}
    >
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register('name', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register('maxCapacity', {
            required: 'This filed is required',
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          defaultValue={200}
          disabled={isWorking}
          {...register('regularPrice', {
            required: 'This filed is required',
            min: { value: 1, message: 'Discount should be at least 1' },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          disabled={isWorking}
          {...register('discount', {
            required: 'This filed is required',
            min: { value: 0, message: 'Discount should be at least 0' },
            validate: (value) =>
              value <= getValues().regularPrice ||
              'Discount should be less than regular price',
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          disabled={isWorking}
          {...register('description', {
            required: 'This filed is required',
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput
          id="image"
          accept="image/*"
          defaultValue=""
          disabled={isWorking}
          {...register('image', {
            required: isUpdateSession ? false : 'This filed is required',
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          $variation="secondary"
          type="reset"
          disabled={isWorking}
          onClick={onCloseModal}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isUpdateSession ? 'Edit cabin' : 'Add cabin'}
        </Button>
      </FormRow>
    </Form>
  )
}

export default CreateCabinForm
