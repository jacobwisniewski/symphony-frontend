// A reducer for the dash component

const initialState = {
  toggleCreate: false,
  toggleJoin: false,
  toggleGigs: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "ACTIVATE_CREATE":
      return {
        ...state,
        toggleCreate: true,
        toggleJoin: false,
        toggleGigs: false
      };
    case "ACTIVATE_JOIN":
      return {
        ...state,
        toggleCreate: false,
        toggleJoin: true,
        toggleGigs: false
      };
    case "ACTIVATE_GIGS":
      return {
        ...state,
        toggleCreate: false,
        toggleJoin: false,
        toggleGigs: true
      };
    default:
      return state;
  }
};
