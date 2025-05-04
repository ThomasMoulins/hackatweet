import styles from "../styles/Home.module.css";
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
  const [refreshTweets, setRefreshTweets] = useState(false);
    dispatch(logout());
    router.push("/");
  };

  return (
    <>
      <Head>
        <title>HACKATWEET - Home</title>
      </Head>
      <main className={styles.main}>
        <div className={styles.left}>
          <div className={styles.logo}>
            <Image
              src="/images/hackatweet-logo.png"
              alt="hackatweet logo"
              width={50}
              height={40}
            />
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
            <button className={styles.logout} onClick={retourLogin}>
              Logout
            </button>
          </div>
        </div>
            <>
        <div className={styles.home}>
          <h1>Home</h1>
          <div className={styles.search}>
            <input
              className={styles.text}
              type="text"
              placeholder="What's up?"
            />
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
