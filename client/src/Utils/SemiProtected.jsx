import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const isAuth = false;
const user = {
activated : false
}
const SemiProtected = (props) => {
  const { Component } = props;

  const navigate = useNavigate();

  useEffect(() => {
    function checkLogin(){
        if (isAuth !== true){ 
            navigate("/")
        }if(isAuth===true && user.activated!==true){
            navigate("/activate")
        }
        
    }
    checkLogin();
  }, [navigate]);

  return (
    <div>
      <Component />
    </div>
  );
};

export default SemiProtected;
