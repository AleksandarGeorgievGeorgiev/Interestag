export default function validateRegister(values){
    // username - between 3 - 50, upper case, digit, lower case, underscore, dash
    let errors = {};
    if(!values.username){
    }//else if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{3,50})(?=.[!@#$%^&])+$/.test(values.username)){
        else if(!/^([A-Za-z0-9]+){3,50}$/.test(values.username)) {
        errors.username = "Username is invalid. Length 3 - 50, at least one uppercase letter, one lowercase letter, one digit, underscore and dash"
    }

    // email 
    if(!values.email){
    }else if(!/^\S+@\S+\.\S+$/.test(values.email)){
        errors.email = "Email is invalid"
    }

    // password - pone 6 symbol, upper case, digit, lower case, same as the confirm password
    if(!values.password){
    }else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})(?=.[!@#$%^&])+$/.test(values.password)){
        errors.password = "Password is invalid. Length at least 6, at least one uppercase letter, one lowercase letter, one digit, underscore and dash"
    }

    if(!values.confirmPassword){
    }else if(values.password !== values.confirmPassword){
        errors.confirmPassword = "Password doesn't match"
    }
    return errors;
}