import React from 'react'
import styles from './AddRoomModal.module.css'
import TextInput from '../shared/TextInput/TextInput'

const AddRoomModal = () => {
  return <div className={styles.modalMask}>
    <div className={styles.modalBody}>
        <div className={styles.modalHeader}>
            <h3>Enter the topic need to discuss</h3>
            <TextInput />
        </div>
        <div className={styles.modalFooter}></div>
    </div>
  </div>
  
}

export default AddRoomModal