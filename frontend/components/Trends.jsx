import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
import LastTweets from "./LastTweets";

function Trends({ hashtag, onChange }) {
  const router = useRouter();
  const [searchedHashtag, setSearchedHashtag] = useState(hashtag);
  const [refreshTweets, setRefreshTweets] = useState(false);

  useEffect(() => {
    setSearchedHashtag("#" + hashtag || "");
  }, [hashtag]);

  useEffect(() => {
    if (
      !searchedHashtag ||
      searchedHashtag === "#" ||
      searchedHashtag === hashtag
    )
      return;

    // redémarre le timer à chaque frappe
    const id = setTimeout(() => {
      const clean = searchedHashtag.replace(/^#/, "").trim();
      router.push(`/hashtag/${encodeURIComponent(clean)}`);
      setRefreshTweets(!refreshTweets);
    }, 600);

    // remet le timer à 0 ms si l’utilisateur retape avant 600 ms
    return () => clearTimeout(id);
  }, [searchedHashtag]);

  return (
    <>
      <div className={styles.home}>
        <h1>Hashtag</h1>
        <div className={styles.search}>
          <input
            className={styles.inputHashtag}
            type="text"
            placeholder="#What's your favorite subject ?"
            onChange={(e) => setSearchedHashtag(e.target.value)}
            value={searchedHashtag}
            aria-label="Search hashtag"
          />
        </div>
      </div>
      <LastTweets
        refresh={refreshTweets}
        onChange={() => {
          setRefreshTweets(!refreshTweets);
          onChange?.();
        }}
        hashtag={hashtag}
      />
    </>
  );
}

export default Trends;
