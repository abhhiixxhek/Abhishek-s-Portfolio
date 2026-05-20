import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import useReducedMotion from "../../hooks/useReducedMotion";
import useMobileOptimization from "../../hooks/useMobileOptimization";

/**
 * SectionHeader - Renders a section heading with animated underline decoration.
 *
 * Text fades in with a 15px upward translation over 400ms.
 * Underline expands from center (scaleX 0→1) over 600ms with ease-out.
 * Underline uses a gradient from #c770f0 to #e8a0ff.
 * Re-triggers on viewport re-entry (once: false on useInView).
 *
 * When reduced motion is preferred, text and underline are shown immediately.
 * Supports a `highlight` prop to render a portion of the title in purple accent.
 *
 * @param {string} title - Main heading text
 * @param {string} highlight - Text within title to render in purple accent color (default: "")
 * @param {string} className - Additional CSS class (default: "")
 */
function SectionHeader({ title, highlight = "", className = "" }) {
  const prefersReducedMotion = useReducedMotion();
  const { getDuration } = useMobileOptimization();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  /**
   * Renders the title text, highlighting the specified portion in purple accent.
   */
  function renderTitle() {
    if (!highlight || !title.includes(highlight)) {
      return title;
    }

    const parts = title.split(highlight);
    return (
      <>
        {parts[0]}
        <span style={{ color: "#c770f0" }}>{highlight}</span>
        {parts.slice(1).join(highlight)}
      </>
    );
  }

  // When reduced motion is preferred, show everything immediately
  if (prefersReducedMotion) {
    return (
      <div ref={ref} className={className} style={{ textAlign: "center" }}>
        <h2 style={{ opacity: 1 }}>
          {renderTitle()}
        </h2>
        <div
          style={{
            height: "3px",
            width: "100%",
            maxWidth: "150px",
            margin: "8px auto 0",
            background: "linear-gradient(to right, #c770f0, #e8a0ff)",
            transform: "scaleX(1)",
          }}
        />
      </div>
    );
  }

  return (
    <div ref={ref} className={className} style={{ textAlign: "center" }}>
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
        transition={{ duration: getDuration(0.4), ease: "easeOut" }}
      >
        {renderTitle()}
      </motion.h2>
      <motion.div
        style={{
          height: "3px",
          width: "100%",
          maxWidth: "150px",
          margin: "8px auto 0",
          background: "linear-gradient(to right, #c770f0, #e8a0ff)",
          transformOrigin: "center",
        }}
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: getDuration(0.6), ease: "easeOut" }}
      />
    </div>
  );
}

export default SectionHeader;
