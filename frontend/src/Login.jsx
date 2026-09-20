import React from 'react'
import { useGoogleLogin } from '@react-oauth/google'

function Login() {

    const responseGoogle= async (authResult)=>{
        try{
           if(authResult['code']){
            
           }
        }catch(err){
            console.log("Some issue while loging in with google",err)
        }
    }

  const loginHandler = useGoogleLogin({
    onSuccess:responseGoogle,
    onError:responseGoogle,
    flow:'auth-code'
  });

  return (
    <div>
      <button onClick={loginHandler}>Login with Google</button>
    </div>
  )
}

export default Login
