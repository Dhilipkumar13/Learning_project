const { Resend } = require('resend');
const asyncHandler = require("express-async-handler")

if(!process.env.RESEND_API){
    console.log("provided RESEND_API in side the .env file")
}

const resend = new Resend(process.env.RESEND_API);

const sendEmail = asyncHandler( async ({name , sendTo , subject , html}) =>{
    const { data, error } = await resend.emails.send({
        from: 'Ecommerce <onboarding@resend.dev>',
        to: sendTo,
        subject: subject,
        html: html,
      });
    
      if (error) {
        return console.error({ error });
      }
})

module.exports = sendEmail
