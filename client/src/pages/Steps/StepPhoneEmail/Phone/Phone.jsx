import React, { useState } from "react";
import Card from "../../../../components/shared/Card/Card";
import Button from "../../../../components/shared/Button/Button";
import TextInput from "../../../../components/shared/TextInput/TextInput";
import styles from "../StepPhoneEmail.module.css";
import {sendOtp} from '../../../../http/index'
import {useDispatch} from 'react-redux'
import { setOtp } from "../../../../store/authSlice";



const Phone = ({ onNext }) => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const dispatch = useDispatch();


  async function submit (){
    if(!phoneNumber){
      alert("provide phone no.")
    }
    const res = await sendOtp({phone: phoneNumber});
    console.log(res.data);
    dispatch(setOtp({phone: res.data.phone, hash: res.data.hash}));
    onNext();
  }
  return (
    <Card title="Enter your Phone Number" icon="phone2">
      <div>
        <TextInput
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>
      <div className={styles.actionButtonWrap}>
        <Button lable="Next" onClick={submit}></Button>
      </div>
      <p className={styles.bottomPara}>
        By entering your number, you're agreeing to our Terms of Service and
        Privacy Policy. Thanks !
      </p>
    </Card>
  );
};

export default Phone;
