const defaultState = {
    user: {},
    isAuth: false,
    error: ""
}

const REGISTRATION = "REGISTRATION"
const LOGIN = "LOGIN"
const LOGOUT = "LOGOUT"
const CHANGE_PASS = "CHANGE_PASS"
const ERROR = "ERROR"

export const userReducer = (state = defaultState, action) => {
    switch (action.type) {
        case REGISTRATION:
            return {...state, isAuth: true, user: {...state.user, password: action.payload}}
        case LOGIN:
            return {...state, isAuth: true, user: {...state.user, password: action.payload}}
        case LOGOUT:
            return {isAuth: false, user: {}, error: ""}
        case CHANGE_PASS:
            return {...state, user: {...state.user, password: action.payload}}
        case ERROR:
            return {...state, error: action.payload}
        default:
            return state
    }
}

export const registrationAction = (payload) => {
    return {
        type: REGISTRATION, payload
    }
}

export const loginAction = (payload) => {
    return {
        type: LOGIN, payload
    }
}

export const logoutAction = () => {
    return {
        type: LOGOUT
    }
}

export const errorAction = (payload) => {
    return {
        type: ERROR, payload
    }
}

export const changePassAction = (payload) => {
    return {
        type: CHANGE_PASS, payload
    }
}

