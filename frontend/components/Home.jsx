import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/user";
import LastTweets from "./LastTweets";
import Trends from "./Trends";

function Home({ hashtag }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const [hashtags, setHashtags] = useState([]);
  const [newTweet, setNewTweet] = useState("");
  const [refreshTweets, setRefreshTweets] = useState(false);

  useEffect(() => {
    fetch("https://hackatweet-kappa.vercel.app/tweets/hashtags")
      .then((response) => response.json())
      .then((data) => {
        data.result && setHashtags(data.hashtags);
      });
  }, [refreshTweets]);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  const handleTweet = () => {
    fetch("https://hackatweet-kappa.vercel.app/tweets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: newTweet,
        username: user.username,
      }),
    }).then(() => {
      setNewTweet("");
      setRefreshTweets(!refreshTweets);
    });
  };

  return (
    <>
      <Head>
        {hashtag ? (
          <title>HACKATWEET - Hashtag</title>
        ) : (
          <title>HACKATWEET - Home</title>
        )}
      </Head>
      <main className={styles.main}>
        <div className={styles.left}>
          <div className={styles.logo}>
            <Link href="/home">
              <a>
                <Image
                  src="/images/hackatweet-logo.png"
                  alt="hackatweet logo"
                  width={50}
                  height={40}
                />
              </a>
            </Link>
          </div>

          <div className={styles.bottom}>
            <div className={styles.utilisateur}>
              <Image
                src="/images/oeuf.png"
                alt="hackatweet logo"
                width={50}
                height={50}
                className={styles.oeuf}
              />
              <p className={styles.name}>
                {user.firstname}
                <br />
                <span className={styles.username}>@{user.username}</span>
              </p>
            </div>
            <button className={styles.logout} onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
        <div className={styles.center}>
          {hashtag ? (
            <Trends
              hashtag={hashtag}
              onChange={() => setRefreshTweets(!refreshTweets)}
            />
          ) : (
            <>
              <div className={styles.home}>
                <h1>Home</h1>
                <div className={styles.search}>
                  <textarea
                    className={styles.input}
                    placeholder="What's up?"
                    onChange={(e) =>
                      e.target.value.length <= 280 &&
                      setNewTweet(e.target.value)
                    }
                    value={newTweet}
                  />
                  <div>
                    <span>
                      {newTweet.length}
                      <span className={styles.tweetLength}>/</span>280
                    </span>
                    <button
                      onClick={handleTweet}
                      className={styles.tweetButton}
                    >
                      Tweet
                    </button>
                  </div>
                </div>
              </div>
              <LastTweets
                refresh={refreshTweets}
                onChange={() => setRefreshTweets(!refreshTweets)}
              />
            </>
          )}
        </div>
        <div className={styles.right}>
          <h1>Trends</h1>
          <div className={styles.hashtagsContainer}>
            {hashtags.map((data, i) => (
              <Link key={i} href={`/hashtag/${data.name}`}>
                <div className={styles.hashtagLink}>
                  <div className={styles.hashtagText}>#{data.name}</div>
                  <div className={styles.hashtagNumber}>
                    {data.count} Tweet{data.count > 1 && "s"}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

export default Home;
