import React , { useState }from 'react'
import axios from 'axios';
import { postData } from '../utils/request';

const Login= () => {

    const [loginForm, setLoginForm] = useState({
        username: "",
        password: "",
    });
    

    const onChangeRegisForm = (e:React.ChangeEvent<HTMLInputElement>) => {
        setLoginForm({ ...loginForm , [e.target.name] : e.target.value})
    }

    const {username, password} = loginForm;

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            
            const res = await postData("auth/login", loginForm);

            if(res.err) {
                console.log(res.err)
            }
            return res;
        }catch (e) {
            console.log(e);
        }
    };
  
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" value={username} name="username" onChange={onChangeRegisForm}/>
                <br />
                <input type="password" value={password} name="password" onChange={onChangeRegisForm}/>
                <br />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login;