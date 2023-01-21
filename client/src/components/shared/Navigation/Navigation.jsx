import React from 'react'
import {Link} from 'react-router-dom'
import styles from './Navigation.module.css'

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

  return (
  <nav className={`${styles.navbar} container`}>
    <Link to='/' style={logostyle}>
    <img style={logoimg} src="/asset/hand.png" alt="logo" />
    <span style={logotext}>Internet</span>
    </Link>
  </nav>
  )
}

export default Navigation