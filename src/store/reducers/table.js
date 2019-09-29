const INITIAL_STATE = {
    headCells: [],
    rows: [],
    tableName:'',
    columnsNames: []
};

export const table = ( state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'NEW_TABLE_DATA':
            return { ...state, ...action };
        case 'CLEAR_TABLE_DATA':
            return { ...state, ...action };
        default:
            return state;
    }
};
