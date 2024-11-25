import React, { useEffect, useState, useRef } from "react";
import "./Testscroll.css";
import flycar from "../Textscroll/fly.mp4"

function Testscroll() {


  const [highlightedWords, setHighlightedWords] = useState(0);
  const TEXT =
    "We have an unstoppable quest for profound gratification. A desire to capture the pure human emotion of the driving experience";
  const wordsRef = useRef(TEXT.split(" "));

  const calculateScrollFraction = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    return scrollTop / (scrollHeight - clientHeight);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollFraction = calculateScrollFraction();
      const words = wordsRef.current;

      const speedMultiplier = 5; // Adjust speed here
      const newIndex = Math.floor(scrollFraction * words.length * speedMultiplier);

      // Ensure newIndex stays within bounds
      const clampedIndex = Math.min(words.length - 0, newIndex);

      if (clampedIndex !== highlightedWords) {
        setHighlightedWords(clampedIndex);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [highlightedWords]);

  return (
    <div className="Testscroll">
      <video className="text-video" autoPlay muted loop>
        <source
          src={flycar}
          type="video/mp4"
        />
      </video>

      <h1 className="text">
        {wordsRef.current.map((word, index) => (
          <span key={index} className={index < highlightedWords ? "highlight" : ""}>
            {word}{" "}
          </span>
        ))}
      </h1>
      <span className="auth">
        <div></div> ASTON MARTIN
      </span>
    </div>
  );
}

export default Testscroll;
