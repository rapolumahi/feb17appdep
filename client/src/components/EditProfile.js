import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function EditProfile() {
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
    let storeObj=useSelector((store)=>{
        return store;
    
      });
      console.log(storeObj);
      useEffect(()=>{
        firstNameInputRef.current.value=storeObj.userDetails.data.firstname;
        lastNameInputRef.current.value=storeObj.userDetails.data.lastname;
        ageNumberRef.current.value=storeObj.userDetails.data.age;
        genderRadioRef.current.value=storeObj.userDetails.data.gender;        
        phonenumberNumberRef.current.value=storeObj.userDetails.data.phonenumber;
        passwordInputRef.current.value=storeObj.userDetails.data.password;
        setprofilepic(`http://localhost:4343/${storeObj.userDetails.data.profilepic }`)
 
      

      },[])

    let updateDataToServer=async()=>{
        let dataToSend=new FormData();
        dataToSend.append("fn",firstNameInputRef.current.value);
        dataToSend.append("ln",lastNameInputRef.current.value);
        dataToSend.append("email",storeObj.userDetails.data.email);
        dataToSend.append("age",ageNumberRef.current.value);
        dataToSend.append("gender",gender);
        dataToSend.append("phonenumber",phonenumberNumberRef.current.value);
        dataToSend.append("password",passwordInputRef.current.value);
        for(let i=0;i<profilepicFileRef.current.files.length;i++){
            dataToSend.append("profilepic",profilepicFileRef.current.files[i]);
        }
        let reqOption={
            method:"PATCH",
            body:dataToSend
        }
        let JSONData= await fetch("http://localhost:4343/update",reqOption);
        let JSOData=await JSONData.json();
        console.log(JSOData);
      if(JSOData.status=="success"){
        alert(JSOData.msg);
        navigate("/");
      }else{
        alert(JSOData.msg);

      }
    }
  return (
    <div>
        <form>
            <p>EDIT PROFILE</p>
            <div>
                <label>FirstName :</label>
                <input ref={firstNameInputRef}
            
                ></input>
                <p ref={firstNameParaRef}></p>
            </div>
            <div>
                <label>LastName :</label>
                <input ref={lastNameInputRef}></input>
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
              updateDataToServer();
                }}
                >UPDATE</button>
            </div>
        </form>
    </div>
  )
}

export default EditProfile
