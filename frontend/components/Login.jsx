import styles from "../styles/Login.module.css";
import Head from "next/head";
import Image from "next/image";

function Login() {
  return (
    <>
      <Head>
        <title>HACKATWEET - Login</title>
      </Head>
      <main className={styles.main}>
        <div
          style={{
            position: "relative",
            width: "40%",
            height: "100vh",
          }}
        >
          <Image
            src="/images/hackatweet-background.png"
            alt="hackatweet background"
            className={styles.background}
            layout="fill"
          />
        </div>
        <div className={styles.loginContainer}>
          <Image
            src="/images/hackatweet-logo.png"
            alt="hackatweet logo"
            className={styles.logo}
            width={60}
            height={60}
          />
          <h2>
            See what's
            <br />
            happening
          </h2>
          <h3>Join Hackatweet today.</h3>
          <button>Sign up</button>
          <span>Already have an account?</span>
          <button>Sign in</button>
        </div>
      </main>
    </>
  );
}

export default Login;
