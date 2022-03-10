import React , { useState }from 'react'
import axios from 'axios';
import { postData } from '../utils/request';

const Register= () => {

    const [registerForm, setRegisterForm] = useState({
        username: "",
        password: "",
    });
    

    const onChangeRegisForm = (e:React.ChangeEvent<HTMLInputElement>) => {
        setRegisterForm({ ...registerForm , [e.target.name] : e.target.value})
    }

    const {username, password} = registerForm;

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            
            const res = await postData("auth/register", registerForm);

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
                <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default Register;