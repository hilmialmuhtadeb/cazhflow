import { useNavigate } from 'react-router-dom'
import supabase from '../../config/supabase'

async function registerUser (payload) {
  const {
    name,
    username,
    password
  } = payload
  
  const { data, error } = await supabase
    .from('users')
    .insert([{ 
        name,
        username,
        password
      },
    ])
}

async function getUser (username) {
  const { data: user, error } = await supabase
    .from('users')
    .select()
    .eq('username', username)
    .limit(1)
    .single()

  return user
}

export {
  registerUser,
  getUser
}