import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState } from 'react';
import jwt from 'jsonwebtoken';

import connectDB from '../utils/connectDb';

const Home: NextPage = () => {

  connectDB();
  const [username , setUsername ] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  
  async function submitForm() {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username, password})
    }).then((e) => e.json());

    // return res;
    // console.log(res)
    const token = res.token;

    console.log(token)

    if(token) {
      const json = jwt.decode(token) as {[key: string]: string};
      // setMessage(`hello ${json.username}`)
      console.log(json)
    } else {
      setMessage("WRONG !");
    }
  }


  return (
    <div>
      <div>{message}</div>
      <form action="/api/login" method="post">
        <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
        <br /> 
        <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <br />
        <input type="button" value="Login" onClick={submitForm}/>
      </form>
    </div>
  )
}

export default Home
