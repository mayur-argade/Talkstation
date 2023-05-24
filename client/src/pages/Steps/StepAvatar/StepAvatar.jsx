import React from "react";
import Card from "../../../components/shared/Card/Card";
import Button from "../../../components/shared/Button/Button";
import styles from "./StepAvatar.module.css";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAvatar } from "../../../store/activateSlice";
import { setAuth } from "../../../store/authSlice";
import { activate } from "../../../http";
import { useNavigate } from "react-router-dom";
import Loader from "../../../components/shared/Loader/Loader";

const StepAvatar = ({}) => {
  const [image, setImage] = useState("/asset/zoro.jpg");

  const { name, avatar } = useSelector((state) => state.activate);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  function captureImage(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
      setImage(reader.result);
      console.log(reader.result);
      dispatch(setAvatar(reader.result));
    };
  }
const [loading, setLoading] = useState(false)
  async function submit() {
    setLoading(true)
    try {
      const { data } = await activate({ name, avatar });
      if (data.auth) {
        dispatch(setAuth(data));
        navigate("/rooms");
      }
      // setLoading(true)
    } catch (error) {
      // setLoading(true)
      console.log(error);
    }
    finally{
      setLoading(false)
    }
  }
if(loading) return <Loader message={"please wait"}/>
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
          <Button lable="Next" onClick={submit}></Button>
        </div>
      </Card>
    </div>
  );
};

export default StepAvatar;
