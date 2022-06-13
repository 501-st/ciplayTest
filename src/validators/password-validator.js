let PasswordValidator = (pass, setPass) => {
    if (pass.value === "") {
        setPass({...pass, error: "Пароль обязателен к заполнению"})
        return false
    } else if (!String(pass.value).match(
        /^(?=.*[A-Z]).{4,10}$/
    )) {
        setPass({...pass, error: "В пароле должна быть как минимум 1 заглавная буква, от 4 до 10 символов"})
        return false
    }
    return true
}

export default PasswordValidator