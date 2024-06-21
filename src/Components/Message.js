import React from "react";
import styles from "./style/Messsage.module.css"; // Import the CSS module

export const MessageLeft = (props) => {
  const message = props.message ? props.message : "no message";
  const timestamp = props.timestamp ? props.timestamp : "";
  const photoURL = props.photoURL ? props.photoURL : "dummy.js";
  const displayName = props.displayName ? props.displayName : "";
  return (
    <>
      <div className={styles.messageRow}>
        <div
          alt={displayName}
          className={styles.orange}
          style={{ backgroundImage: `url(${photoURL})` }}
        ></div>
        <div>
          <div className={styles.displayName}>{displayName}</div>
          <div className={styles.messageBlue}>
            <div>
              <p className={styles.messageContent}>{message}</p>
            </div>
            <div className={styles.messageTimeStampRight}>{timestamp}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export const MessageRight = (props) => {
  const message = props.message ? props.message : "no message";
  const timestamp = props.timestamp ? props.timestamp : "";
  return (
    <div className={styles.messageRowRight}>
      <div className={styles.messageOrange}>
        <p className={styles.messageContent}>{message}</p>
        <div className={styles.messageTimeStampRight}>{timestamp}</div>
      </div>
    </div>
  );
};
