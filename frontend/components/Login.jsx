import styles from "../styles/Login.module.css";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

function Login() {
  const [isModalSignUpVisible, setIsModalSignUpVisible] = useState(false);
  const [isModalSignInVisible, setIsModalSignInVisible] = useState(false);

  return (
    <>
      <Head>
        <title>HACKATWEET - Login</title>
      </Head>
      {isModalSignUpVisible && (
        <SignUp onClose={() => setIsModalSignUpVisible(false)} />
      )}
      {isModalSignInVisible && (
        <SignIn onClose={() => setIsModalSignInVisible(false)} />
      )}
      <main className={styles.main}>
        <div
          style={{
            position: "relative",
            width: "44%",
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
          <h2 style={{ marginTop: "70px" }}>
            See what's
            <br />
            happening
          </h2>
          <h3>Join Hackatweet today.</h3>
          <button
            onClick={() => setIsModalSignUpVisible(!isModalSignUpVisible)}
            className={styles.btnFull}
          >
            Sign up
          </button>
          <span style={{ margin: "20px 0" }}>Already have an account?</span>
          <button
            onClick={() => setIsModalSignInVisible(!isModalSignInVisible)}
            className={styles.btnGhost}
          >
            Sign in
          </button>
        </div>
      </main>
    </>
  );
}

export default Login;
