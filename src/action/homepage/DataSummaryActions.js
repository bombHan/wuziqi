import DataSummryActionTypes from "../../actiontype/homepage/DataSummaryActionTypes";
import dataSummryService from "../../service/core/DataSummryService";

import _ from 'lodash';

export let initState = {
    finished: false,
    currentColor: "white",
    value: _.times(15, (index) => {
        return _.times(15, () => {
            return 2;
        })
    }),
};


function update(val) {
    return {
        type: DataSummryActionTypes.UPDATE,
        payload: val
    }
}


//----------------------------------------------------




export default {
    update,

}
