import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import user from "./users";
// import polls from './polls';

const reducer = combineReducers({ user /*polls*/ });
const store = createStore(reducer, applyMiddleware(thunk));

export default store;
export * from "./users";
// export * from './polls';
