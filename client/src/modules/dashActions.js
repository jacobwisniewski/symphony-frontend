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

// Sets "toggleCreate" entry as true
export const activateCreate = () => dispatch => {
  dispatch({
    type: "ACTIVATE_CREATE"
  });
};

// Sets "toggleJoin" entry as true
export const activateJoin = () => dispatch => {
  dispatch({
    type: "ACTIVATE_JOIN"
  });
};

// Sets "toggleGigs" entry as true
export const activateGigs = () => dispatch => {
  dispatch({
    type: "ACTIVATE_GIGS"
  });
};