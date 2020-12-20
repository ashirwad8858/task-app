const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomMail = (email,name) => {
 sgMail.send({
     to:email,
     from:'abc@abc.com',
     subject:'this is subject of mail',
     text:`Welcom to the app ${name}. `,
    //  html:''
 })
}

module.exports ={
    sendWelcomMail
}

// sending email
// sgMail.send({
//     to:'ashirwadsharma12795@abc.com',
//     from:'ashirwadsharma12795@abc.com',
//     subject:'This is my first Email sending development',
//     text: 'I am sending mail'
// })