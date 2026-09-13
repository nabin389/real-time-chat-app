import nodemailer from 'nodemailer';

const sendEmail = async(options)=>{
    console.log("this is the data come here: ", options);

// return;
    
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth:{
            user: process.env.USER_EMAIL,
            pass: process.env.GMAIL_PASSWORD
        }
    })

    console.log("contron 1");

    const mailOptions = {
        from: process.env.USER_EMAIL,
        to: options.to,
        subject: options.subject,
        text: options.text
    }
    console.log("contron 2");


    // this is optional part 
  await transporter.sendMail(mailOptions, (error, info)=>{
    if(error){
            console.log("contron 3");
        console.log("Error has occured: ", error);
    } else{
            console.log("contron 4");
        console.log("Email sent: ", info.response);
    }
  })
    console.log("contron 5");

}
export {sendEmail};