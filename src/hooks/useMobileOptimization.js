import { useState, useEffect, useCallback, useMemo } from "react";

const MOBILE_BREAKPOINT = 768;
const MOBILE_DURATION_FACTOR = 0.7;
const MOBILE_PARTICLE_FACTOR = 0.5;
const DEFAULT_DESKTOP_PARTICLE_DENSITY = 80;

/**
 * Hook that detects mobile viewport (< 768px) and provides
 * optimized animation values for mobile devices.
 *
 * @param {number} [desktopParticleDensity=80] - Base particle density for desktop
 * @returns {{ isMobile: boolean, getDuration: (desktopDuration: number) => number, disableParallax: boolean, particleDensity: number }}
 */
function useMobileOptimization(desktopParticleDensity = DEFAULT_DESKTOP_PARTICLE_DENSITY) {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth < MOBILE_BREAKPOINT;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

    if (!mediaQuery) return;

    const handleChange = (event) => {
      setIsMobile(event.matches);
    };

    // Set initial state from media query
    setIsMobile(mediaQuery.matches);

    // Listen for changes
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  const getDuration = useCallback(
    (desktopDuration) => {
      if (isMobile) {
        return desktopDuration * MOBILE_DURATION_FACTOR;
      }
      return desktopDuration;
    },
    [isMobile]
  );

  const disableParallax = isMobile;

  const particleDensity = useMemo(() => {
    if (isMobile) {
      return Math.round(desktopParticleDensity * MOBILE_PARTICLE_FACTOR);
    }
    return desktopParticleDensity;
  }, [isMobile, desktopParticleDensity]);

  return { isMobile, getDuration, disableParallax, particleDensity };
}

export default useMobileOptimization;
export { MOBILE_BREAKPOINT, MOBILE_DURATION_FACTOR, MOBILE_PARTICLE_FACTOR };
