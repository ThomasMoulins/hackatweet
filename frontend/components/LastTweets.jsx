import styles from "../styles/LastTweets.module.css";
import { useEffect, useState } from "react";
import Tweet from "./Tweet";

function LastTweets({ refresh, onChange, hashtag }) {
  const [tweetsData, setTweetsData] = useState([]);

  useEffect(() => {
    const fetchLink = hashtag
      ? `http://localhost:3000/tweets/hashtags/${hashtag}`
      : "http://localhost:3000/tweets";
    fetch(fetchLink)
      .then((response) => response.json())
      .then((data) => {
        data.result && setTweetsData(data.tweets);
      });
  }, [refresh, hashtag]);

  const tweets = tweetsData.map((data) => {
    const isLiked = true;

    return (
      <Tweet
        key={data._id}
        id={data._id}
        text={data.text}
        firstname={data.user.firstname}
        username={data.user.username}
        like={data.like}
        date={data.date}
        isLiked={isLiked}
        onDelete={() => onChange?.()}
      />
    );
  });

  return <div className={styles.tweetsContainer}>{tweets}</div>;
}

export default LastTweets;
