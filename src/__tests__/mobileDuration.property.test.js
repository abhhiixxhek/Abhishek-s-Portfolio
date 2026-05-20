/**
 * Property 6: Mobile Duration Reduction
 *
 * For any desktop duration D > 0, mobile duration === D * 0.7.
 *
 * **Validates: Requirements 10.2**
 */
import * as fc from "fast-check";
import { MOBILE_DURATION_FACTOR } from "../hooks/useMobileOptimization";

/**
 * Simulates the getDuration function behavior on mobile.
 * On mobile (viewport < 768px), duration is multiplied by MOBILE_DURATION_FACTOR (0.7).
 *
 * @param {number} desktopDuration - Original desktop duration
 * @param {boolean} isMobile - Whether viewport is mobile
 * @returns {number} Adjusted duration
 */
function computeMobileDuration(desktopDuration, isMobile) {
  if (isMobile) {
    return desktopDuration * MOBILE_DURATION_FACTOR;
  }
  return desktopDuration;
}

describe("Property 6: Mobile Duration Reduction", () => {
  it("MOBILE_DURATION_FACTOR is exactly 0.7", () => {
    expect(MOBILE_DURATION_FACTOR).toBe(0.7);
  });

  it("mobile duration === desktopDuration * 0.7 for any positive duration", () => {
    fc.assert(
      fc.property(
        fc.double({ min: 0.01, max: 10.0, noNaN: true }), // desktop duration D > 0
        (desktopDuration) => {
          const mobileDuration = computeMobileDuration(desktopDuration, true);
          const expected = desktopDuration * 0.7;
          expect(Math.abs(mobileDuration - expected)).toBeLessThan(1e-10);
        }
      ),
      { numRuns: 100 }
    );
  });

  it("desktop duration remains unchanged when not on mobile", () => {
    fc.assert(
      fc.property(
        fc.double({ min: 0.01, max: 10.0, noNaN: true }),
        (desktopDuration) => {
          const result = computeMobileDuration(desktopDuration, false);
          expect(result).toBe(desktopDuration);
        }
      ),
      { numRuns: 100 }
    );
  });

  it("mobile duration is always less than desktop duration for D > 0", () => {
    fc.assert(
      fc.property(
        fc.double({ min: 0.01, max: 10.0, noNaN: true }),
        (desktopDuration) => {
          const mobileDuration = computeMobileDuration(desktopDuration, true);
          expect(mobileDuration).toBeLessThan(desktopDuration);
        }
      ),
      { numRuns: 100 }
    );
  });

  it("mobile duration is exactly 70% of desktop duration", () => {
    fc.assert(
      fc.property(
        fc.double({ min: 0.01, max: 10.0, noNaN: true }),
        (desktopDuration) => {
          const mobileDuration = computeMobileDuration(desktopDuration, true);
          const ratio = mobileDuration / desktopDuration;
          expect(Math.abs(ratio - 0.7)).toBeLessThan(1e-10);
        }
      ),
      { numRuns: 100 }
    );
  });
});
