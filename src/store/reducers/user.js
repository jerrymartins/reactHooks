const INITIAL_STATE = {
    dialog_open: false,
    user: {},
    loadData: true
};

export const user = ( state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'USER':
            return { ...state, ...action };
        case 'DIALOG_USER':
            return { ...state, ...action };
        default:
            return state;
    }
};
