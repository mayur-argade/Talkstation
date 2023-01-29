import React, { useState } from 'react'
import Card from '../../../../components/shared/Card/Card'
import Button from '../../../../components/shared/Button/Button'
import TextInput from '../../../../components/shared/TextInput/TextInput'
import styles from '../StepPhoneEmail.module.css'

const Email = ({onNext}) => {
  const [email, setEmail] = useState('');

  return (
    <Card title="Enter your Email ID" icon="email">
      <div>
          <TextInput value={email} onChange={(e) => setEmail(e.target.value)}/>
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

export default Email