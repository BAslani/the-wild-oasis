import { CabinType } from '../types'
import supabase, { supabaseUrl } from './supabase'

export async function getCabins() {
  const { data, error } = await supabase.from('cabins').select('*')

  if (error) {
    console.error('Cabins could not be loaded')
    throw new Error('Cabins could not be loaded')
  }

  return data
}

export async function createCabin(newCabin: Omit<CabinType, 'id'>) {
  const hasImage = newCabin.image?.startsWith?.(supabaseUrl)
  // 1 - create cabin
  const imageName = `${Math.random()}-${
    (newCabin.image as unknown as File).name
  }`.replace('/', '')

  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`

  const { data, error } = await supabase
    .from('cabins')
    .insert([{ ...newCabin, image: hasImage ? newCabin.image : imagePath }])
    .select()

  if (error) {
    console.error('Cabins could not be loaded')
    throw new Error('Cabins could not be created')
  }

  if (hasImage) return data
  //2 - upload image
  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, newCabin.image)

  // 3 - delete the cabin if uploading failed
  if (storageError) {
    await supabase.from('cabins').delete().eq('id', data[0].id)
    console.error(storageError)
    throw new Error(
      'Cabin image could not be uploaded, the cabin was not created'
    )
  }

  return data
}

export async function updateCabin(newCabin: CabinType) {
  const isKeepingImage = newCabin.image.startsWith?.(supabaseUrl)
  let imagePath = ''
  let imageName = ''

  if (isKeepingImage) {
    imagePath = newCabin.image
  } else {
    imageName = `${Math.random()}-${
      (newCabin.image[0] as unknown as File).name
    }`.replace('/', '')
    imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`
  }

  const { data, error } = await supabase
    .from('cabins')
    .update({ ...newCabin, image: imagePath })
    .eq('id', newCabin.id)
    .select()

  if (error) {
    console.error('Cabin could not be updated')
    throw new Error('Cabin could not be updated')
  }

  if (!isKeepingImage) {
    const { error: storageError } = await supabase.storage
      .from('cabin-images')
      .upload(imageName, newCabin.image[0])

    if (storageError) {
      console.error(storageError)
      throw new Error(
        'Cabin image could not be uploaded, the cabin image was not updated'
      )
    }
  }

  return data
}

export async function deleteCabin(id: number) {
  const { data, error } = await supabase.from('cabins').delete().eq('id', id)

  if (error) {
    console.error(error)
    throw new Error('something went wrong in deleting the cabin')
  }

  return data
}
