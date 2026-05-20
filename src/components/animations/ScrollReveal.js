import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import useReducedMotion from "../../hooks/useReducedMotion";
import useMobileOptimization from "../../hooks/useMobileOptimization";

/**
 * ScrollReveal - Triggers fade-in animations when wrapped content enters the viewport.
 *
 * Supports single-element reveal (fade + translate) and stagger mode for multiple children.
 * Respects reduced-motion preferences by rendering content immediately without animation.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content to reveal
 * @param {boolean} [props.stagger=false] - Enable staggered child animations
 * @param {number} [props.staggerDelay=0.1] - Seconds between each child animation
 * @param {number} [props.maxChildren=20] - Maximum number of children to stagger
 * @param {"up"|"left"} [props.direction="up"] - Direction content slides from
 * @param {number} [props.distance=30] - Pixels to translate from
 * @param {number} [props.duration=0.5] - Animation duration in seconds
 * @param {number} [props.threshold=0.2] - Viewport intersection threshold (0-1)
 * @param {boolean} [props.once=true] - Whether animation triggers only once
 */
function ScrollReveal({
  children,
  stagger = false,
  staggerDelay = 0.1,
  maxChildren = 20,
  direction = "up",
  distance = 30,
  duration = 0.5,
  threshold = 0.2,
  once = true,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: threshold, once });
  const prefersReducedMotion = useReducedMotion();
  const { getDuration } = useMobileOptimization();

  // Apply mobile-optimized duration (0.7x on mobile)
  const mobileDuration = getDuration(duration);

  // Compute initial offset based on direction
  const initialOffset = getInitialOffset(direction, distance);

  // Reduced motion: render immediately at full opacity
  if (prefersReducedMotion) {
    return <div ref={ref}>{children}</div>;
  }

  // Stagger mode: animate children individually with stagger delay
  if (stagger) {
    return (
      <StaggerContainer
        ref={ref}
        isInView={isInView}
        staggerDelay={staggerDelay}
        maxChildren={maxChildren}
        initialOffset={initialOffset}
        duration={mobileDuration}
      >
        {children}
      </StaggerContainer>
    );
  }

  // Single element reveal
  const variants = {
    hidden: {
      opacity: 0,
      ...initialOffset,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: mobileDuration,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

/**
 * StaggerContainer - Wraps children in motion.div containers with stagger timing.
 */
const StaggerContainer = React.forwardRef(function StaggerContainer(
  { children, isInView, staggerDelay, maxChildren, initialOffset, duration },
  ref
) {
  const childArray = React.Children.toArray(children);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0,
      },
    },
  };

  const childVariants = {
    hidden: {
      opacity: 0,
      ...initialOffset,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {childArray.map((child, index) => {
        // Only stagger up to maxChildren; render the rest without stagger
        if (index < maxChildren) {
          return (
            <motion.div key={index} variants={childVariants}>
              {child}
            </motion.div>
          );
        }
        return <div key={index}>{child}</div>;
      })}
    </motion.div>
  );
});

/**
 * Computes the initial transform offset based on direction.
 * @param {"up"|"left"} direction
 * @param {number} distance
 * @returns {{ x?: number, y?: number }}
 */
function getInitialOffset(direction, distance) {
  switch (direction) {
    case "left":
      return { x: -distance, y: 0 };
    case "up":
    default:
      return { x: 0, y: distance };
  }
}

// Export helper for testing
export { getInitialOffset };
export default ScrollReveal;
