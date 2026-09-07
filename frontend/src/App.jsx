import { useState, useEffect, useRef } from "react";
import Home from './Home.jsx'

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
const GOOGLE_CLIENT_ID = import.meta.env.VITE_REACT_APP_GOOGLE_CLIENT_ID;

export default function App(){
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const buttonRef = useRef(null);

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
          <Home user={user}  />
      </>
      // <div style={styles.container}>
      //   {user.avatarUrl && (
      //     <img src={user.avatarUrl} alt="avatar" style={styles.avatar} />
      //   )}
      //   <h2>Welcome, {user.username}</h2>
      //   <p>{user.email}</p>
      //   <button style={styles.button} onClick={handleLogout}>Logout</button>
      // </div>
    );
  }
 // ---------- LOGGED OUT VIEW ----------
  return (
    <div style={styles.container}>
      <h2>Sign in</h2>
      <div ref={buttonRef}></div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );

}

const styles = {
  container: { maxWidth: 360, margin: '60px auto', fontFamily: 'sans-serif', textAlign: 'center' },
  avatar: { width: 64, height: 64, borderRadius: '50%', marginBottom: 10 },
  button: { padding: 10, fontSize: 14, cursor: 'pointer', marginTop: 12 },
};