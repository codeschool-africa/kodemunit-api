const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateRegisterInput(data) {
    let errors = {};
    // Convert empty fields to an empty string so we can use validator functions
    data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
    data.secondName = !isEmpty(data.secondName) ? data.secondName : "";
    data.username = !isEmpty(data.username) ? data.username : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";
    // firstName checks
    if (Validator.isEmpty(data.firstName)) {
        errors.firstName = "First Name field is required";
    }
    // secondName checks
    if (Validator.isEmpty(data.secondName)) {
        errors.secondName = "Second Name field is required";
    } else if (!Validator.isEmail(data.secondName)) {
        errors.secondName = "Second Name is invalid";
    }

    // Username checks
    if (Validator.isEmpty(data.username)) {
        errors.username = "Email field is required";
    } else if (!Validator.isEmail(data.username)) {
        errors.username = "Username is invalid";
    }

    // Password checks
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }
    if (Validator.isEmpty(data.password2)) {
        errors.password2 = "Confirm password field is required";
    }
    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = "Password must be at least 6 characters";
    }
    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = "Passwords must match";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};