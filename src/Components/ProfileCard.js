import React from "react";
import styles from "./ProfileCard.module.css";
import Avatar from '@mui/material/Avatar';

function ProfileCard({ authorDetails }) {
  return (
    <div className={styles["card-container"]}>
      <div
        className={styles.profileheader}
        style={{ backgroundImage: `url(${authorDetails.wallpaper || 'default_wallpaper_url'})` }}
      >
        <img
          src={authorDetails.profileImg ? `data:image/png;base64,${authorDetails.profileImg}` : 'https://www.w3schools.com/howto/img_avatar.png'}
          alt={`${authorDetails.firstName} ${authorDetails.lastName}`}
          className={styles.profileImage}
        />
      </div>
      <h1 className={styles["bold-text"]}>
        {`${authorDetails.firstName} ${authorDetails.lastName}`}
      </h1>
      <h2 className={styles["normal-text"]}>{authorDetails.role}</h2>
      {/* <div className={styles["about-container"]}>
        <p>Role : {authorDetails.role}</p>
      </div> */}
    </div>
  );
}

export default ProfileCard;