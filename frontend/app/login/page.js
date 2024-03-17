import Login from '@/components/Login'
import Nav from '@/components/Nav'
import React from 'react'

const page = () => {
  return (
    <>
    <Nav/>
    <div className="w-full h-screen bg-[rgb(153, 157, 158)] text-white" style={{backgroundColor:"rgb(153, 157, 158)"}}>
        <Login/>
    </div>
    </>
  )
}

export default page