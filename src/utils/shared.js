function handleKeyUp (e, cb) {
  if (e.key === 'Enter') {
    return cb()
  }
  return
}

export {
  handleKeyUp
}