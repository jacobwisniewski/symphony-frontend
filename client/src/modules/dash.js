// A reducer for the dash component

const initialState = {
  toggleCreate: false,
  toggleJoin: false,
  toggleGigs: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "TOGGLE_CREATE":
      return {
        ...state,
        toggleCreate: !state.toggleCreate,
        toggleJoin: false,
        toggleGigs: false
      };
    case "TOGGLE_JOIN":
      return {
        ...state,
        toggleCreate: false,
        toggleJoin: !state.toggleJoin,
        toggleGigs: false
      };
    case "TOGGLE_GIGS":
      return {
        ...state,
        toggleCreate: false,
        toggleJoin: false,
        toggleGigs: !state.toggleGigs
      };
    case "ACTIVATE_CREATE":
    return {
      ...state,
      toggleCreate: true,
      toggleJoin: false,
      toggleGigs: false
    }
    case "ACTIVATE_JOIN":
    return {
      ...state,
      toggleCreate: false,
      toggleJoin: true,
      toggleGigs: false
    }
    case "ACTIVATE_GIGS":
    return {
      ...state,
      toggleCreate: false,
      toggleJoin: false,
      toggleGigs: true
    }
    default:
      return state;
  }
};
