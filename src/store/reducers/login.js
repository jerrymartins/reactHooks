const INITIAL_STATE = {
    logged: false,
    user: '',
    email: '',
    profile: '',
    status: '',
    url_image:'',
    token: ''
};

export const login = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, ...action};
        case 'LOGOUT':
            return { ...INITIAL_STATE};
        default:
            return state;
    }
};
