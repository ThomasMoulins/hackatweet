import styles from "../styles/SignUp.module.css";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function SignUp() {
  return (
    <div className={styles.signUpModalBg}>
      <div className={styles.signUpContainer}>
        <button
          type="button"
          aria-label="Fermer la fenêtre"
          className={styles.closeIcon}
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
        <h4>Create your Hackatweet account</h4>
        <input type="text" />
        <input type="text" />
        <input type="text" />
        <button>Sign up</button>
      </div>
    </div>
  );
}

export default SignUp;
