import {Box, Button, Input, Title} from "../ui";
import {useEffect, useState} from "react";
import EmailValidator from "../validators/email-validator";
import PasswordValidator from "../validators/password-validator";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {login} from "../api";
import {loginAction} from "../store/userReducer";

const Login = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const isAuth = useSelector(state => state.user.isAuth)
    const error = useSelector(state => state.user.error)

    const localEmail = window.localStorage.getItem('Login_email') ? window.localStorage.getItem('Login_email') : ""
    const localPass = window.localStorage.getItem('Login_pass') ? window.localStorage.getItem('Login_pass') : ""

    useEffect(() => {
        if (isAuth) {
            navigate("/changePass")
        }
    }, [isAuth])

    const [email, setEmail] = useState({
        value: localEmail,
        error: ""
    })

    const [pass, setPass] = useState({
        value: localPass,
        error: ""
    })

    const handleClick = () => {
        setPass({...pass, error: ""})
        setEmail({...email, error: ""})
        if (!EmailValidator(email, setEmail)) {
            return false
        }
        if (!PasswordValidator(pass, setPass)) {
            return false
        }
        dispatch(login(email.value, pass.value))
        dispatch(loginAction(pass.value))  // Этот вызов для имитации успешного логина, если его убрать, то на страницу будет выводиться уведомление об ошибке
    }

    return (
        <Box style={{margin: "auto auto"}}>
            <Title>
                Авторизация
            </Title>
            <Input value={email.value}
                   onChange={(e) => {
                       setEmail({error: "", value: e.target.value});
                       window.localStorage.setItem('Login_email', e.target.value)
                   }} name="email" type="email"
                   placeholder="Email"/>

            <Input value={pass.value}
                   onChange={(e) => {
                       setPass({error: "", value: e.target.value});
                       window.localStorage.setItem('Login_pass', e.target.value)
                   }} type="password" placeholder="Password"/>

            {email.error &&
            <div style={{position: "absolute", bottom: 80, left: 0, right: 0, color: "red"}}>{email.error}</div>}
            {pass.error &&
            <div style={{position: "absolute", bottom: 70, left: 0, right: 0, color: "red"}}>{pass.error}</div>}
            {error &&
            <div style={{position: "absolute", bottom: 80, left: 0, right: 0, color: "red"}}>{error}</div>}
            <Button onClick={handleClick}>
                Войти
            </Button>
        </Box>
    )
}

export default Login;