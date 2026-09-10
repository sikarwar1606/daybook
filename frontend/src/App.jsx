import { useState, useEffect, useRef } from "react";
import Home from './component/Home/Home.jsx'

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
const GOOGLE_CLIENT_ID = import.meta.env.VITE_REACT_APP_GOOGLE_CLIENT_ID;

export default function App(){
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const buttonRef = useRef(null);

  async function handleGoogleresponse(response) {
    setError('');
    try{
      const res = await fetch(`${API_URL}/api/auth/google`,{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({credential:response.credential}),
      })
      const data = await res.json();
      if(!res.ok) throw new Error(data.error || 'Google sign-in failed');

      localStorage.setItem('token', data.token);
      setUser(data.user);
    }catch(err){
      setError(err.message);
    }
  }

  //-----On first load: check if we already have a valid session--------
  useEffect(()=>{
    const token = localStorage.getItem('token');
    if(!token){
      setLoading(false);
      return;
    }

    fetch(`${API_URL}/api/auth/me`,{
      headers:{Authorization: `Bearer ${token}`},
    })
    .then((res)=>{
      if(!res.ok) throw new Error('Session expired');
      return res.json();
    })
    .then((data)=>{
      setUser(data.user);
    })
    .catch(()=>{
      localStorage.removeItem('token');
    })
    .finally(()=> setLoading(false));
  },[]);

  // ----Load the Google script and render the button (only when logged out)-----
  useEffect(()=>{
    if(user || loading) return; //don't bother rendering the button yet
    function renderGoogleButton(){
      /* global google */      
      google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleGoogleresponse,
      });
      google.accounts.id.renderButton(buttonRef.current,{
        theme:'outline',
        size:'large',
      })      
    }

    // Load Google's script once
    if(window.google){
      renderGoogleButton();
    }else{
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.onload = renderGoogleButton;
      document.body.appendChild(script);
    }
  },[user, loading]);

  //----Called by Google after the user picks an account ----
  

  function handleLogout(){
    localStorage.removeItem('token');
    setUser(null);
    if(window.google){
      google.accounts.id.disableAutoSelect(); //so it doesn't auto-log back in
    }
  }

  if(loading) return <p style={{textAlign:'center', marginTop:40}}>Loading...</p>;

  // -----DASHBOARD (Protected view)-------------
  if (user) {
    return (
      <>
          <Home user={user} handleLogout={handleLogout}  />
      </>
    );
  }


  return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#156082] to-[#0d3b52] px-4">
    <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl p-8 text-center">
      {/* Logo */}
      <div className="w-14 h-14 rounded-2xl bg-[#156082] flex items-center justify-center mx-auto mb-4">
        <span className="text-white text-2xl font-bold">D</span>
      </div>

      <h2 className="text-2xl font-bold text-gray-900">Daybook</h2>
      <p className="text-sm text-gray-500 mt-1 mb-6">Sign in to manage your funds</p>

      {/* Google button */}
      <div ref={buttonRef} className="flex justify-center" />

      {/* Error */}
      {error && (
        <div className="mt-4 px-3 py-2 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-xs text-red-600">{error}</p>
        </div>
      )}

      {/* Footer */}
      <p className="mt-6 text-[11px] text-gray-400">
        By continuing, you agree to our Terms & Privacy Policy
      </p>
    </div>
  </div>
);   

}

const styles = {
  container: { maxWidth: 360, margin: '60px auto', fontFamily: 'sans-serif', textAlign: 'center' },
  avatar: { width: 64, height: 64, borderRadius: '50%', marginBottom: 10 },
  button: { padding: 10, fontSize: 14, cursor: 'pointer', marginTop: 12 },
};