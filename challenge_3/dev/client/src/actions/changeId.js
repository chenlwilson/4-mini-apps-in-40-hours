var changeId = (id) => {
  console.log('changeId.js line 4, id is' + id);
  return {
    type: 'id',
    id: id
  }
}

export default changeId;