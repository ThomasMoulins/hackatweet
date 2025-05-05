import styles from "../styles/SignIn.module.css";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../reducers/user";
import { useRouter } from "next/router";

function SignIn({ onClose }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    fetch("http://localhost:3000/users/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(
            login({
              firstname: data.firstname,
              username: username,
              token: data.token,
              likedTweets: data.likedTweets
            })
          );
          setUsername("");
          setPassword("");
          onClose;
          router.push("/home");
        }
      });
  };

  return (
    <div className={styles.signInModalBg}>
      <div className={styles.signInContainer}>
        <button
          type="button"
          aria-label="Fermer la fenêtre"
          className={styles.closeIcon}
          onClick={onClose}
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
        <Image
          src="/images/hackatweet-logo.png"
          alt="hackatweet logo"
          className={styles.logo}
          width={60}
          height={60}
        />
        <h4>Connect to Hackatweet</h4>
        <input
          className={styles.input}
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          required
          aria-required="true"
          aria-label="Enter username"
        />
        <input
          className={styles.input}
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
          aria-required="true"
          aria-label="Enter password"
        />
        <button onClick={handleSubmit} className={styles.button}>
          Sign in
        </button>
      </div>
    </div>
  );
}

export default SignIn;
