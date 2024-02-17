import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Signup() {
    let firstNameInputRef=useRef();
    let firstNameParaRef=useRef();
    let lastNameInputRef=useRef();
    let emailInputRef=useRef();
    let ageNumberRef=useRef();
    let genderRadioRef=useRef();
    let phonenumberNumberRef=useRef();
    let passwordInputRef=useRef();
    let profilepicFileRef=useRef();
    let[profilepic,setprofilepic]=useState("./images/dummy.png");
    let[gender,setGender]=useState();
    let navigate=useNavigate();
    // let validFirstName=(inputref,labelref)=>{
    //     const nameRegularExp=/^[a-zA-Z]+([' -][a-zA-Z]+)*$/;
    //     let result=nameRegularExp.test(inputref.current.value);
    //     if(result==true){
    //         labelref.current.innerHTML="valid Name";
    //         labelref.current.style.color="green";
    //     }else{
    //         labelref.current.innerHTML="Invalid Name";
    //         labelref.current.style.color="red";

    //     }

    // }
    let sendDataToServer=async()=>{
        let dataToSend=new FormData();
        dataToSend.append("fn",firstNameInputRef.current.value);
        dataToSend.append("ln",lastNameInputRef.current.value);
        dataToSend.append("email",emailInputRef.current.value);
        dataToSend.append("age",ageNumberRef.current.value);
        dataToSend.append("gender",gender);
        dataToSend.append("phonenumber",phonenumberNumberRef.current.value);
        dataToSend.append("password",passwordInputRef.current.value);
        for(let i=0;i<profilepicFileRef.current.files.length;i++){
            dataToSend.append("profilepic",profilepicFileRef.current.files[i]);
        }
        let reqOption={
            method:"POST",
            body:dataToSend
        }
        let JSONData= await fetch("/signup",reqOption);
        let JSOData=await JSONData.json();
        console.log(JSOData);
        if(JSOData.status=="incorrect"){
            alert(JSOData.msg);
        }else if(JSOData.status=="userlength"){
            alert(JSOData.msg);
        }else{
            if(JSOData.status=="success"){
                alert(JSOData.msg);
                navigate("/");
            }else{
                alert(JSOData.msg);
            }
        }
    }
  return (
    <div>
        <form>
            <p>SIGNUP PAGE</p>
            <div>
                <label>FirstName :</label>
                <input ref={firstNameInputRef}
                // onChange={()=>{
                //     validFirstName(firstNameInputRef,firstNameParaRef);
                // }}
                ></input>
                <p ref={firstNameParaRef}></p>
            </div>
            <div>
                <label>LastName :</label>
                <input ref={lastNameInputRef}></input>
            </div>
            <div>
                <label>Email :</label>
                <input ref={emailInputRef}></input>
            </div>
            <div>
                <label>Age :</label>
                <input ref={ageNumberRef}></input>
                
            </div>
            <div>
                <label ref={genderRadioRef}>Gender :</label>
                <input id='male' type='radio' name='radio'
                onChange={(e)=>{
                    console.log(e.target.checked);
                    setGender("Male");

                }}
                ></input>
                <label htmlFor='male' className='innerLabel'>MALE</label>
                <input type='radio' id='female' name='radio'
                onChange={(e)=>{
                    console.log(e.target.checked);
                    setGender("Female");


                }}
                ></input>
                <label htmlFor='female' className='innerLabel'>FEMALE</label>
            </div>
            <div>
                <label>PhoneNumber :</label>
                <input type='number' ref={phonenumberNumberRef}></input>
            </div>
            <div>
                <label>Password :</label>
                <input type='password' ref={passwordInputRef}></input>
            </div>
            <div>
                <label>ProfilePic :</label>
                <input type='file' ref={profilepicFileRef}
                onChange={()=>{
                    let searchUrl=URL.createObjectURL(profilepicFileRef.current.files[0]);
                    setprofilepic(searchUrl);
                }}
                ></input>
            </div>
            <img className='dummyImage'  src={profilepic}></img>
            <div>
                <button type='button'
                onClick={()=>{
                    sendDataToServer();
                }}
                >SIGN UP</button>
            </div>
        </form>
    </div>
  )
}

export default Signup