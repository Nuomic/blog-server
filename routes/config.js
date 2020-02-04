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
exports.errTemp = (err, customerErrorMessage) => {
  console.log('err', err);
  return {
    ResponseStatus: {
      Ack: 'Success',
      Timestamp: new Date()
    },
    returnStatus: {
      customerErrorMessage,
      errorCode: '1',
      errorMessage: err,
      isSuccess: false
    }
  };
};
exports.dataTemp = data => {
  return data.map(item => {
    let id = item._id;
    delete item._doc._id;
    return { id, ...item._doc };
  });
};
