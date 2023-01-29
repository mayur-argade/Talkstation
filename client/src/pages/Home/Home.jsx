import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/shared/Button/Button";
import Card from "../../components/shared/Card/Card";
import styles from "./Home.module.css";


const Home = () => {
  const signInStyle = {
    color: "#1d4ed8",
    fontWeight: "bold",
  };

  const navigate = useNavigate();

  function startRegister() {
    navigate('/authenticate');
  }

  return (
    <div className={styles.cardWrapper}>
      <Card title="Welcome to Internet" icon="hand">
        <p className={styles.text}>
          We're working hard to get internet ready for everyone! While we wrap
          up the finishing touches, we're adding people gradually to make sure
          nothing breaks
        </p>
        <div>
          <Button onClick={startRegister} lable="Let's go"></Button>
        </div>
        <div className={styles.signinWrapper}>
          <span className={styles.hasInvite}>Have an invite text? </span>
        </div>
      </Card>
    </div>
  );
};

export default Home;
