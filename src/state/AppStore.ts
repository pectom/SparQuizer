import {createStore} from "redux";
import {appReducer} from "./AppReducer";
import {composeWithDevTools} from "redux-devtools-extension";

const composedEnhancer = composeWithDevTools();
export const appStore = createStore(appReducer, composedEnhancer);
