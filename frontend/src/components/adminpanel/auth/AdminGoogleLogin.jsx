/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { adminGoogleAuth } from "../../../API/index.js";
import {useState} from "react"
                              

export default (props) => {
    const [bool,setBool] = useState(false);
	const responseGoogle = async (authResult) => {
		try {
            console.log("AuthResult",authResult);
			if (authResult["code"]) {
				console.log(authResult.code);
                console.log("We are in responseGoogle");
				const result = await adminGoogleAuth(authResult.code);
                console.log("uhd");
                setBool(true);
                console.log("uhd");
                
                if(result?.data?.body ){
                    console.log("Check this");
                    console.log(result.data.body);
                    props.setUser(result.data.body);
                }
                console.log("Res",result);
				
			} else {
				console.log(authResult);
				throw new Error(authResult);
			}
		} catch (e) {
            console.log("Error:", e);
    
            // Handle AxiosError to extract error message
            if (e.response) {
                // This is where you get the error message from the backend response
                const errorMessage = e.response.data?.message || 'An unknown error occurred';
                console.log("Backend error:", errorMessage);
    
                // Display the error message to the user (e.g., using a state or a toast notification)
                alert(errorMessage);  
            } else {
                console.error("Unknown error:", e.message);
                alert("An error occurred during the Google authentication process.");
            }
        }
	};

	const googleLogin = useGoogleLogin({
		onSuccess: responseGoogle,
		onError: responseGoogle,
		flow: "auth-code",
	});

	return (
		<button
			style={{
				padding: "10px 20px",
			}}
			onClick={googleLogin}
		>
			{bool ? "Change Google Id" : "Sign in with Google"}
		</button>
	);
};