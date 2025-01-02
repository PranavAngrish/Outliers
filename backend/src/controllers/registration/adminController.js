import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import sendEmail from '../../utils/sendEmail.js';
import Token from '../../models/token.model.js';
import { createError } from "../../error.js";
import { oauth2Client } from '../../utils/oauth2client.js';
import { catchAsync } from '../../utils/asyncHandler.js';
import { Admin } from '../../models/admin.model.js';
import axios from 'axios';
import crypto from 'crypto';
import ms from 'ms';

const saltRounds = 10;
const jwtSecret = 'your_jwt_secret'; // Use environment variable in production
const jwtExpiry = '1h';




const signToken = (id) => {
    console.log("1.1")
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "9999 years",
    });
};

// Create and send Cookie ->
const createSendToken = (user, statusCode, res) => {
    console.log("2.1")
    console.log("user",user);
    const token = signToken(user.id);
    const expiresInMilliseconds = ms(jwtExpiry);

    const cookieOptions = {
        expires: new Date(Date.now() + expiresInMilliseconds),
        httpOnly: true,
        path: '/',
        // sameSite: "none",
        secure: false,
    };
    if (process.env.NODE_ENV === 'production') {
        cookieOptions.secure = true;
        cookieOptions.sameSite = 'none';
    }

    user.password = undefined;

    res.cookie('jwt', token, cookieOptions);

    console.log("Done",user);

    res.status(statusCode).json({
        message: 'success',
        token,
        body: user
    });
};



export const adminGoogleAuth = catchAsync(async (req, res, next) => {
    try{
        console.log("In the baclll");
        const code = req.query.code;
       
        const googleRes = await oauth2Client.getToken(code);
        console.log("GoogleRes" , googleRes);
        console.log("2");
        
        oauth2Client.setCredentials(googleRes.tokens);
        console.log("3");
    
        const userRes = await axios.get(
            `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
        );
       
        
        let user = await Admin.findOne({ email: userRes.data.email });
        console.log("Usss",user);
        console.log("5");
        
        
       
        if (user === null) {
            console.log('New User found');
            user = await Admin.create({
                name: userRes.data.name,
                email: userRes.data.email,
                googleSignIn: true,
                verified: true
            });
            console.log("here");
            return createSendToken(user, 202, res);
        }
        if(user){
            if(user.googleSignIn){
                console.log("Its a google sifgn in");
                return createSendToken(user, 202, res);
            }
            else{
                console.log("Brrer");
                return res.status(401).json({message:"This email is saved via email password,not google authentication, please provide that"})
            }
        }

    }catch(err){
        console.log("Error",err.response?.data || err.message);
    }
   
});




export const adminSignUpUsingEmail = async (req, res) => {
    try {
        const { email, password, googleSignIn= false } = req.body.formData;

        const user = await Admin.find({email: email});
        console.log("The existng user is ", user);
        if(user.length > 0){
            console.log("user exists?")
            return res.status(400).json({message:"User already registered, please SignIn"});
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);
        console.log("password made");
       

        const newUser = new Admin({
            email : email,
            password: hashedPassword,
            googleSignIn
        });
        console.log("New User");
        console.log(newUser);
      

        const savedUser = await newUser.save();
        
            const newToken =  new Token({
                userId: savedUser._id,
                token: crypto.randomBytes(32).toString("hex"),
            });
            const savedToken = await newToken.save();
            console.log("userSaved , newToken");
            const URL = `Kindly click on the link below to verify your email for Outliers\nThis is a one-time link\nYou will be redirected to the signin page from this link\nThank You\n\n${process.env.BASE_URL}/api/admin/user/${savedUser._id}/verify/${newToken.token}`;

            console.log("Find the email", savedUser.email);
    
            await sendEmail(savedUser.email,"Verify Email for Outliers",URL);
            console.log("aaa");
    
            res.status(201).json('An Email sent to your account for verification');
        }


     catch (error) {
        console.log("There is an error", error.message)
        res.status(500).json({ error: error.message });
    }
}

export const adminSignUp = async (req,res) => {
    try{
        console.log("signUppppppppp function");
        const {formData} = req.body;
        const user = await Admin.find({email: formData.email});
        console.log("The existng user is ", user);
        if(user.length > 0){
            console.log("user exists?")
            return res.status(400).json({message:"User already registered, please SignIn"});
        }
        else{

                console.log("Calling email function");
                adminSignUpUsingEmail(req,res);

        }
    }catch(err){
        console.log("Error heh", err.message);
        res.status(500).json({error: err.message});
    }
}


// Sign in
export const adminSignIn = async (req, res, next) => {
    try {
        console.log("We are in the signinnnn Function");
        console.log("Req" , req.body);
        const { email = null, password = null, authenticationType = null} = req.body || {};
        console.log("we start" , email , password, authenticationType);

        // Find the user by email
        const user = await Admin.findOne({ email: email });
        console.log("so",user);

        if (!user ) {
            console.log("id not found");
            return res.status(404).json({ message: 'User not found, please go to the signUp page' });
        }
        if(!user.verified){
            return res.status(201).json({message:"The email has not been verified yet, please go to your gmail and verify it"});
        }
        if(user.verified){
            console.log("Id foiund verification")
            if(authenticationType === "email-authentication" && user.googleSignIn === false){
                // Check password
                console.log("1");
                const isPasswordValid = await bcrypt.compare(password, user.password);

                if (!isPasswordValid) {
                    console.log("1.1");
                    return res.status(401).json({ message: 'Invalid credentials' });
                }
                console.log("1.1.1");

                // Generate JWT token
                const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: "9999 years" });


                return res.status(200).json({  message: 'success',
                    token,
                    user
                     });
            }

            else if(authenticationType === 'email-authentication' && user.googleSignIn === true){
                console.log("2");
                return res.status(400).json({message:'This email Id is saved using googleAuthentication, please use that'});
                
            }
            else if(authenticationType === 'google' && user.googleSignIn === true){
                console.log("3");
                const googleResponse = googleAuth(req, res,next);
                
                if(googleResponse.status === 202){
                    console.log("4");
                    return googleResponse;
                }
                
            }
            else if(authenticationType === 'google' && user.googleSignIn === false){
                console.log("5");
                return res.status(400).json({message:'This email Id is saved using email password not googleAuthentication, please use that'});
    
            }

        }
        else{
            return res.status(401).json({message: 'user doesnt exist'});

        }
        

        
    } catch (error) {
        console.log("Error is : ", error.message);
        res.status(500).json({ error: error.message });
    }
};



export const verifyEmail = async (req, res) => {
    try {
        console.log("We are in the function")
      const user = await Admin.findOne({ _id: req.params.id });
      if (!user) return res.status(400).send('Invalid link');
      console.log("1")
  
      const token = await Token.findOne({
        userId: user._id,
        token: req.params.token,
      });
      console.log("2")
      if (!token) return res.status(400).send('Invalid link');
      console.log("3")
  
      user.verified = true;
      await user.save();
      await Token.findByIdAndDelete(token._id); 
      console.log("Checking the link")
      console.log(process.env.FRONTEND_URL);
      
      res.redirect(`${process.env.FRONTEND_URL}/adminauth?bool=true`);
    } catch (error) {
      res.status(400).send(error.message);
      console.log(error);
    }
  };