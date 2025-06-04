import React, { useEffect } from 'react'
import { auth } from '../../services/firebase'
import { useNavigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
    const navigate = useNavigate();
    
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) { 
                navigate('/');
            } 
            // else {
                // navigate('/auth/register');
            // }
        });

        return () => unsubscribe();
    } , [auth]);

  return (
    <>
        <Outlet />
    </>
  )
}

export default AuthLayout