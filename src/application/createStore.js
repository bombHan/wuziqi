import {compose, createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import WebpackConstants from "../constant/WebpackConstants";

// NOTE:
// middleware : dispatch -> dispatch
// enhancer : createStore -> createStore


const isProduction = process.env.NODE_ENV === WebpackConstants.NODE_ENV.PRODUCTION;


const enhancer = !isProduction && typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

export default enhancer(
    applyMiddleware(thunk),
    // other store enhancers if any
)(createStore);



