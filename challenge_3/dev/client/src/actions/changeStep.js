var changeStep = (step) => {
  console.log('changeStep line 2');
  console.log(step);
  return {
    type: 'step',
    step: step
  }
}

export default changeStep;