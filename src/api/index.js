import axios from "axios";
import {changePassAction, errorAction, loginAction} from "../store/userReducer";

export const login = (email, password) => (
    (dispatch) => {
        axios.post(`/login`, {email, password}).then(
            response => {
                if (response.data.token) {
                    localStorage.setItem("token", response.data.token)
                    dispatch(loginAction(true));
                } else
                    dispatch(errorAction(response.data.error.message))
            }
        ).catch(e => dispatch(errorAction(e.message)))
    }
)

export const registration = (email, password) => (
    (dispatch) => {
        axios.post(`/registration`, {email, password}).then(
            response => {
                if (response.data.token) {
                    localStorage.setItem("token", response.data.token)
                    dispatch(loginAction(true));
                } else
                    dispatch(errorAction(response.data.error.message))
            }
        ).catch(e => dispatch(errorAction(e.message)))
    }
)

export const changePassword = (password) => (
    (dispatch) => {
        axios.post(`/change-password`, {password}).then(
            response => {
                if (response.status_code === 200) {
                    dispatch(changePassAction(password));
                } else
                    dispatch(errorAction(response.data.error.message))
            }
        ).catch(e => dispatch(errorAction(e.message)))
    }
)