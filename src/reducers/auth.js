const initialState = false;

const login = (state = initialState, action) => {
    switch (action.type) {
        case "UPDATELOGIN": return action.payload;
        default: return state;
    }
}

export default login;