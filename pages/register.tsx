import React , { useState }from 'react'

import register from './api/auth/register';

const Register= () => {

    const [username, setUsername ] = useState<string>("");
    const [password, setPassword ] = useState<string>("");



    const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
    const data = [username, password];

            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
              }).then((e) => e.json());

            console.log(username);
            console.log(password)
            console.log(res);
        }catch (e) {
            console.log(e);
        }
    };
  
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" value={username} name="Username" onChange={(e) => setUsername(e.target.value)}/>
                <br />
                <input type="password" value={password} name="Password" onChange={(e) => setPassword(e.target.value)}/>
                <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default Register;