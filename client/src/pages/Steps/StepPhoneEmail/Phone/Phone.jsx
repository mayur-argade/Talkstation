import React, { useState } from 'react'
import Card from '../../../../components/shared/Card/Card'
import Button from '../../../../components/shared/Button/Button'
import TextInput from '../../../../components/shared/TextInput/TextInput'
import styles from '../StepPhoneEmail.module.css'

const Phone = ({onNext}) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  return (
      <Card title="Enter your Phone Number" icon="phone2">
        <div>
          <TextInput value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}/>
        </div>
        <div className={styles.actionButtonWrap}>
        <Button lable="Next" onClick={onNext}></Button>
        </div>
        <p className={styles.bottomPara}>
          By entering your number, you're agreeing to our Terms of Service and Privacy Policy. Thanks ! 
        </p>
      </Card>
  )
}

export default Phone