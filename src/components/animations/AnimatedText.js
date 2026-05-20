import React from "react";
import { motion } from "framer-motion";
import useReducedMotion from "../../hooks/useReducedMotion";
import useMobileOptimization from "../../hooks/useMobileOptimization";

/**
 * AnimatedText - Renders text with staggered letter-by-letter fade-in animation.
 *
 * Each character is wrapped in a motion.span with inline-block display.
 * The delay for each letter is calculated as: (index / text.length) * totalDuration
 * This distributes the animation evenly across all characters.
 *
 * When reduced motion is preferred, renders plain text without character splitting.
 * Handles empty string gracefully by rendering an empty span.
 *
 * @param {string} text - Text to animate
 * @param {number} totalDuration - Total animation duration in seconds (default: 0.8)
 * @param {string} as - HTML element to render (default: "span")
 * @param {string} className - CSS class for styling (default: "")
 */
function AnimatedText({ text, totalDuration = 0.8, as = "span", className = "" }) {
  const prefersReducedMotion = useReducedMotion();
  const { getDuration } = useMobileOptimization();
  const Tag = as;

  // Apply mobile-optimized duration (0.7x on mobile)
  const mobileDuration = getDuration(totalDuration);

  // Handle empty string gracefully
  if (!text || text.length === 0) {
    return <Tag className={className}><span></span></Tag>;
  }

  // When reduced motion is preferred, render plain text without splitting
  if (prefersReducedMotion) {
    return <Tag className={className}>{text}</Tag>;
  }

  const letters = text.split("");

  return (
    <Tag className={className} aria-label={text}>
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          style={{ display: "inline-block" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: mobileDuration / letters.length,
            delay: (index / letters.length) * mobileDuration,
            ease: "easeOut",
          }}
          aria-hidden="true"
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </Tag>
  );
}

export default AnimatedText;
