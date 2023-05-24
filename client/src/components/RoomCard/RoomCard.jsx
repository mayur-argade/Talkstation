import React from "react";
import styles from "./RoomCard.module.css";
const RoomCard = ({ room }) => {
  return (
    <div className={styles.card}>
      <h3 className={styles.topic}>{room.topic}</h3>
      <div className={styles.speakers}>
        <div className={styles.avatars}>
          {room.speakers.map((speaker) => (
            <img src={speaker.avatar} alt="" />
          ))}
        </div>
        <div className={styles.names}>
          {room.speakers.map((speaker) => (
            <div className={styles.nameWrapper}>
              <span>{speaker.name}</span>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.peoplecount}>
        <span>{room.totalPeople}</span>
      </div>
    </div>
  );
};

export default RoomCard;
