let EmailValidator = (email, setEmail) => {
    if (email.value === "") {
        setEmail({...email, error: "Email обязателен к заполнению"})
        return false
    } else if (!String(email.value).toLowerCase().match(
        /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/
    )) {
        setEmail({...email, error: "Некорректный email"})
        return false
    }
    return true
}

export default EmailValidator