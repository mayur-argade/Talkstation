import React from "react";
import Card from "../../../components/shared/Card/Card";
import Button from "../../../components/shared/Button/Button";
import styles from "./StepAvatar.module.css";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAvatar } from "../../../store/activateSlice";
import { activate } from "../../../http";

const StepAvatar = ({}) => {
  const [image, setImage] = useState("/asset/zoro.jpg");

  const { name, avatar } = useSelector((state) => state.activate);

  const dispatch = useDispatch();

  function captureImage(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
      setImage(reader.result);
      dispatch(setAvatar(reader.result));
    };
  }

  async function submit() {
    try {
      const { data } = await activate({ name, avatar });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={styles.cardWrapper}>
      <Card title={`okay ${name}!`} icon="face">
        <div className={styles.avatarWrapper}>
          <img src={image} alt="avatar" className={styles.avatar} />
        </div>
        <p className={styles.bottomPara}>How's this Photo</p>
        <div>
          <label htmlFor="avatar">Choose A different photo</label>
          <input
            onChange={captureImage}
            type="file"
            name="avatar"
            id="avatar"
            className={styles.inputfile}
          />
        </div>
        <div className={styles.actionButtonWrap}>
          <Button lable="Next"></Button>
        </div>
      </Card>
    </div>
  );
};

export default StepAvatar;
