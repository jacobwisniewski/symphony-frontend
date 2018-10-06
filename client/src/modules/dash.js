// A reducer for the dash component

initialState = {
    toggleCreate: false,
    toggleJoin: false,
    toggleGigs: false
}

export default (state = initialState, action) => {
    switch (action.type) {
      case "TOGGLE_CREATE":
      return {
          ...state,
          toggleCreate: !state.toggleCreate,
          toggleJoin: false,
          toggleGigs: false
      }
      case "TOGGLE_JOIN":
      return {
          ...state,
          toggleCreate: false,
          toggleJoin: !state.toggleJoin,
          toggleGigs: false
      }
      case "TOGGLE_GIGS":
      return {
          ...state,
          toggleCreate: false,
          toggleJoin: false,
          toggleGigs: !state.toggleGigs
      }
      default:
        return state;
    }
  };