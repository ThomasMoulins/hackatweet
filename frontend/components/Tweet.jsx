import styles from "../styles/Tweet.module.css";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";

{
  /* <Tweet
  firstname="John"
  username="Doe"
  text="Ici c'est ici !"
  likenumber={5}
  date={new Date()}
/>; */
}

function Tweet({ firstname, username, text, likenumber, date }) {
  const time = null;

  return (
    <div className={styles.tweetContainer}>
      <div className={styles.tweetUser}>
        <Image
          src="/images/oeuf.png"
          alt="user icon"
          className={styles.icon}
          width={40}
          height={40}
        />
        <p>
          {firstname} <span>@{username} - a few seconds</span>
        </p>
      </div>
      <p>{text}</p>
      <div className={styles.iconContainer}>
        <FontAwesomeIcon icon={faHeart} />
        <span style={{ margin: "0 30px 0 10px" }}>{likenumber}</span>
        <FontAwesomeIcon icon={faTrash} />
      </div>
    </div>
  );
}

export default Tweet;
