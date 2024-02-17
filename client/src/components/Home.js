import React from "react";
import TopNavigation from "./TopNavigation";
import { useSelector } from "react-redux";

function Home() {
  let storeObj = useSelector((store) => {
    return store;
  });
  console.log(storeObj);
  return (
    <div className="main-div">
      <TopNavigation />

      {/* <h2>welcome to {storeObj.userDetails.data.firstname}</h2> */}
      <h2> welcome to {storeObj && storeObj.userDetails && storeObj.userDetails.data ? `${ storeObj.userDetails.data.firstname}`:"User"}</h2>
      <img className="home-image"
        src={`/${storeObj.userDetails.data.profilepic}`}
      ></img>
    </div>
  );
}

export default Home;
