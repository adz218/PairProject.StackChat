import { createStore, applyMiddleware } from "redux";
import loggerMiddleware from "redux-logger";
import thunkMiddleware from "redux-thunk";
import axios from "axios";

const GOT_MESSAGES_FROM_SERVER = "GOT_MESSAGES_FROM_SERVER";
//action creator
export const gotMessagesFromServer = messages => ({
  type: GOT_MESSAGES_FROM_SERVER,
  messages
});

//thunk creator
export const fetchMessages = () => {
  return async (dispatch, getState) => {
    console.log("thunk executed");
    const { data } = await axios.get("/api/messages");
    const action = gotMessagesFromServer(data);
    dispatch(action);
  };
};

const initialState = {
  messages: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_MESSAGES_FROM_SERVER:
      return { ...state, messages: [...state.messages, action.messages] };
    default:
      return state;
  }
};

const store = createStore(
  reducer,
  applyMiddleware(loggerMiddleware, thunkMiddleware)
);

export default store;
