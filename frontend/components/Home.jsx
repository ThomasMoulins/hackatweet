import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/user";
import LastTweets from "./LastTweets";

function Home() {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const [hashtags, setHashtags] = useState([]);
  const [newTweet, setNewTweet] = useState("");
  const [refreshTweets, setRefreshTweets] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  const handleTweet = () => {
    fetch("http://localhost:3000/tweets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: newTweet,
        username: user.username,
      }),
    }).then(() => {
      setNewTweet("");
      setRefreshTweets(!refreshTweets);
      fetchHashtags();
    });
  };

  return (
    <>
      <Head>
        <title>HACKATWEET - Home</title>
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
                    <span>{newTweet.length}/280</span>
                    <button
                      onClick={handleTweet}
                      className={styles.tweetButton}
                    >
                      Tweet
                    </button>
                  </div>
                </div>
          </div>
              <LastTweets refresh={refreshTweets} />
            </>
        </div>
        <div className={styles.right}>
        <h1>Trend</h1>
        </div>
      </main>
    </>
  );
}

export default Home;
