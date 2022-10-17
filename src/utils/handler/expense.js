import supabase from "../../config/supabase"

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
    await supabase
      .from('windows')
      .update({
        expenses: newExpenses
      })
      .eq('id', window_id)
  } else {
    await supabase
      .from('windows')
      .update({
        incomes: newIncomes
      })
      .eq('id', window_id)
  }

  return { data, error }
}

async function editExpense (payload, id, newAmount) {
  const { data, error } = await supabase
    .from('expenses')
    .update(payload)
    .eq('id', id)
    .single()

  if (newAmount.type === 'expenses') {
    await supabase
      .from('windows')
      .update({
        expenses: newAmount.newExpenses
      })
      .eq('id', payload.window_id)
  } else {
    await supabase
      .from('windows')
      .update({
        incomes: newAmount.newIncomes
      })
      .eq('id', payload.window_id)
  }

  return { data, error }
}

async function deleteExpense (expense, newAmount) {
  const { data, error } = await supabase
    .from('expenses')
    .delete()
    .eq('id', expense.id)
    .single()

  if (expense.isExpense === true) {
    await supabase
      .from('windows')
      .update({
        expenses: newAmount.expenses
      })
      .eq('id', expense.window_id)
  } else {
    await supabase
      .from('windows')
      .update({
        incomes: newAmount.incomes
      })
      .eq('id', expense.window_id)
  }

  return { data, error }
}

export {
  getExpenses,
  addNewExpense,
  editExpense,
  deleteExpense
}