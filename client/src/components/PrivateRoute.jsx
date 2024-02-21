import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet,Navigate } from 'react-router-dom'

export default function PrivateRoute() {
    const {currrentUser} =useSelector((state)=>state.user)

  return currrentUser ? <Outlet/> : <Navigate to='/signin'/>   //Purpose: The <Outlet> component is used to render the child routes of the current route. 
                                                               //It acts as a placeholder for the content of nested routes.         
                                                              //if current user exit then only shouw child elemnt elase redirectr to signin page 
}
