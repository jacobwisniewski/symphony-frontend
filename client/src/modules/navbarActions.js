// Sets "toggleCreate" entry as true
export const toggleCreate = () => dispatch => {
    dispatch({
      type: "ACTIVATE_CREATE"
    });
  };
  
  // Sets "toggleJoin" entry as true
  export const toggleJoin = () => dispatch => {
    dispatch({
      type: "ACTIVATE_JOIN"
    });
  };
  
  // Sets "toggleGigs" entry as true
  export const toggleGigs = () => dispatch => {
    dispatch({
      type: "ACTIVATE_GIGS"
    });
  };