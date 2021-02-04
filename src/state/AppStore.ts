import { createStore, applyMiddleware } from "redux";
import {appReducer} from "./AppReducer";
import thunkMiddleware from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));
export const appStore = createStore(appReducer, composedEnhancer);
