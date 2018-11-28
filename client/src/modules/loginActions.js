import { api_url } from "../index";

export const getUrl = () => dispatch => {
  // Fetches the Spotify authorisation URL from the backend
  dispatch({
    type: "URL_FETCH_BEGIN"
  });

  const url = api_url + "/callback";
  return fetch(url)
    .then(response => response.json().then(body => ({ response, body })))
    .then(({ response, body }) => {
      if (!response.ok) {
        dispatch({
          type: "URL_FETCH_FAILURE",
          payload: { error: response.statusText }
        });
      } else {
        dispatch({
          type: "URL_FETCH_SUCCESS",
          payload: body
        });
        return body.url;
      }
    });
};

export const userLogout = () => dispatch => {
  dispatch({
    type: 'USER_LOGOUT'
  })
}