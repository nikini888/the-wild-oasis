import supabase, { supabaseUrl } from './supabase'

export async function loginUser({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  if (error) {
    console.error(error)
    throw new Error(error.message)
  }
  return data
}

export async function signUpUser(email, password, fullName) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: '',
      },
    },
  })
  if (error) {
    console.error(error)
    throw new Error(error.message)
  }
  return data
}

export async function logoutUser() {
  let { error } = await supabase.auth.signOut()
  if (error) {
    console.error(error)
    throw new Error(error.message)
  }
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession()
  if (!session.session) return null

  const { data, error } = await supabase.auth.getUser()
  if (error) {
    console.error(error)
    throw new Error(error.message)
  }
  return data?.user
}

export async function updateUser({ password, fullName, avatar }) {
  let updateData

  if (password) updateData = { password }
  if (fullName) updateData = { data: { fullName } }

  const { data, error } = await supabase.auth.updateUser(updateData)
  if (error) {
    console.error(error)
    throw new Error(error.message)
  }

  if (!avatar) return data

  const avatartName = `avatar-${data.user.id}-${Math.random()}`
  const { error: storageError } = await supabase.storage
    .from('avatars')
    .upload(avatartName, avatar)

  if (storageError) throw new Error(storageError.message)
  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${avatartName}`,
    },
  })
  if (error2) {
    console.error(error2)
    throw new Error(error2.message)
  }
  return updatedUser
}
