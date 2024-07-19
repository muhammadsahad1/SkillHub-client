// validation user SignUp & login

export const validateUsername = (username: string) => {
  const minLength = 3;
  const usernameRegex = /^[A-Za-z]+$/;

  if (!username) {
    return "Username is required";
  }

  if (username.length < minLength) {
    return `Username should have at least ${minLength}`;
  }

  if (!usernameRegex.test(username)) {
    return "Username should only contain letter";
  }

  if (/\s/.test(username)) {
    return "Username should not contain space";
  }
  return true 
};

export const validateEmail = (email : string ) => {
  const regexValidEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
  return regexValidEmail.test(email) ? true : "Invalid email format"

};

export const validatePassword = (password : string ) =>{
  if (typeof password !== "string") return false; 

  const validations = [
    { condition :  password.length >= 6 , message : "Password should be at least 6 characters long."},
    { condition : /\d/.test(password) ,message : "Password should be contain at least one digit" },
    { condition : /[a-z]/.test(password) , message : "Password should be contain at least one alphabet"},
    { condition : /[!@#$%^&*(),.?":{}|<>]/.test(password) , message : "Password should contain at least one special character"},
    { condition : !/\s/.test(password) ,message : "Password should not contain spaces"}
  ]
const failedValidation = validations.find(validation => !validation.condition )
return failedValidation ? failedValidation.message : true 
}