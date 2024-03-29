import  express from 'express';
const  router = express.Router();
import UserController from '../controller/userController.js';
import chechUseraAuth from '../middlewares/auth-middleware.js';

// Routr Level Middleware - to protect Route
router.use('/changepassword', chechUseraAuth)
router.use('/loggeduser', chechUseraAuth)

// public Routes
router.post('/register', UserController.userRegistration)
router.post('/login', UserController.userLogin)
router.post('/send-reset-password-email', UserController.sendUserPasswordResetEmail)
router.post('/reset-password/:id/:token', UserController.userPasswordReset)

//protected Routes
router.post('/changepassword', UserController.changeUserpassword)
router.get('/loggeduser', UserController.loggedUser)


export default router

