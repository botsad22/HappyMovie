export const get = async url => {
  try {
    let response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json-patch+json',
      },
    });
    let responseJson = await response.json();
    if (responseJson.message) {
      throw responseJson.message;
    } else {
      return responseJson;
    }
  } catch (error) {
    throw {status: error};
  }
};
