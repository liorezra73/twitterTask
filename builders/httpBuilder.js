const axios = require("axios");

const httpBuilder = {
  buildOptions: (method, url, params, headers) => {
    const options = {
      method: method,
      url: url,
      params: params ?? undefined,
      headers: headers ?? undefined,
    };
    return options;
  },
  sendRequest: async (options) => {
    return await axios.request(options);
  },
};

module.exports = httpBuilder;
