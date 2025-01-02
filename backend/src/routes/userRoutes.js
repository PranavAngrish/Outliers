import express from "express";
import { signUp, logOut, userCheck, signIn} from "../controllers/registration/userController.js";
import {googleSignIn,verifyEmail,googleAuth} from "../controllers/registration/userController.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", signIn);
router.get("/logout", logOut);
router.post('/user-check', userCheck);
router.post('/google-login', googleSignIn);
router.get('/user/:id/verify/:token',verifyEmail);
router.get("/google", googleAuth);



export default router;

