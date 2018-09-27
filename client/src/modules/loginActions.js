export const getUrl = (action) => dispatch => {
  // Start the fetch action
  dispatch({
    type: 'GET_URL_BEGIN'
  });
  const url = "http://localhost:5000/api/" + action + "/callback";
  console.log(url)
  fetch(url)
    // Get the response and body from the call
    .then(response => response.json().then(body => ({ response, body })))
    .then(({ response, body }) => {
      if (!response.ok) {
        // If the request failed, dispatch the FAILURE action
        dispatch({
          type: 'GET_URL_FAILURE',
          payload: body.error
        });
      } else {
        // The call was a success, push the data to SUCCESS action
        window.location.href = body.url
        dispatch({
          type: 'GET_URL_SUCCESS',
          payload: body.url
        });
      }
    });
};
