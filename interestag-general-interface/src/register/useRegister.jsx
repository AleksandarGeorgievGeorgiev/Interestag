import React, {useState} from 'react'

const useRegister = (callback, validate) => {
    const [values, setValues] = useState({username: "", email: "", password: "", password_confirm: ""})
    const [errors, setErrors] = useState({})

    const handleChange = (event) => {
        const {name, value} = event.target
        setValues({
            ...values, [name]: value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        //setErrors(validate(values))
        callback();
    }

    return{
        handleChange,
        handleSubmit,
        values,
        errors
    };
}
export { useRegister };