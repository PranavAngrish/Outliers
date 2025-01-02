
import {google} from 'googleapis';
import {OAuth2Client} from 'google-auth-library';
import dotenv from "dotenv";

dotenv.config();
/**
 * To use OAuth2 authentication, we need access to a CLIENT_ID, CLIENT_SECRET, AND REDIRECT_URI
 * from the client_secret.json file. To get these credentials for your application, visit
 * https://console.cloud.google.com/apis/credentials.
 */
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;


export const oauth2Client = new OAuth2Client(
    GOOGLE_CLIENT_ID, //GOOGLE_CLIENT_ID
    GOOGLE_CLIENT_SECRET,  //
    'postmessage'
);
