import BaseUtil from "../../util/BaseUtil";


import DataSummryActionTypes from "../../actiontype/homepage/DataSummaryActionTypes";
import {initState} from "../../action/homepage/DataSummaryActions";

export default function dataSummryViewModel(state = initState, action) {
    switch (action.type) {
        case DataSummryActionTypes.UPDATE: {
            return BaseUtil.mergeDeep(state, action.payload);
        }
        default:
            return state;
    }
}
