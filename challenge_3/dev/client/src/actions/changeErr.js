var changeErr = (err) => {
  return {
    type: 'err',
    err: err
  }
}

export default changeErr;