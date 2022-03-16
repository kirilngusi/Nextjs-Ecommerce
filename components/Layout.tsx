import React from 'react'
import Navbar from './Navbar';
type LayOutProps = {
    children?: JSX.Element;
};

const Layout = ({children}: LayOutProps) => {
  return (
    <div className="container">
        <Navbar/>
        {children}
    </div>
  )
}

export default Layout