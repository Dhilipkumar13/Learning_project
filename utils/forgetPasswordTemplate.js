const forgetPasswordTemplate = ({name, otp}) => {
    return ` 
    <h1>Hai ${name} </h1>
    <p> here is your otp ${otp} </p>
    </a> `
}

module.exports = forgetPasswordTemplate