import React from 'react'
import Navbar from './Navbar';
import Notify from './Notify';
type LayOutProps = {
    children?: JSX.Element;
};

const Layout = ({children}: LayOutProps) => {
  return (
    <div className="container">
        <Navbar/>
        <Notify/>
        {children}
    </div>
  )
}

export default Layout