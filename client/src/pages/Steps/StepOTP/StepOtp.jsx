import React, { useState } from 'react'
import Card from '../../../components/shared/Card/Card'
import Button from '../../../components/shared/Button/Button'
import TextInput from '../../../components/shared/TextInput/TextInput'
import styles from './StepOtp.module.css'

const StepOtp = () => {
  const [otp, setOtp] = useState('');

  return (
    <div className={styles.cardWrapper}>
      <Card title="Enter the OTP we just texted you" icon="lock">
        <div>
          <TextInput value={otp} onChange={(e) => setOtp(e.target.value)}/>
        </div>
        <p className={styles.bottomPara}>
        Didn’t receive? Tap to resend
        </p>
        <div className={styles.actionButtonWrap}>
        <Button lable="Next"></Button>
        </div>
        
      </Card>
    </div>
  )
}

export default StepOtp