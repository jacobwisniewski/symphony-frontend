export const getProfile = (access_code) => dispatch => {
  // Start the fetch action
  dispatch({
    type: "GET_PROFILE_BEGIN"
  });
  dispatch({
    type: "LOG_IN"
  })
  const url = "http://localhost:5000/api/profile";
  fetch(url, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ access_code: access_code})
  })
    .then(response => response.json().then(body => ({ response, body })))
    .then(({ response, body }) => {
      if (!response.ok) {
        dispatch({
          type: "GET_PROFILE_FAILURE",
          payload: body.error // Send error as payload
        });
      } else {
        dispatch({
          type: "GET_PROFILE_SUCCESS",
          payload: body // Send any returned data to redux
        });
      }
    });
};
