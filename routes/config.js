const resTemp = data => {
  data = data || {};
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
    },
    ...data
  };
  return res;
};
const errTemp = (err, customerErrorMessage, ErrorCode, fail) => {
  return {
    ResponseStatus: {
      Ack: fail || 'Success',
      Timestamp: new Date(),
      ErrorCode
    },
    returnStatus: {
      customerErrorMessage,
      errorCode: (err && err.code) || null,
      errorMessage: (err && (err.errmsg || err.message)) || null,
      isSuccess: false
    }
  };
};
const dataTemp = (data, other) => {
  const handleData = value => {
    let id = value._id;
    delete value._doc._id;
    delete value._doc.__v;
    if (other) delete value._doc[other];
    return { id, ...value._doc };
  };
  return Array.isArray(data)
    ? data.map(item => handleData(item))
    : handleData(data);
};
// const getTemp = ()={

// }
module.exports = {
  resTemp,
  errTemp,
  dataTemp
};
