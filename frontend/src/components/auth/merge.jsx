import React, { useState,useEffect } from 'react';
import SignUpStepOne from './auth1';
import SignUpStepTwo from './auth2';
import api from '../../axios/axios.js';
import { useDispatch } from 'react-redux';
import { signInStart,signInFailure,signInSuccess } from '../../redux/userSlice.js';
import { useNavigate } from "react-router-dom";
import { googleSignIn } from '../../API/index.js';
import {openSnackbar} from '../../redux/snackbarSlice.jsx';

const SignUpForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const [isGoogleAuth , setIsGoogleAuth] = useState(false);
  const navigate = useNavigate();





  const handleNext = async (data) => {
    try {
      
      const response = await api.post('/users/user-check', { email: data.email , isGoogleAuth });

      
      if (response.data.exists) {
        // User exists, log them in
        

        console.log('User already exists:', response.data.user);
        dispatch(signInStart());

          const user = await api.post('/users/google-login',{
            email: data.email,
          }).then((res)=>{
            if(res.status === 200){
              dispatch(signInSuccess(res.data));
              dispatch(
                openSnackbar({
                  message: "Logged In Successfully",
                  severity: "success",
                })
              );
               //NOW WE HAVE TO NAVIGATE
              navigate("/");
            } else{
              dispatch(signInFailure(res.data));
              dispatch(
                openSnackbar({
                  message: res.data.message,
                  severity: "error",
                })
            );
            }
          }

          );
    

     
        
        console.log("We are in the first start")
        // You can set the user data to state or context, and redirect them as needed
      } else {
        // User doesn't exist, proceed to step two
        console.log("we are in the second start",data);
        setFormData(data);
        setStep(2);
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
      console.error('Error checking email:', error);
    }
  };

  


  const handleSubmit = async (completeData) => {
   
    console.log('Final data:', completeData);
   
    try{
      console.log("We are going to save");
      dispatch(signInStart());

      const user = await api.post('/users/google-login',completeData);

      dispatch(signInSuccess(user.data.message));

      //NOW WE HAVE TO NAVIGATE
      

      console.log("The data has been saved and logged in");
      console.log(response); 
    }
    catch(error){
      dispatch(signInFailure(error.message));
      console.log("We have a damn error");
      console.log(error);
    }
    // Implement your sign-up logic here, such as sending data to the backend.
  };






  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded shadow-md">
      {step === 1 ? (
        <SignUpStepOne onNext={handleNext} setIsGoogleAuth={setIsGoogleAuth} />
      ) : (
        <SignUpStepTwo formData={formData} onSubmit={handleSubmit} handleSubmitWithoutPassword={handleSubmitWithoutPassword}/>
      )}
    </div>
  );
};

export default SignUpForm;


