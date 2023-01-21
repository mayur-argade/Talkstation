import React from 'react'
import styles from './Button.module.css'

const Button = ({lable, onClick}) => {
  return <button onClick={onClick} className={styles.button}>
  <span className={styles.lable}>{lable}</span>
  <img src="/asset/arrow.png" alt="arrow" />
</button>
}

export default Button