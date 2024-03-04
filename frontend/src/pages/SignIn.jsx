import BottomWaring from './components/BottomWarning'
import Button from './components/Button'
import InputBox from './components/InputBox'
import Heading from './components/Heading'
import SubHeading from './components/SubHeading'
import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function SignIn(){
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    
    return <div className = "h-screen flex justify-center bg-slate-300">
        <div className = "flex flex-col justify-center">
            <div className = "rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label={"Sign In"}/>
                <SubHeading label = {"Enter your credentials to access you account"}/>
                <InputBox onChange = {
                    (e) => {setUserName(e.target.value);
                }} label = {"Email"} placeholder={"johndoe@xample.com"}/>
                <InputBox onChange = {
                    (e) => {setPassword(e.target.value);
                }} label = {"Password"} placeholder={"123456"}/>
                <div className='pt-4 mx-6'>
                    <Button onClick={async () => {
                        const response = await axios.post("http://localhost:3000/api/v1/user/signin",{
                            username,
                            password
                        });
                        localStorage.setItem("token",response.data.token);
                        navigate('/dashboard')
                    }} label = {"Sign In"}/>
                </div>
                <BottomWaring label = {"Don't have an account?"} buttonText={"Sign Up"} to = {'/signup'}/>
            </div>
        </div>
    </div>
}