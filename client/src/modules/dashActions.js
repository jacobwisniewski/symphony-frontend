import { api_url } from "../index";

export const getDash = (access_code = null, api_key = null) => dispatch => {
  dispatch({
    type: "DASH_FETCH_BEGIN"
  });
  const url = api_url + "/dash";
  return fetch(url, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify(
      // If no access code is given, give the api_key instead
      access_code !== null ? { access_code: access_code } : { api_key: api_key }
    )
  })
    .then(response => response.json().then(body => ({ response, body })))
    .then(({ response, body }) => {
      if (!response.ok) {
        dispatch({
          type: "DASH_FETCH_FAILURE",
          payload: { error: response.statusText }
        });
      } else {
        // Log in the user, due to either a dash profile being created or requested
        dispatch({
          type: "USER_LOGIN"
        });
        dispatch({
          type: "DASH_FETCH_SUCCESS",
          payload: body
        });
      }
    });
};

export const createGig = gig_data => dispatch => {
  // Takes a dictionary of gig data
  // {api_key: str, gig_name: str, private: boolean, latitude: float, longitude: float}
  dispatch({
    type: "CREATE_GIG_BEGIN"
  });
  const url = api_url + "/create";
  return fetch(url, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify(gig_data)
  })
    .then(response => response.json().then(body => ({ response, body })))
    .then(({ response, body }) => {
      if (!response.ok) {
        dispatch({
          type: "CREATE_GIG_FAILURE",
          payload: { error: response.statusText }
        });
      } else {
        dispatch({
          type: "CREATE_GIG_SUCCESS",
          payload: body
        });
      }
    });
};

export const leaveGig = (api_key, invite_code) => dispatch => {
  dispatch({
    type: "LEAVE_GIG_BEGIN"
  });
  const url = api_url + "/leave";
  return fetch(url, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify({
      api_key: api_key,
      invite_code: invite_code
    })
  })
    .then(response => response.json().then(body => ({ response, body })))
    .then(({ response, body }) => {
      if (!response.ok) {
        dispatch({
          type: "LEAVE_GIG_FAILURE",
          payload: { error: response.statusText }
        });
        return response.ok;
      } else {
        dispatch({
          type: "LEAVE_GIG_SUCCESS",
          payload: body
        });
      }
    });
};

export const joinGig = (api_key, invite_code) => dispatch => {
  dispatch({
    type: "JOIN_GIG_BEGIN"
  });
  const url = api_url + "/join";
  return fetch(url, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify({
      api_key: api_key,
      invite_code: invite_code
    })
  })
    .then(response => response.json().then(body => ({ response, body })))
    .then(({ response, body }) => {
      if (!response.ok) {
        dispatch({
          type: "JOIN_GIG_FAILURE",
          payload: { error: response.statusText }
        });
        return {ok: response.ok, message: body.message};
      } else {
        dispatch({
          type: "JOIN_GIG_SUCCESS",
          payload: body
        });
        return {ok: response.ok};
      }
    });
};

export const findGigs = (api_key, latitude, longitude) => dispatch => {
  dispatch({
    type: "FIND_GIGS_BEGIN"
  });
  const url = api_url + "/find";
  return fetch(url, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify({
      api_key: api_key,
      latitude: latitude,
      longitude: longitude
    })
  })
    .then(response => response.json().then(body => ({ response, body })))
    .then(({ response, body }) => {
      if (!response.ok) {
        dispatch({
          type: "FIND_GIGS_FAILURE",
          payload: { error: response.statusText }
        });
        return response;
      } else {
        dispatch({
          type: "FIND_GIGS_SUCCESS",
          payload: body.gigs
        });
        return response;
      }
    });
};

export const getGigs = (api_key) => dispatch => {
  dispatch({
    type: "GET_GIGS_BEGIN"
  });
  const url = api_url + "/gigs";
  return fetch(url, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify({
      api_key: api_key
    })
  })
    .then(response => response.json().then(body => ({ response, body })))
    .then(({ response, body }) => {
      if (!response.ok) {
        dispatch({
          type: "GET_GIGS_FAILURE",
          payload: { error: response.statusText }
        });
        return response;
      } else {
        dispatch({
          type: "GET_GIGS_SUCCESS",
          payload: body.gigs
        });
        return response;
      }
    });
};
export const resetDash = () => dispatch => {
  dispatch({
    type: "RESET_DASH"
  });
};

// Functions for toggling create, join and gigs components
export const toggleCreate = () => dispatch => {
  dispatch({
    type: "TOGGLE_CREATE"
  });
};

export const toggleJoin = () => dispatch => {
  dispatch({
    type: "TOGGLE_JOIN"
  });
};

export const toggleGigs = () => dispatch => {
  dispatch({
    type: "TOGGLE_GIGS"
  });
};

export const setPrevPath = (prev_path) => dispatch => {
  dispatch({
    type: "SET_PREV_PATH",
    payload: prev_path
  })
}