import { CabinType } from '../types'
import supabase from './supabase'

export async function getCabins() {
  const { data, error } = await supabase.from('cabins').select('*')

  if (error) {
    console.error('Cabins could not be loaded')
    throw new Error('Cabins could not be loaded')
  }

  return data
}

export async function createCabin(newCabin: CabinType) {
  const { data, error } = await supabase
    .from('cabins')
    .insert([newCabin])
    .select()

  if (error) {
    console.error('Cabins could not be loaded')
    throw new Error('Cabins could not be created')
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
