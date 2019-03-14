import {combineReducers} from "redux";

import mainViewModel from "./mainViewModel";
import homepage from "./homepage/index";


const rootViewModel = combineReducers({
    mainViewModel,
    homepage,
});

export default rootViewModel;
