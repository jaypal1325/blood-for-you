import Usermodel from '../model/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import transpoter from '../config/emailConfim.js'

class UserController {
    static userRegistration = async (req, res) => {
        const {name, email, password,password_confirmation, tc} = req.body
        const user = await Usermodel.findOne({email:email})
        if (user) {
            res.send({"status":"failed", "massage":"Email already exists"})
        } else {
            if(name && email && password && password_confirmation && tc){
                if(password === password_confirmation){
                    try {
                        const salt = await bcrypt.genSalt(10)
                        const hashPassword = await bcrypt.hash(password, salt)
                        const doc = new Usermodel({
                            name:name,
                            email:email,
                            password:hashPassword,
                            tc:tc
                        })
                        await doc.save()
                        const savad_user = await Usermodel.findOne({email:email}) 

                        // Generate JWT Token
                        const token = jwt.sign({userID:savad_user.id},
                        process.env.JWT_SECRET_KEY, {expiresIn: '5d'})
                        
                        res.status(201).send({"status": "Success", "massage": "Registation Success", 
                        "token": token })
                    } catch (error) {
                        console.log(error)
                        res.send({"status": "failed", "massage": "Unable to Register"})
                    }

                }else{
                    res.send({"status": "failed", "massage":"Password and Confirm Paaaword doesn't match"})
                }
            }else{
                res.send({"status":"failed", "massage":"All fields are required"})
            }
        }
    }

    static userLogin = async (req, res) =>{
        try {
            const {email, password} = req.body
            if(email && password){
            const user = await Usermodel.findOne({email:email})
                if(user != null){
                    const isMatch = await bcrypt.compare(password, user.password)
                    if((user.email === email) && isMatch){

                        // Generate JWT Token
                        const token = jwt.sign({userID: user.id},
                        process.env.JWT_SECRET_KEY, {expiresIn: '5d'})

                    res.send({"status":"success", "massage":"Login Success", 
                    "token":token})

                    }else{
                        res.send({"status":"failed", "massage":"Email or password is not Valid"})
                    }
                }else{
                res.send({"status":"failed", "massage":"you are not a Registered User"})

                }
            }else{
                res.send({"status":"failed", "massage":"All fields are required"})
            }
        } catch (error) {
          console.log(error)  
          res.send({"status":"failed", "massage":"Unable to Login"})

        }
    }
    
    static changeUserpassword = async(req, res) => {
        const {password, password_confirmation} = req.body
        if(password && password_confirmation){
            if(password !== password_confirmation){
                res.send({"status":"failed", "massage":"New Password and Confirm New Password dosen't match"})
            }else{
                const salt = await bcrypt.genSalt(10)
                const newHashPassword = await bcrypt.hash(password, salt)
                await Usermodel.findByIdAndUpdate(req.user._id, {$set: {
                password: newHashPassword} })

                res.send({"status":"success", "massage":"Password change successfully"})
            }
        }else{
            res.send({"status":"failed", "massage":"All fields are required"})
        }
    }

    static loggedUser = async(req, res) => {
        res.send({"user": req.user })
    }

    static sendUserPasswordResetEmail = async(req,res) =>{
        const {email} = req.body
        if(email){
            const user = await Usermodel.findOne({email:email})
            if(user){
                const secret = user._id + process.env.JWT_SECRET_KEY
                const token = jwt.sign({userID: user._id},secret,{
                    expiresIn: '15m' })
                const link = `http://127.0.0.1:3000/api/user/reset/${user._id}/${token}`  // 01 : 48
                // console.log(link)
               
                // send email
                    let info = await transpoter.sendMail({
                        from: process.env.EMAIL_FROM,
                        to: user.email,
                        subject: "GeekShop - Password Reset Link",
                        html: `<a href = ${link}>Click Hare </a> to Reset Your Password`
                    })

                res.send({"status": "success", "massage": "Password Reset Email Sent...Please Check your Email", "info": info})

            }else{
                res.send({"status":"failed", "massage":"Email doesn't exists"})
            }
        }else{
            res.send({"status":"failed", "massage":"Email Field is Required"})
        }
    }

    static userPasswordReset = async(req,res) =>{
        const {password,password_confirmation} = req.body
        const {id, token} = req.params
        const user = await Usermodel.findById(id)
        const new_secret = user._id + process.env.JWT_SECRET_KEY
        try {
            jwt.verify(token, new_secret)
            if(password && password_confirmation){
                if(password !== password_confirmation){
                    res.send({"status":"failed","massage":"New Password and Confirm New Password doesh't match"})
                }else{
                const salt = await bcrypt.genSalt(10)
                const newHashPassword = await bcrypt.hash(password, salt)
                await Usermodel.findByIdAndUpdate(user._id, {$set: {
                password: newHashPassword} })
                res.send({"status":"success","massage":"Password Reset Successfully"})

            }
            }else{

            }
        } catch (error) {
          res.send({"status":"failed", "massage": "Invalid Token"})  
        }
    }
}

export default UserController