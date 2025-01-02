import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || '/api'

const API = axios.create({ baseURL: baseURL,
    withCredentials: true,
 }); 


 const token = localStorage.getItem('token');


export const googleSignIn = async ({
    name,
    email
}) => await API.post('/auth/google', {
    name,
    email
});


export const signUp = async (formData) => {
    try{
        console.log("We are going to the backend");
        const response = await API.post('/users/signUp',{formData});
        return response;

    }catch(error){
        console.error("API Error:", error.response || error.message);
        throw error; 
    }
    
}



export const adminSignUp = async (formData) => {
    try{
        console.log("We are going to the backend",formData);
        const response = await API.post('/admin/signUp',{formData});
        return response;

    }catch(error){
        console.error("API Error:", error.response || error.message);
        throw error; 
    }
}



export const signIn = async (formData) => {
    try {
      const response = await API.post('/users/login', formData); // API call
      console.log("We got the correct response");
      return response; // Ensure response is returned
    } catch (error) {
      console.error("API Error:", error.response || error.message);
      throw error; // Re-throw error for catch block
    }
  };



  export const adminSignIn = async (formData) => {
    try {
        console.log("Goin");
      const response = await API.post('/admin/login', formData); // API call
      console.log("We got the correct response");
      return response; // Ensure response is returned
    } catch (error) {
      console.error("API Error:", error.response || error.message);
      throw error; // Re-throw error for catch block
    }
  };



export const googleAuth = async (code) => {
    try{
        const response = await API.get(`/users/google?code=${code}`);
        return response;
    }catch(err){
        console.log("Oh no, ",err.message || err.response);
        throw err;
    }
}


export const adminGoogleAuth = async (code) => {
    try{
        console.log("We are going");
        const response = await API.get(`/admin/admingoogle?code=${code}`);
        return response;
    }catch(err){
        console.log("Oh no, ",err.message || err.response);
        throw err;
    }
}


export const getAllVendors = async () => {
    try{
        const response = await API.get('/admin/accepted',{
            headers: {
              Authorization: `Bearer ${token}`,
            },});
            console.log("the dat is",response.data.body);
        return response;
    }catch(error){
        throw error;
    }
}

export const getAllPendingVendors = async () => {
    try{
        const response = await API.get('/admin/pending',{
            headers: {
              Authorization: `Bearer ${token}`,
            },});
        return response;
    }catch(error){
        throw error;
    }
}

export const handlingApprove = async (id) => {
    try {
        console.log("/admin/accept/", id);
        const response = await API.put(`/admin/accept/${id}`,{}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    } catch (error) {
        console.error("Error during approval process:", error);
        throw error;  // Rethrow error after logging it for clarity
    }
}
