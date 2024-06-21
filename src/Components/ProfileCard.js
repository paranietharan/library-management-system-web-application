import React from "react";
import styles from "./ProfileCard.module.css"; // Import module CSS

function ProfileCard(props) {
	return (
		<div className={styles["card-container"]}>
			<div
				className={styles.profileheader}
				style={{ backgroundImage: `url(${props.wallpaper})` }}
			>
				<img src={props.avatar} alt={props.name} className={styles.profileImage} />
			</div>
			<h1 className={styles["bold-text"]}>
				{props.name}
			</h1>
			<h2 className={styles["normal-text"]}>{props.class}</h2>
			<div className={styles["about-container"]}>
				<p>{props.about}</p>
			</div>
		</div>
	);
}

export default ProfileCard;