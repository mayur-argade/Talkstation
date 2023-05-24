import React from 'react'
import {Link} from 'react-router-dom'
import styles from './Navigation.module.css'
import { logout } from '../../../http'
import { useDispatch, useSelector } from 'react-redux'
import { setAuth } from '../../../store/authSlice'
import { useNavigate } from "react-router-dom";
const Navigation = () => {
  const logostyle = {
    textDecoration: 'none',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center'
  }

  const logotext = {
    marginLeft: '10px',
    fontSize: '20px'
  }

  const logoimg = {
    width: '35px',
  }

const dispatch = useDispatch();
const {isAuth, user} = useSelector((state)=> state.auth)
const navigate = useNavigate();
  async function logoutUser (){
   try{
    const {data} = await logout();
    dispatch(setAuth(data));
    navigate("/");
   }catch(err){
    console.log(err);
   }
  }

  return (
  <nav className={`${styles.navbar} container`}>
    <Link to='/' style={logostyle}>
    <img style={logoimg} src="/asset/hand.png" alt="logo" />
    <span style={logotext}>Internet</span>
    </Link>

    <div>
    <span className={styles.username}>{user.name}</span>
    
    {isAuth && <button onClick={logoutUser}> logout </button>}
    </div>
  </nav>
  )
}

export default Navigation