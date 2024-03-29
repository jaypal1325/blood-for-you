import jwt from 'jsonwebtoken'
import Usermodel from '../model/user.js'
// import { setThePassword } from 'whatwg-url'

var chechUseraAuth = async (req, res, next) => {
    let token 
    const {authorization} = req.headers
    if(authorization && authorization.startsWith('Bearer')){
        try {
            //get from token heaser
            token = authorization.split(' ')[1]

            //varify token
            const { userID } = jwt.verify(token, process.env.JWT_SECRET_KEY)
            

            //get user from token
            req.user = await Usermodel.findById(userID).select('-Password')
            

            next()
        } catch (error) {
            console.log(error)
            res.status(401).send({"status": "faild", "massage":"Unauthorixed User"})
        }
    }
    if(!token){
        res.status(401).send({"status": "faild", "massage":"Unauthorixed User, no token"})   
    }
}

export default chechUseraAuth;