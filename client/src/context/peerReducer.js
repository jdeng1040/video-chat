export const peesrReducer = (state, action) => {
  if (action.type == "ADD_PEER") {
    return {
      ...state,
      [action.payload.peerId]: {
        stream: action.payload.stream,
      },
    };
  } else if (action.type == "REMOVE_PEER") {
    const { [action.payload.peerId]: deleted, ...rest } = state;
    return rest;
  }
  else {
    return {...state}
  }
};
