export const pushCode = (access_code, type) => dispatch => {
  // Start the fetch action
  dispatch({
    type: "PUSH_CODE_BEGIN"
  });
  const url = "http://localhost:5000/api/" + type; // Type is the subsequent route (ex: Create, Join, Profile)\
  // Returns special body if type is 'join' as it requires an additional variable
  // TODO: handle invite codes
  const body_data = (type === 'join') ? {access_code: access_code, invite_code: invite_code } : {access_code: access_code}
  fetch(url, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body_data)
  })
    .then(response => response.json().then({ response, body }))
    .then(({ response, body }) => {
      if (!response.ok) {
        dispatch({
          type: "PUSH_CODE_FAILURE",
          payload: body.error // Send error as payload
        });
      } else {
        dispatch({
          type: "PUSH_CODE_SUCCESS",
          payload: body // Send any returned data to redux
        });
      }
    });
};
