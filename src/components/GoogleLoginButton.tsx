import { GoogleLogin } from '@react-oauth/google';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkToken } from '../server/app';

const GoogleLoginButton = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');

    const onSuccess = async (googleResponse:any) => {
        const token = googleResponse.credential;
        
        try {
            const data = await sendToken(token);
            if (data.email) {
                setEmail(data.email);
                navigate('/users');
            }
        } catch (err) {
            console.log('Error during token verification:', err);
        }
    };

    const sendToken = async (token:string) => {
        try {
            const response = await checkToken(token);
            return response;
        } catch (err) {
            console.log(err);
            throw err;
        }
    };

    const onError = () => {
        console.log('Login Failed');
    };

    return (
        <div className="flex justify-center mt-6 w-full">
            <div className="w-full max-w-xs">
                <GoogleLogin 
                    onSuccess={onSuccess}
                    onError={onError}
                />
            </div>
        </div>
    );
};
export default GoogleLoginButton;
