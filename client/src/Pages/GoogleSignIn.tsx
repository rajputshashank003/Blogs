import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from "axios";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { backend } from '../utils/backend';
import { Input } from '../components/Input';
import Button from '../components/Button';

const GoogleSignIn = () => {

    const clientId = import.meta.env.VITE_GOOGLE_SIGNIN_ID;
    const navigate = useNavigate();
    const [waiting , setWaiting] = useState<boolean>(false);
    const [email , setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleSuccess = async (credentialResponse : any) => {
        setWaiting(true);
        try {
            const res : any = await axios.post(backend + "/api/user/signin", {token : credentialResponse}) 
            console.log(res);
            localStorage.setItem("token" , res.data.token);
            localStorage.setItem("isAdmin" , res.data.isAdmin);
            navigate("/");
        } catch (err : any) {
            console.log("err", err);
        }
        setWaiting(false);
    }
    const handleError = () => {
        setWaiting(false);
    }
    const adminLogin = async () => {
        setWaiting(true);
        try {
            const res : any = await axios.post(backend + "/api/user/admin/signin", {email , password}) 
            console.log(res);
            localStorage.setItem("token" , res.data.token);
            localStorage.setItem("isAdmin" , res.data.isAdmin);
            navigate("/");
        } catch (err : any) {
            console.log("err", err);
        }
        setWaiting(false);
    }

    useEffect(() => {
        if(localStorage.getItem("token")) {
            navigate("/");
        }
    } , []);

    return (
        <div className='h-full flex flex-col justify-center items-center'>
            <GoogleOAuthProvider clientId={clientId} >
                {
                    waiting ?
                    <div className='text-4xl ' >
                        Loading...
                    </div>
                    :
                    <GoogleLogin
                        onSuccess={handleSuccess}
                        onError={handleError}
                    />
                }
            </GoogleOAuthProvider>
            <div className="or m-5 text-4xl font-bold">
                OR
            </div>
            <div className="relative flex flex-col gap-4">
                <Input  type='email' placeholder='email@gmail.com' value={email} onChange={(e) => setEmail(e.target.value)} />
                <Input 
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          adminLogin();
                        }
                    }}
                    type='password' 
                    placeholder='*****' 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                /> 
                {
                    waiting ?
                    <div className='text-4xl ' >
                        Loading...
                    </div>
                    :
                    <div onClick={adminLogin} className='cursor-pointer w-full justify-center items-center flex'>
                        <Button>
                            Submit
                        </Button>
                    </div>
                }
            </div>
        </div>
    )
}

export default GoogleSignIn