exports.resTemp = {
  ResponseStatus: {
    Ack: 'Success',
    Timestamp: new Date()
  },
  returnStatus: {
    customerErrorMessage: null,
    errorCode: '0',
    errorMessage: null,
    isSuccess: true
  }
};

exports.dataTemp = data => {
  return data.map(item => {
    let id = item._id;
    delete item._doc._id;
    return { id, ...item._doc };
  });
};
