import styles from "../styles/Home.module.css";

function Home() {
  return (
    <>
      <Head>
        <title>HACKATWEET - Home</title>
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">HACKATWEET!</a>
        </h1>
      </main>
    </>
  );
}

export default Home;
