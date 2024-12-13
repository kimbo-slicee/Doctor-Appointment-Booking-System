import paypal from '@paypal/checkout-server-sdk';
import axios from "axios";

// Set up the PayPal environment
const environment = new paypal.core.SandboxEnvironment(
    process.env.PAYPAL_CLIENT_ID,
    process.env.PAYPAL_CLIENT_SECRET
);
const client = new paypal.core.PayPalHttpClient(environment);
// Generate new Paypal Token
const  getAccessToken= async ()=> {
    const response = await axios.post(
        'https://api-m.sandbox.paypal.com/v1/oauth2/token',
        'grant_type=client_credentials',
        {
            auth: {
                username: process.env.PAYPAL_CLIENT_ID,
                password: process.env.PAYPAL_CLIENT_SECRET,
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }
    );
    return response.data.access_token;
}
export { client,getAccessToken };