import React, { useState } from "react";
import { motion } from "framer-motion";
import useReducedMotion from "../../hooks/useReducedMotion";
import useMobileOptimization from "../../hooks/useMobileOptimization";

/**
 * PageTransition wraps route content to provide enter/exit animations
 * during navigation. Uses framer-motion motion.div with initial, animate,
 * and exit variants.
 *
 * - Exit: opacity 1→0, y: 0→-20, duration 300ms
 * - Enter: opacity 0→1, y: 20→0, duration 400ms
 * - Applies pointerEvents: "none" during animation
 * - Reduced-motion: opacity crossfade only (≤200ms), no y translation
 *
 * Validates: Requirements 1.1, 1.2, 1.3, 1.6
 */
function PageTransition({ children }) {
  const prefersReducedMotion = useReducedMotion();
  const { getDuration } = useMobileOptimization();
  const [isAnimating, setIsAnimating] = useState(true);

  const fullMotionVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: getDuration(0.4), ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: getDuration(0.3), ease: "easeOut" },
    },
  };

  const reducedMotionVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { duration: getDuration(0.2), ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      transition: { duration: getDuration(0.2), ease: "easeOut" },
    },
  };

  const variants = prefersReducedMotion
    ? reducedMotionVariants
    : fullMotionVariants;

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
      style={{ pointerEvents: isAnimating ? "none" : "auto" }}
      onAnimationStart={() => setIsAnimating(true)}
      onAnimationComplete={(definition) => {
        if (definition === "animate") {
          setIsAnimating(false);
        }
      }}
    >
      {children}
    </motion.div>
  );
}

export { PageTransition };
export default PageTransition;
