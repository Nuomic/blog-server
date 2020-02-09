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
const errTemp = (err, customerErrorMessage) => {
  console.log('err================', err);
  return {
    ResponseStatus: {
      Ack: 'Success',
      Timestamp: new Date()
    },
    returnStatus: {
      customerErrorMessage,
      errorCode: (err && err.code) || null,
      errorMessage: (err && (err.errmsg || err.message)) || null,
      isSuccess: false
    }
  };
};
const dataTemp = data => {
  if (!Array.isArray(data)) {
    let id = data._id;
    delete data._doc._id;
    delete data._doc.__v;
    return { id, ...data._doc };
  } else
    return data.map(item => {
      let id = item._id;
      delete item._doc._id;
      delete item._doc.__v;
      return { id, ...item._doc };
    });
};
// const getTemp = ()={

// }
module.exports = {
  resTemp,
  errTemp,
  dataTemp
};
