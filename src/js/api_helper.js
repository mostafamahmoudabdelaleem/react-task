const backend_api_url = 'https://api.weatherapi.com/v1';
const api_key = process.env.REACT_APP_API_KEY || '';


// Base weather api call
const apiCall = (route, query) => {
  return new Promise((resolve, reject) => {
    if(api_key === ''){
      reject('Error: No API Key was found.');
      return;
    }
    let url = `${backend_api_url}/${route}?key=${api_key}&q=${query}`;
    fetch(url, {
      method: 'GET',
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
};

// Method to search for a city
export const search = (query) => {
    return apiCall(
        'search.json',
        query
    )
}

// Method to get current weather for a city
export const getCurrent = (name) => {
    return apiCall(
        'current.json',
        name
    )
}
