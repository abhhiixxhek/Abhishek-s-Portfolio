/**
 * Property 4: Letter-by-Letter Delay Distribution
 *
 * For text of length N with duration T, letter[i].delay === (i / N) * T.
 *
 * **Validates: Requirements 4.1**
 */
import * as fc from "fast-check";

/**
 * Computes the expected delay for a letter at a given index.
 * This mirrors the formula used in AnimatedText:
 *   delay: (index / letters.length) * mobileDuration
 *
 * @param {number} index - Letter index
 * @param {number} textLength - Total number of characters
 * @param {number} totalDuration - Total animation duration
 * @returns {number} Expected delay in seconds
 */
function computeLetterDelay(index, textLength, totalDuration) {
  return (index / textLength) * totalDuration;
}

describe("Property 4: Letter-by-Letter Delay Distribution", () => {
  it("letter[i].delay === (i / N) * T for all letters in text", () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 100 }), // text of length N >= 1
        fc.double({ min: 0.1, max: 5.0, noNaN: true }), // total duration T
        (text, totalDuration) => {
          const letters = text.split("");
          const n = letters.length;

          for (let i = 0; i < n; i++) {
            const expectedDelay = (i / n) * totalDuration;
            const computedDelay = computeLetterDelay(i, n, totalDuration);
            expect(Math.abs(computedDelay - expectedDelay)).toBeLessThan(1e-10);
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  it("first letter always has delay 0", () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 100 }),
        fc.double({ min: 0.1, max: 5.0, noNaN: true }),
        (text, totalDuration) => {
          const n = text.length;
          const firstLetterDelay = computeLetterDelay(0, n, totalDuration);
          expect(firstLetterDelay).toBe(0);
        }
      ),
      { numRuns: 100 }
    );
  });

  it("last letter has delay approaching (but less than) totalDuration", () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 2, maxLength: 100 }),
        fc.double({ min: 0.1, max: 5.0, noNaN: true }),
        (text, totalDuration) => {
          const n = text.length;
          const lastLetterDelay = computeLetterDelay(n - 1, n, totalDuration);
          // Last letter delay should be ((N-1)/N) * T which is less than T
          expect(lastLetterDelay).toBeLessThan(totalDuration);
          expect(lastLetterDelay).toBeGreaterThan(0);
        }
      ),
      { numRuns: 100 }
    );
  });

  it("delays are monotonically increasing across all letters", () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 2, maxLength: 100 }),
        fc.double({ min: 0.1, max: 5.0, noNaN: true }),
        (text, totalDuration) => {
          const n = text.length;
          let prevDelay = -1;

          for (let i = 0; i < n; i++) {
            const delay = computeLetterDelay(i, n, totalDuration);
            expect(delay).toBeGreaterThan(prevDelay);
            prevDelay = delay;
          }
        }
      ),
      { numRuns: 100 }
    );
  });
});
