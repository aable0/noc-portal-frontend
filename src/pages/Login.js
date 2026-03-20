import { Layout } from "../components/Home/Layout";
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

export const Login = () => {
    const handleLogin = async credentialResponse => {
        const data = await axios.post(`${process.env.REACT_APP_SERVER_IP}/api/v1/auth/google`, { token: credentialResponse.credential }, { withCredentials: true })
        if (data.data.error) return
        else return window.location.href = "/profile";
    };

    return(
        <Layout>
            <div className=" grid place-items-center space-y-8 h-screen">
                <div className="flex flex-col items-center space-y-10">
                    <div className="text-4xl text-[#3b82f6]">Giriş Yap</div>
                    <GoogleLogin 
                        onSuccess={handleLogin}
                        onError={() => console.log('Login Failed')}
                    />
                    </div>
            </div>
        </Layout>
    );
}