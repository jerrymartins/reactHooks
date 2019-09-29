const INITIAL_STATE = {
    filterBy: '',
    param: ''
};

export const tableFilters = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'USERS':
            return {...state, ...action};
        case 'ORDERS':
            return {...state, ...action};
        default:
            return state;
    }
};

const INITIAL_STATE_FILTER_LIST = {
    values: [{label: '', value: ''}],
    default: '',
    reducer: ''
};

export const buttonFilterList = (state = INITIAL_STATE_FILTER_LIST, action) => {
    switch (action.type) {
        case 'BUTTON_NEW_LIST':
            return {...state, ...action};
        default:
            return {...state};
    }
};
