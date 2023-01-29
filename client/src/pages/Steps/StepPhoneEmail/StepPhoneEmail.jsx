import { useState } from "react";
import Phone from "./Phone/Phone";
import Email from "./Email/Email";
import styles from "./StepPhoneEmail.module.css";

const phoneEmailMap = {
  phone: Phone,
  email: Email,
};

const StepPhoneEmail = ({ onNext }) => {
  const [type, setType] = useState("phone");
  const Component = phoneEmailMap[type];

  // function onNext() {}

  return (
    <div>
      <div className={styles.cardWrapper}>
        <div>
        <div className={styles.buttonWrapper}>
          <button className={`${type === 'phone' ? styles.active : styles.logoButton}`} onClick={() => setType("phone")}>
          <img src="/asset/phoneIcon.png" alt="" />
          </button>
          <button className={`${type === 'email' ? styles.active : styles.logoButton}`} onClick={() => setType("email")}>
          <img src="/asset/emailIcon.png" alt="" />
          </button>
        </div>
        <Component onNext={onNext} />
        </div>
      </div>
    </div>
  );
};

export default StepPhoneEmail;
