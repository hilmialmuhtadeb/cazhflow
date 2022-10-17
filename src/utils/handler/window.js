import supabase from "../../config/supabase"

async function getAllWindows (username) {
  const { data: windows, error } = await supabase
    .from('windows')
    .select()
    .eq('username', username)
    
  if (error) {
    return error
  }

  return windows
}

async function getWindowBySlug (slug) {
  const { data, error } = await supabase
    .from('windows')
    .select()
    .eq('slug', slug)
    .limit(1)
    .single()

  return { data, error }
}

async function addNewWindow (payload) {
  const {
    username,
    slug,
    title,
    description
  } = payload
  
  const { data, error } = await supabase
    .from('windows')
    .insert([{ 
      username,
      slug,
      title,
      description
    },
  ])

  return { data, error }
}

async function editWindow (payload, id) {
  const { title, slug, description } = payload
  const { data, error } = await supabase
    .from('windows')
    .update({
      title,
      slug,
      description
    })
    .eq('id', id)
    .single()

  return { data, error }
}

async function deleteWindow (id) {
  const { data, error } = await supabase
    .from('windows')
    .delete()
    .eq('id', id)
    .single()

  await supabase
    .from('expenses')
    .delete()
    .eq('window_id', id)

  return { data, error }
}


export {
  getAllWindows,
  getWindowBySlug,
  addNewWindow,
  editWindow,
  deleteWindow
}