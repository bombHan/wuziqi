import {combineReducers} from "redux";

import testViewModel from "./testViewModel";
import dataSummryViewModel from "./dataSummaryViewModel"

const rootViewModel = combineReducers({
    testViewModel,
    dataSummryViewModel,

});

export default rootViewModel;
