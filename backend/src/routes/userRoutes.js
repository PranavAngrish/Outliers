import express from "express";
import {signIn, signUp, logOut} from "../controllers/registration/userController.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", signIn);
router.get("/logout", logOut);

export default router;

