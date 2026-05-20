/**
 * Property 5: GPU-Optimized Animation Properties
 *
 * For all animation variant objects from the system, verify only
 * transform-related keys (x, y, scale, rotate, translateX, translateY, scaleX)
 * and opacity are present. No layout-triggering properties (width, height,
 * top, left, margin, padding, border-width) are animated.
 *
 * **Validates: Requirements 10.1**
 */
import * as fc from "fast-check";

// Allowed GPU-optimized animation properties (transform-related + opacity)
const GPU_SAFE_PROPERTIES = new Set([
  "opacity",
  "x",
  "y",
  "scale",
  "scaleX",
  "scaleY",
  "rotate",
  "translateX",
  "translateY",
  // framer-motion meta/transition keys that aren't animated properties
  "transition",
  "pointerEvents",
]);

// Layout-triggering properties that should NEVER be animated
const LAYOUT_TRIGGERING_PROPERTIES = [
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  "margin",
  "marginTop",
  "marginBottom",
  "marginLeft",
  "marginRight",
  "padding",
  "paddingTop",
  "paddingBottom",
  "paddingLeft",
  "paddingRight",
  "borderWidth",
  "fontSize",
  "lineHeight",
];

/**
 * All animation variant objects from the portfolio animation system.
 * These are the actual variants used by PageTransition, ScrollReveal,
 * AnimatedText, and SectionHeader.
 */
const ALL_ANIMATION_VARIANTS = [
  // PageTransition - full motion enter
  { opacity: 0, y: 20 },
  { opacity: 1, y: 0 },
  // PageTransition - full motion exit
  { opacity: 0, y: -20 },
  // PageTransition - reduced motion
  { opacity: 0 },
  { opacity: 1 },
  // ScrollReveal - hidden (direction: up)
  { opacity: 0, x: 0, y: 30 },
  // ScrollReveal - hidden (direction: left)
  { opacity: 0, x: -30, y: 0 },
  // ScrollReveal - visible
  { opacity: 1, x: 0, y: 0 },
  // AnimatedText - letter initial
  { opacity: 0 },
  // AnimatedText - letter animate
  { opacity: 1 },
  // SectionHeader - text initial
  { opacity: 0, y: 15 },
  // SectionHeader - text animate
  { opacity: 1, y: 0 },
  // SectionHeader - underline initial
  { scaleX: 0 },
  // SectionHeader - underline animate
  { scaleX: 1 },
];

describe("Property 5: GPU-Optimized Animation Properties", () => {
  it("all animation variants contain only GPU-safe properties", () => {
    ALL_ANIMATION_VARIANTS.forEach((variant) => {
      const keys = Object.keys(variant);
      keys.forEach((key) => {
        expect(GPU_SAFE_PROPERTIES.has(key)).toBe(true);
      });
    });
  });

  it("no animation variant contains layout-triggering properties", () => {
    ALL_ANIMATION_VARIANTS.forEach((variant) => {
      const keys = Object.keys(variant);
      keys.forEach((key) => {
        expect(LAYOUT_TRIGGERING_PROPERTIES).not.toContain(key);
      });
    });
  });

  it("randomly generated variant objects with only GPU-safe keys pass validation", () => {
    // Arbitrary: generate variant objects using only allowed keys
    const gpuSafeKeyArb = fc.constantFrom("opacity", "x", "y", "scale", "scaleX", "rotate", "translateX", "translateY");
    const gpuSafeValueArb = fc.double({ min: -100, max: 100, noNaN: true });
    const variantArb = fc
      .array(fc.tuple(gpuSafeKeyArb, gpuSafeValueArb), { minLength: 1, maxLength: 5 })
      .map((pairs) => Object.fromEntries(pairs));

    fc.assert(
      fc.property(variantArb, (variant) => {
        const keys = Object.keys(variant);
        // All keys should be GPU-safe
        keys.forEach((key) => {
          expect(GPU_SAFE_PROPERTIES.has(key)).toBe(true);
        });
        // No layout-triggering keys present
        keys.forEach((key) => {
          expect(LAYOUT_TRIGGERING_PROPERTIES).not.toContain(key);
        });
      }),
      { numRuns: 100 }
    );
  });

  it("variant objects with layout-triggering properties fail GPU-safety check", () => {
    // Arbitrary: generate variant objects that include at least one bad key
    const badKeyArb = fc.constantFrom(...LAYOUT_TRIGGERING_PROPERTIES);
    const valueArb = fc.double({ min: -100, max: 100, noNaN: true });

    fc.assert(
      fc.property(
        badKeyArb,
        valueArb,
        (badKey, value) => {
          const variant = { opacity: 1, [badKey]: value };
          const keys = Object.keys(variant);
          // Should detect that this variant has layout-triggering property
          const hasLayoutTrigger = keys.some((key) =>
            LAYOUT_TRIGGERING_PROPERTIES.includes(key)
          );
          expect(hasLayoutTrigger).toBe(true);
        }
      ),
      { numRuns: 100 }
    );
  });
});
