import styles from "../styles/Tweet.module.css";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { setLiked } from "../reducers/user";

const renderTextWithHashtags = (text) => {
  //  split pour conserver #tag dans les éléments
  const parts = text.split(/(#[\p{L}\p{N}_]+)/gu);

  return parts.map((part, i) => {
    // si hashtag
    if (/^#[\p{L}\p{N}_]+$/u.test(part)) {
      const tag = part.slice(1); // enleve le '#'
      return (
        <Link key={i} href={`/hashtag/${encodeURIComponent(tag)}`}>
          <a className={styles.hashtag}>{part}</a>
        </Link>
      );
    }
    // sinon texte normal
    return part;
  });
};

const renderDate = (date) => {
  const sec = (Date.now().valueOf() - new Date(date).valueOf()) / 1000;
  if (sec < 60) return "a few seconds";
  if (sec / 60 < 60) return "a few minutes";
  const hours = Math.round(sec / 3600);
  return `${hours} hours`;
};

function Tweet({ id, firstname, username, text, like, date, onDelete }) {
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

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

  const handleLiked = () => {
    fetch("http://localhost:3000/users/liked", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: user.token,
        tweetId: id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        fetch("http://localhost:3000/tweets/liked", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            tweetId: id,
            number: user.likedTweets.some((e) => e === id) ? -1 : +1
          })
        })
        .then(() => onDelete?.(id))
        data.result
          ? dispatch(setLiked({ tweetId: id }))
          : console.error("Erreur lors de l'ajout/suppression en favoris");
      });
  };

  const setColor = () => {
    return user.likedTweets.some((e) => e === id) ? "red" : null;
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
          <span className={styles.username}>
            @{username} · {renderDate(date)}
          </span>
        </p>
      </div>
      <p className={styles.tweetText}>{renderTextWithHashtags(text)}</p>
      <div className={styles.iconContainer}>
        <FontAwesomeIcon
          icon={faHeart}
          onClick={handleLiked}
          style={{ color: setColor(), cursor: 'pointer' }}
        />
        <span style={{ margin: "0 30px 0 10px", color: setColor() }}>
          {like}
        </span>
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
