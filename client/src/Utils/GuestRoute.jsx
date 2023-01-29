import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const isAuth = false

const GuestRoute = (props) => {
const {Component} = props;

const navigate = useNavigate();

useEffect(() => {
  function specialTreatment() {
    if(isAuth===true){
        navigate("/rooms")
    }
  }

  specialTreatment();
}, [navigate])


  return (
    <div>
        <Component />
    </div>
  )
}

export default GuestRoute