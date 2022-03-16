import type { NextPage } from 'next'
import { useContext , useEffect } from 'react';

import {AuthContext} from '../contexts/AuthContext';

import { useRouter } from 'next/router';

import styles from '../styles/Home.module.css'

import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'

import { postData , getData } from "../utils/request";


const Home: NextPage = ({data}) => {

  // const router = useRouter();
  // const { authState , logOut}  = useContext(AuthContext);

  console.log(data)
 
  
  return (
    <div>
      <h1>Home</h1>
     
    </div>
  )
}

export default Home;


// export const getStaticProps: GetStaticProps = async context => {
//   // ...
// }

export const getServerSideProps: GetServerSideProps = async () => {

  const data = await getData("product");


  return { 
    props: { data }
  }
}