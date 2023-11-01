import supabase, { supabaseUrl } from './supabase'

export async function getCabins() {
  const { data, error } = await supabase.from('cabins').select('*')

  if (error) {
    console.error(error)
    throw new Error('Cabins could not be loaded')
  }
  return data
}

export async function createUpdateCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl)

  const imgName = `${Math.random()}-${newCabin.image.name}`.replaceAll('/', '')

  const imgPath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabins_img/${imgName}`

  //1.Create/Edit cabin

  let query = supabase.from('cabins')

  //a.Create cabin
  if (!id) query = query.insert([{ ...newCabin, image: imgPath }])

  //b.Edit cabin
  if (id) query = query.update({ ...newCabin, image: imgPath }).eq('id', id)

  const { data, error } = await query.select().single()

  if (error) {
    console.error(error)
    throw new Error('Cabin could not be created')
  }
  //2.Upload img
  if (hasImagePath) return data

  const { error: storageError } = await supabase.storage
    .from('cabins_img')
    .upload(imgName, newCabin.image)

  if (storageError) {
    console.error(error)
    await supabase.from('cabins').delete().eq('id', data.id)
    throw new Error(
      'Cabin image could not be uploaded and the cabin was not created'
    )
  }

  return data
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from('cabins').delete().eq('id', id)

  if (error) {
    console.error(error)
    throw new Error('Cabin could not be deleted')
  }
  return data
}
