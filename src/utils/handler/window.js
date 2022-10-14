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

async function getExpenses (window_id) {
  const { data, error } = await supabase
    .from('expenses')
    .select()
    .eq('window_id', window_id)

    return { data, error }
}

async function addNewExpense (payload, window) {
  const { data, error } = await supabase
    .from('expenses')
    .insert([ payload ])

  const { incomes, expenses } = window
  const { amount, isExpense, window_id } = payload

  const newExpenses = expenses + parseInt(amount)
  const newIncomes = incomes + parseInt(amount)
  
  if (isExpense === 'true') {
    console.log('exp: ' + newExpenses)
    await supabase
      .from('windows')
      .update({
        expenses: newExpenses
      })
      .eq('id', window_id)
  } else {
    console.log('inc: ' + newIncomes)
    await supabase
      .from('windows')
      .update({
        incomes: newIncomes
      })
      .eq('id', window_id)
  }

  return { data, error }
}

export {
  getAllWindows,
  getWindowBySlug,
  addNewWindow,
  editWindow,
  getExpenses,
  addNewExpense
}