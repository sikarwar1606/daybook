import React from 'react'
import { useGoogleLogin } from '@react-oauth/google'
import { useFinance } from "../src/context/FinanceContext";
import Loader from "./Loader.jsx"

function Login() {
  const { income, expenses, loading } = useFinance();
  const {loader, setLoader}=useState(false);

  

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
      <Loader />
      <button onClick={loginHandler}>Login with Google</button>
    </div>
  )
}

export default Login
