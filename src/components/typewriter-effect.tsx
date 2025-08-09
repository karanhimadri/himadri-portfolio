"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const TypewriterEffect = ({
  words,
  className,
}: {
  words: {
    text: string;
    className?: string;
  }[];
  className?: string;
}) => {
  const [mounted, setMounted] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;

    const type = () => {
      const currentWord = words[wordIndex].text;

      if (isDeleting) {
        setDisplayText(currentWord.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
        if (charIndex - 1 === 0) {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      } else {
        setDisplayText(currentWord.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
        if (charIndex + 1 === currentWord.length) {
          setTimeout(() => setIsDeleting(true), 1500);
        }
      }
    };

    const typingSpeed = isDeleting ? 50 : 150;
    const timeout = setTimeout(type, typingSpeed);

    return () => clearTimeout(timeout);
  }, [mounted, charIndex, isDeleting, wordIndex, words]);

  // SSR fallback: render static text
  if (!mounted) {
    return (
      <div className={`inline-block ${className}`}>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">
          {words[0]?.text || ""}
        </span>
      </div>
    );
  }

  return (
    <div className={`inline-block ${className}`}>
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">
        {displayText}
      </span>
      <motion.span
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="inline-block w-[2px] h-full bg-primary ml-1"
        aria-hidden="true"
      />
    </div>
  );
};
