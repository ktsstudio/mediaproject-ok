const okUI = (method, params) =>
  new Promise((resolve, reject) => {
    window.FAPI.UI[method](params);
    window.API_callback = function (m, result, data) {
      if (m === method) {
        result === 'ok' ? resolve(data) : reject(data);
      }
    };
  });

export default okUI;
