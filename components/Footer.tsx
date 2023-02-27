import React from 'react'

const yearNow = new Date();

const Footer = () => {
  return (
    <div className="p-3 text-white text-center w-100" style={{backgroundColor: "rgb(0,0,0)" , zIndex: "1"}}>
        copyright©<span>{yearNow.getFullYear()}</span>
    </div>
  )
}

export default Footer