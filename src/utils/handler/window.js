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

async function getExpenses (window_id) {
  const { data, error } = await supabase
    .from('expenses')
    .select()
    .eq('window_id', window_id)

    return { data, error }
}

async function addNewExpense (payload) {
  const { data, error } = await supabase
    .from('expenses')
    .insert([ payload ])

  return { data, error }
}

export {
  getAllWindows,
  getWindowBySlug,
  addNewWindow,
  getExpenses,
  addNewExpense
}