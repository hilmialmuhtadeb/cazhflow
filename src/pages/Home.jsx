import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from '../features/counter/counterSlice'

const Home = () => {
  const count = useSelector(state => state.counter.value)
  const dispatch = useDispatch()
  
  return (
    <div className='container'>
      <button onClick={() => dispatch(increment())}>increment</button>
      <p>{ count }</p>
      <button onClick={() => dispatch(decrement())}>decrement</button>
    </div>
  )
}

export default Home