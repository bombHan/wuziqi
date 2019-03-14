/**
 * Created by swchen on 2017/2/14.
 */




const makeActionType = str => `@@ActionType/${str}@${__filename}`;

export default {
    DATA: makeActionType("DATA"),
    IS_EXECUTING: makeActionType("IS_EXECUTING"),
    ERROR: makeActionType("ERROR"),


    MERGE_DEEP: makeActionType("MERGE_DEEP")
};