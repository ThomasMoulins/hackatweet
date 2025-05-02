import styles from "../styles/Home.module.css";
import Head from "next/head";
import Image from "next/image";

function Home() {
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
                john
                <br />
                <span className={styles.username}>@JohnCena</span>
              </p>
            </div>
            <button className={styles.logout}>Logout</button>
          </div>
        </div>
      </main>
    </>
  );
}

export default Home;
