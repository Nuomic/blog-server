exports.resTemp = (name, data) => {
  let res = {
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
  if (name) res[name] = data;
  return res;
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
      errorCode: err.code,
      errorMessage: err.errmsg,
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
