function request(url, options = {}) {
  async function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      const error = {
        status: response.status,
        statusText: response.statusText,
        response: await response.json()
      };
      throw error;
    }
  }

  function parseJSON(response) {
    return response.json();
  }

  options.credentials = 'include';
  options.mode = 'cors';
  options.cache = 'default';
  options.body = JSON.stringify(options.body);
  options.headers = {
    ...options.headers,
    'Content-Type': 'application/json'
  };

  return new Promise((resolve, reject) => {
    fetch(url, options)
      .then(checkStatus)
      .then(parseJSON)
      .then(response => resolve(response))
      .catch((error) => reject(error));
  });
};
