import {Box, Button, Input, Title} from "../ui";
import {useEffect, useState} from "react";
import PasswordValidator from "../validators/password-validator";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {changePassAction, logoutAction} from "../store/userReducer";
import {changePassword} from "../api";

const ChangePassword = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isAuth = useSelector(state => state.user.isAuth)
    const oldPassword = useSelector(state => state.user.user.password)
    const [successMessage, setSuccessMessage] = useState("")

    useEffect(() => {
        if (!isAuth) {
            navigate("/")
        }
    }, [isAuth, navigate])

    const [oldPass, setOldPass] = useState({
        value: "",
        error: ""
    })

    const [pass, setPass] = useState({
        value: "",
        error: ""
    })

    const [repeatPass, setRepeatPass] = useState({
        value: "",
        error: ""
    })

    const handleClick = () => {
        setPass({...pass, error: ""})
        setRepeatPass({...repeatPass, error: ""})
        setOldPass({...oldPass, error: ""})
        setSuccessMessage("")
        if (oldPass.value === "") {
            setOldPass({...oldPass, error: "Введите старый пароль"})
            return false
        }
        if (oldPass.value !== oldPassword){
            setOldPass({...oldPass, error: "Вы ввели неверный пароль"})
            return false
        }
        if (!PasswordValidator(pass, setPass)) {
            return false
        }
        if (repeatPass.value !== pass.value) {
            setRepeatPass({...repeatPass, error: "Пароли должны совпадать"})
            return false
        }
        dispatch(changePassword(pass.value))
        dispatch(changePassAction(pass.value)) // Этот вызов для имитации успешной смены пароля
        setSuccessMessage("Вы успешно сменили пароль")
        setPass({value: "", error: ""})
        setRepeatPass({value: "", error: ""})
        setOldPass({value: "", error: ""})
    }

    return (
        <Box style={{margin: "auto auto"}}>
            <Title>
                Сменить пароль
            </Title>
            <Input value={oldPass.value} onChange={(e) => setOldPass({error: "", value: e.target.value})}
                   type={"password"} placeholder={"Old password"}/>
            <Input value={pass.value} onChange={(e) => setPass({error: "", value: e.target.value})} type={"password"}
                   placeholder={"New password"}/>
            <Input value={repeatPass.value} onChange={(e) => setRepeatPass({error: "", value: e.target.value})}
                   type={"password"} placeholder={"Repeat password"}/>

            {oldPass.error &&
            <div style={{position: "absolute", bottom: 80, left: 0, right: 0, color: "red"}}>{oldPass.error}</div>}
            {pass.error &&
            <div style={{position: "absolute", bottom: 80, left: 0, right: 0, color: "red"}}>{pass.error}</div>}
            {repeatPass.error &&
            <div style={{position: "absolute", bottom: 80, left: 0, right: 0, color: "red"}}>{repeatPass.error}</div>}
            {successMessage !== "" && <div style={{position: "absolute", bottom: 80, left: 0, right: 0, color: "green"}}>{successMessage}</div> }
            <Button style={{marginRight: "20px"}} onClick={handleClick}>
                Изменить пароль
            </Button>
            <Button onClick={() => {dispatch(logoutAction()); window.localStorage.clear()}}>
               Выйти
            </Button>
        </Box>
    )
}

export default ChangePassword