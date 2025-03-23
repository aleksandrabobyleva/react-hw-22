
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRandomQuote } from "../features/quote/quoteSlice"; 
import styles from "./Quote.module.css";

const Quote = () => {
  const dispatch = useDispatch();
  const { quote, author, status, error } = useSelector((state) => state.quote);

  useEffect(() => {
    dispatch(fetchRandomQuote());
  }, [dispatch]);

  const handleNewQuote = () => {
    dispatch(fetchRandomQuote());
  };

  return (
    <div className={styles.quoteContainer}>
      {status === "loading" && <p>Loading...</p>}
      {status === "succeeded" && (
        <div className={styles.quote}>
          <p>"{quote}"</p>
          <p className={styles.author}>- {author}</p>
        </div>
      )}
      {status === "failed" && <p>{error}</p>}
      <button className={styles.button} onClick={handleNewQuote}>
        New Quote
      </button>
    </div>
  );
};

export default Quote;
