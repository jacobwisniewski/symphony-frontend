const initialState = {
  access_code: null
};

// Callback reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case "PUSH_CODE":
      return {
        ...state,
        access_code: action.payload
      };
    default:
      return state;
  }
};
