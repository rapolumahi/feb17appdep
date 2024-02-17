
import React, { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  let emailInputRef=useRef();
  let passwordInputRef=useRef();
  let dispatch=useDispatch();
  let navigate=useNavigate();
  useEffect(()=>{
  validateTokenCredential();
   
  },[])
  let validateLoginCredential=async()=>{
    let dataToSend=new FormData();
    dataToSend.append("email",emailInputRef.current.value);
    dataToSend.append("password",passwordInputRef.current.value);
    let reqOption={
      method:"POST",
      body:dataToSend
  }
    let JSONData=await fetch("http://localhost:4343/validateLogin",reqOption);
    let JSOData=await JSONData.json();
    console.log(JSOData);
    if(JSOData.status=="success"){
      localStorage.setItem("token",JSOData.token);
    dispatch({type:"loginform",data:JSOData});
      alert(JSOData.msg);
      navigate("/home");

    }else{
      alert(JSOData.msg);
    }

  }
  let validateTokenCredential=async()=>{
    let dataToSend=new FormData();
    dataToSend.append("token",localStorage.getItem("token"))
    let reqOption={
      method:"POST",
      body:dataToSend
    }
    let JSONData=await fetch("http://localhost:4343/validatetoken",reqOption);
    let JSOData=await JSONData.json();
    console.log(JSOData);

  }
  return (
    <div className='login-maindiv'> 
      <form>
        <p>LOGIN PAGE</p>
        <div>
          <label>Email :</label>
          <input ref={emailInputRef}></input>
        </div>
        <div>
          <label>Password :</label>
          <input ref={passwordInputRef}></input>
        </div>
        <div>
          <button  type='button'
          onClick={()=>{
            validateLoginCredential();
          }}
          >LOGIN</button>
        </div>
        <div>
          <Link  className="signup-link" to="/signup">SIGNUP</Link>
        </div>
      </form>
    </div>
  )
}

export default Login