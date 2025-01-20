const verifyEmailTemplate = ({ name , url})=>{
    return `
    <h1>Hai ${name} </h1>
    <p> Thanks for Registering eccommerse</p>
    <a href=${url} style="back-ground:blue color:white margin:10px">
    Verify Email
    </a>        
    `
}

module.exports = verifyEmailTemplate