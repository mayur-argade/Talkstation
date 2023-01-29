import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const isAuth = false
const user = {
    activated: false
}

const Protected = (props) => {
  const { Component } = props;

  const navigate = useNavigate();

  useEffect(() => {
    function protectedRoute() {
      if (isAuth === false) {
        navigate("/");
      }else if (isAuth===true && user.activated==false) {
        navigate("/activate")
      }
    }

    protectedRoute();
  }, [navigate]);

  return <div>
    <Component />
  </div>;
};

export default Protected;
