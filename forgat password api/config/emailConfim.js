import dotenv from  'dotenv'
dotenv.config()
import nodemailer from 'nodemailer'

let transpoter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    post: process.env.EMAIL_POST,
    secure: false, //true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
})

export default transpoter