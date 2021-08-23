const okApi = (method, params = {}): any =>
  new Promise((resolve, reject) => {
    window.FAPI.Client.call({ method, ...params }, (status, data, error) => {
      if (status === 'ok') {
        resolve(data);
      } else {
        reject(error);
      }
    });
  });

export default okApi;
