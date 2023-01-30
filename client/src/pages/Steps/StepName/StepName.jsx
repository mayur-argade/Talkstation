import React, { useState } from "react";
import Card from "../../../components/shared/Card/Card";
import Button from "../../../components/shared/Button/Button";
import styles from "./StepName.module.css";
import TextInput from "../../../components/shared/TextInput/TextInput";
import { useSelector, useDispatch } from "react-redux";
import { setName } from "../../../store/activateSlice";

const StepName = ({ onNext }) => {
  const { name } = useSelector((state) => state.activate);

  const dispatch = useDispatch();

  const [fullname, setFullname] = useState(name);

  function nextStep() {
    if (!fullname) {
      return alert("Name is mandatory");
    }
    dispatch(setName(fullname));
    onNext();
  }

  return (
    <div className={styles.cardWrapper}>
      <Card title="What is your Name" icon="hand">
        <div>
          <TextInput
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />
        </div>
        <p className={styles.bottomPara}>
          People use Real names at Talkstation
        </p>
        <div className={styles.actionButtonWrap}>
          <Button lable="Next" onClick={nextStep}></Button>
        </div>
      </Card>
    </div>
  );
};

export default StepName;
