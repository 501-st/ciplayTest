import {Box, Button, Input, Title} from "../ui";
import {useEffect, useState} from "react";
import EmailValidator from "../validators/email-validator";
import PasswordValidator from "../validators/password-validator";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {registrationAction} from "../store/userReducer";
import {registration} from "../api";

const Registration = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const isAuth = useSelector(state => state.user.isAuth)
    const error = useSelector(state => state.user.error)

    const localEmail = window.localStorage.getItem('Registration_email') ? window.localStorage.getItem('Registration_email') : ""
    const localPass = window.localStorage.getItem('Registration_pass') ? window.localStorage.getItem('Registration_pass') : ""
    const localPassRepeat = window.localStorage.getItem('Registration_pass_repeat') ? window.localStorage.getItem('Registration_pass_repeat') : ""

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

    const [repeatPass, setRepeatPass] = useState({
        value: localPassRepeat,
        error: ""
    })

    const handleClick = () => {
        setPass({...pass, error: ""})
        setEmail({...email, error: ""})
        setRepeatPass({...repeatPass, error: ""})
        if (!EmailValidator(email, setEmail)) {
            return false
        }
        if (!PasswordValidator(pass, setPass)) {
            return false
        }
        if (repeatPass.value !== pass.value) {
            setRepeatPass({...repeatPass, error: "Пароли должны совпадать"})
            return false
        }
        dispatch(registration(email.value, pass.value))
        dispatch(registrationAction(pass.value)) // Этот вызов для имитации успешной регистрации, если его убрать, то на страницу будет выводиться уведомление об ошибке
    }

    return (
        <Box style={{margin: "auto auto"}}>
            <Title>
                Регистрация
            </Title>

            <Input value={email.value}
                   onChange={(e) => {
                       setEmail({error: "", value: e.target.value});
                       window.localStorage.setItem("Registration_email", e.target.value)
                   }} name={"email"} type={"email"} placeholder={"Email"}/>

            <Input value={pass.value}
                   onChange={(e) => {
                       setPass({error: "", value: e.target.value});
                       window.localStorage.setItem("Registration_pass", e.target.value)
                   }} type="password" placeholder={"Password"}/>

            <Input value={repeatPass.value}
                   onChange={(e) => {
                       setRepeatPass({error: "", value: e.target.value});
                       window.localStorage.setItem("Registration_pass_repeat", e.target.value)
                   }} type="password" placeholder={"Repeat password"}/>

            {email.error &&
            <div style={{position: "absolute", bottom: 80, left: 0, right: 0, color: "red"}}>{email.error}</div>}
            {pass.error &&
            <div style={{position: "absolute", bottom: 70, left: 0, right: 0, color: "red"}}>{pass.error}</div>}
            {repeatPass.error &&
            <div style={{position: "absolute", bottom: 80, left: 0, right: 0, color: "red"}}>{repeatPass.error}</div>}
            {error &&
            <div style={{position: "absolute", bottom: 80, left: 0, right: 0, color: "red"}}>{error}</div>}
            <Button onClick={handleClick}>
                Зарегистрироваться
            </Button>
        </Box>
    )
}

export default Registration