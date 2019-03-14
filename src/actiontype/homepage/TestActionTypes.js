const makeActionType = str => `@@ActionType/${str}@${__filename}`;

export default {

    UPDATE: makeActionType("UPDATE")
};
