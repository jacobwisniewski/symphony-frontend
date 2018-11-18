export const getProfile = access_code => dispatch => {
  // Start the fetch action
  dispatch({
    type: "GET_PROFILE_BEGIN"
  });
  dispatch({
    type: "LOG_IN"
  });
  const url = "http://localhost:5000/api/profile";
  fetch(url, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ access_code: access_code })
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

export const refreshProfile = mongo_id => dispatch => {
  // Start the fetch action
  dispatch({
    type: "GET_PROFILE_BEGIN"
  });
  const url = "http://localhost:5000/api/profile";
  return fetch(url, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ mongo_id: mongo_id })
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

// TODO: Handle errors, change private to discoverable if the backend is changed
export const createGig = (mongo_id, gig_name, discoverable) => dispatch => {
  dispatch({
    type: "CREATE_GIG_BEGIN"
  });
  const url = "http://localhost:5000/api/create";
  return fetch(url, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      gig_name: gig_name,
      private: discoverable,
      mongo_id: mongo_id,
      algorithm: "test"
    })
  })
    .then(response => response.json().then(body => ({ response, body })))
    .then(({ response, body }) => {
      if (!response.ok) {
        dispatch({
          type: "CREATE_GIG_FAILURE",
        });
      } else {
        dispatch({
          type: "CREATE_GIG_SUCCESS",
        });
      }
    });
};
