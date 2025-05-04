import styles from "../styles/Tweet.module.css";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";

const renderTextWithHashtags = (text) => {
  //  split pour conserver #tag dans les éléments
  const parts = text.split(/(#[\p{L}\p{N}_]+)/gu);

  return parts.map((part, i) => {
    // si hashtag
    if (/^#[\p{L}\p{N}_]+$/u.test(part)) {
      const tag = part.slice(1); // enleve le '#'
      return (
        <Link
          key={i}
          href={`/hashtag/${encodeURIComponent(tag)}`}
          legacyBehavior
        >
          <a className={styles.hashtag}>{part}</a>
        </Link>
      );
    }
    // sinon texte normal
    return part;
  });
};

function Tweet({ id, firstname, username, text, like, date, onDelete }) {
  const user = useSelector((state) => state.user.value);
  const time = null;

  const handleDelete = () => {
    fetch(`http://localhost:3000/tweets/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: user.token,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        data.result
          ? onDelete?.(id)
          : console.error("Erreur lors de la suppression du tweet");
      });
  };

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
          {firstname}{" "}
          <span className={styles.username}>@{username} · a few seconds</span>
        </p>
      </div>
      <p className={styles.tweetText}>{renderTextWithHashtags(text)}</p>
      <div className={styles.iconContainer}>
        <FontAwesomeIcon icon={faHeart} />
        <span style={{ margin: "0 30px 0 10px" }}>{like}</span>
        {firstname === user.firstname && username === user.username && (
          <FontAwesomeIcon
            icon={faTrash}
            className={styles.deleteIcon}
            onClick={handleDelete}
          />
        )}
      </div>
    </div>
  );
}

export default Tweet;
