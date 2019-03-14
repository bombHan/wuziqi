import BaseUtil from "../../util/BaseUtil";


import TestActionTypes from "../../actiontype/homepage/TestActionTypes";
import {initState} from "../../action/homepage/HomePageActions";

export default function testViewModel(state = initState, action) {
    switch (action.type) {
        case TestActionTypes.UPDATE: {
            return BaseUtil.mergeDeep(state, action.payload);
        }
        default:
            return state;
    }
}
