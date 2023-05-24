import React, { useState } from "react";
import Card from "../../../components/shared/Card/Card";
import Button from "../../../components/shared/Button/Button";
import TextInput from "../../../components/shared/TextInput/TextInput";
import styles from "./StepOtp.module.css";
import { verifyOtp } from "../../../http";
import { useSelector, useDispatch } from "react-redux";
import { setAuth } from "../../../store/authSlice";
import { useNavigate } from "react-router-dom";

const StepOtp = () => {
  const [otp, setOtp] = useState("");

  const {phone, hash} = useSelector((state) => state.auth.otp)
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function submit() {
    if(!otp || !phone ||!hash){
      alert("provide otp")
    }
    try {
      const {data} = await verifyOtp({otp, phone, hash})
      console.log(data);
      dispatch(setAuth(data));
      navigate('/activate');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={styles.cardWrapper}>
      <Card title="Enter the OTP we just texted you" icon="lock">
        <div>
          <TextInput value={otp} onChange={(e) => setOtp(e.target.value)} />
        </div>
        <p className={styles.bottomPara}>Didn’t receive? Tap to resend</p>
        <div className={styles.actionButtonWrap}>
          <Button lable="Next" onClick={submit}></Button>
        </div>
      </Card>
    </div>
  );
};

export default StepOtp;
