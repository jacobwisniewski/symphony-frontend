// Toggles "toggleCreate" entry in dash state
export const toggleCreate = () => dispatch => {
  dispatch({
    type: "TOGGLE_CREATE"
  });
};

// Toggles "toggleJoin" entry in dash state
export const toggleJoin = () => dispatch => {
  dispatch({
    type: "TOGGLE_JOIN"
  });
};

// Toggles "toggleGigs" entry in dash state
export const toggleGigs = () => dispatch => {
  dispatch({
    type: "TOGGLE_GIGS"
  });
};
