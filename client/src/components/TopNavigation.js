import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'

function TopNavigation() {
  let navigate=useNavigate();
  let storeObj = useSelector((store) => {
    return store;
  });
  console.log(storeObj);
  useEffect(()=>{
    if(storeObj &&
      storeObj.userDetails &&
      storeObj.userDetails.data &&
      storeObj.userDetails.data.firstname
      ){

    }else{
      navigate("/");
    }
  },[]);
  let deleteData=async()=>{
       let dataToSend=new FormData();
       dataToSend.append("email",storeObj.userDetails.data.email)
       let reqOption={
        method:"DELETE",
        body:dataToSend
       }
       let JSONData=await fetch("http://localhost:4343/delete",reqOption);
       let JSOData=await JSONData.json();
       console.log(JSOData);
       if(JSOData.status="success"){
        alert(JSOData.msg);
        navigate("/");

       }else{
        alert(JSOData.msg);

       }
  }
 
  return (
    <div >
        <nav className='top-navigation'>
            <button className='home-button'>HOME</button>
            <button className='edit-profile' onClick={()=>{
              navigate("/editprofile");
            }}>EDITPROFILE</button>
            <button className='delete-button'
            onClick={()=>{
              deleteData();
            }}
            >DELETE</button>
            <button className='logout-button'  onClick={()=>{
              navigate("/");

            }}
             >LOGOUT</button>
        </nav>
    </div>
  )
}

export default TopNavigation