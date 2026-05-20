import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useReducedMotion from "../hooks/useReducedMotion";

/**
 * Enhanced Preloader component with framer-motion exit animation.
 *
 * - Exit animation: opacity 1→0 + scale 1→0.85 over 400ms ease-out
 * - After exit completes: aria-hidden="true" and display: none
 * - Calls onExitComplete callback to coordinate content fade-in
 *
 * Props:
 *   load (boolean): whether the app is still loading
 *   onExitComplete (function): called after the exit animation finishes
 */
function Pre({ load, onExitComplete }) {
  const prefersReducedMotion = useReducedMotion();
  const [hasExited, setHasExited] = useState(false);

  const handleExitComplete = () => {
    setHasExited(true);
    if (onExitComplete) {
      onExitComplete();
    }
  };

  // If reduced motion is preferred, skip animation entirely
  useEffect(() => {
    if (prefersReducedMotion && !load && !hasExited) {
      setHasExited(true);
      if (onExitComplete) {
        onExitComplete();
      }
    }
  }, [prefersReducedMotion, load, hasExited, onExitComplete]);

  const exitAnimation = prefersReducedMotion
    ? { opacity: 0, transition: { duration: 0.1 } }
    : { opacity: 0, scale: 0.85, transition: { duration: 0.4, ease: "easeOut" } };

  return (
    <>
      <AnimatePresence onExitComplete={handleExitComplete}>
        {load && (
          <motion.div
            id="preloader"
            key="preloader"
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={exitAnimation}
            aria-live="polite"
            aria-label="Loading"
          />
        )}
      </AnimatePresence>
      {/* Hidden preloader placeholder for accessibility after exit */}
      {hasExited && (
        <div
          id="preloader-none"
          aria-hidden="true"
          style={{ display: "none" }}
        />
      )}
    </>
  );
}

export default Pre;
