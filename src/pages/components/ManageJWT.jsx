'use client';

import { useState } from 'react';



export default function Home() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [useHttpCookie, setUseHttpCookie] = useState(false);

  const [tokens, setTokens] = useState(null);

  const [result, setResult] = useState('');


  const populateFields = () => {

    setEmail('admin@bimapay.com');
    setPassword('12345678');
  }


  const login = async () => {

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, useHttpCookie })
    });

    const data = await res.json();
    setResult(JSON.stringify(data));
  }


  const accessProtected = async () => {

    const res = await fetch('/api/auth/protected');
    const data = await res.json();

    setResult(JSON.stringify(data));
  }


  const refresh = async () => {

    const res = await fetch('/api/auth/refresh');
    const data = await res.json();

    setResult(JSON.stringify(data));
  }


  const attacks = () => {

    const xssAttack = () => {

      const cookies = document.cookie.split('; ').join('\n\n') || "";

      if (cookies) {

        const accessToken = cookies.match(/token=([^;\n]+)/)?.[1] || null;
        const refreshToken = cookies.match(/refresh_token=([^;\n]+)/)?.[1] || null;
        
        if (accessToken || refreshToken) {
          setTokens({ accessToken, refreshToken });
        }
      }
      
      setResult(cookies || 'No cookies found.');
    }

    const xhrAttack = async () => {

      const res = await fetch('/api/auth/protected', {
        headers: {
          Cookie: 'token=...'
        }
      });

      if (!res.ok) {
        setResult('Failed to access protected route');
        return;
      }

      const data = await res.json();
      setResult(JSON.stringify(data)); 
    }

    return { xssAttack, xhrAttack };
  }

  const { xssAttack, xhrAttack } = attacks();


  const resetAll = () => {

    const clearCookies = async () => {

      if (document.cookie) {

        document.cookie.split(";").forEach(cookie => {
          const name = cookie.split("=")[0].trim();
          document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
        });
      }
      else {
        await fetch('/api/auth/logout');
      }
    }

    clearCookies();

    setEmail('');
    setPassword('');
    setUseHttpCookie(false);
    setTokens(null);

    setResult('Reset Successfully.');
  }


  return (
    <div className="homepage flex flex-col items-center justify-center gap-16 min-h-screen p-4">

      <h1 className="heading text-center text-3xl sm:text-4xl md:text-5xl ">
        JWT Mechanism
      </h1>

      <form className="auth-form flex flex-col items-center justify-center gap-5">
        <input
          className="email-input px-3 py-2 border rounded bg-transparent"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          className="password-input px-3 py-2 border rounded bg-transparent"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
        />
      </form>
      
      <div className="actions-btns-groups flex flex-col flex-wrap justify-around gap-5">
        <div className="group-1 flex flex-wrap justify-evenly gap-5 ">
          <button
            className="populate-btn w-[14rem] border px-5 py-1 rounded hover:cursor-pointer"
            onClick={populateFields}
          >
            Populate Fields
          </button>
          <button
            className="login-btn w-[14rem] border px-5 py-1 rounded hover:cursor-pointer"
            onClick={login}
          >
            Login
          </button>
        </div>

        <div className="group-2 flex flex-wrap justify-evenly gap-5">
          <button
            className="get-protected-btn w-[14rem] border px-5 py-1 rounded hover:cursor-pointer" onClick={accessProtected}
          >
            Access Protected
          </button>
          <button
            className="refresh-btn w-[14rem] border px-5 py-1 rounded hover:cursor-pointer"
            onClick={refresh}
          >
            Refresh Token
          </button>
        </div>

        <div className="group-3 flex flex-wrap justify-evenly gap-5">
          <label className="http-cookie-toggle-label w-[14rem] flex items-center gap-3 border px-5 py-1 rounded select-none hover:cursor-pointer">
            <input
              id="http-cookie-toggle"
              className="http-cookie-toggle-btn size-4 border px-5 py-1 rounded hover:cursor-pointer accent-black"
              type="checkbox"
              checked={useHttpCookie}
              onChange={() => setUseHttpCookie(!useHttpCookie)}
            />
            Enable HTTP Cookie
          </label>
          <button
            className={`${!tokens?.accessToken ? "XSS" : "XHR"}-attack-btn w-[14rem] border px-5 py-1 rounded hover:cursor-pointer`}
            onClick={!tokens?.accessToken ? xssAttack : xhrAttack}
          >
            {!tokens?.accessToken ? "Do XSS Attack" : "Do XHR Attack"} 
          </button>
        </div>
        <div className="group-4 flex flex-wrap justify-evenly gap-5">
          <button
            className="reset-all-btn w-[14rem] border px-5 py-1 rounded hover:cursor-pointer"
            onClick={resetAll}
          >
            Reset All
          </button>
        </div>
      </div>

      <pre className='result w-full max-w-[40rem] text-center whitespace-pre-wrap break-words px-5 py-3'>
        {result}
      </pre>
    </div>
  );
}
