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

export async function createCabin(newCabin: CabinType) {
  // 1 - create cabin
  const imageName = `${Math.random()}-${
    (newCabin.image as unknown as File).name
  }`.replace('/', '')

  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`

  const { data, error } = await supabase
    .from('cabins')
    .insert([{ ...newCabin, image: imagePath }])
    .select()

  if (error) {
    console.error('Cabins could not be loaded')
    throw new Error('Cabins could not be created')
  }

  //2 - upload image
  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, newCabin.image)

  // 3 - delete the cabin if uploading failed
  if (storageError) {
    await supabase.from('cabins').delete().eq('id', newCabin.id)
    console.error(storageError)
    throw new Error(
      'Cabin image could not be uploaded, the cabin was not created'
    )
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