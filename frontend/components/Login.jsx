import styles from "../styles/Home.module.css";
import Head from "next/head";
import Image from "next/image";

function Login() {
  return (
    <>
      <Head>
        <title>HACKATWEET - Login</title>
      </Head>
      <main className={styles.main}>
        <Image
          src="/images/hackatweet-background.png"
          alt="hackatweet background"
          width={300}
          height={600}
        />
      </main>
    </>
  );
}

export default Login;
