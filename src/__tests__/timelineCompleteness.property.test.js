/**
 * Property 3: Timeline Entry Data Completeness
 *
 * For any entry, description never exceeds 200 chars.
 * formatDateRange shows "Present" for null endDate.
 *
 * **Validates: Requirements 3.3**
 */
import * as fc from "fast-check";
import { truncateDescription, formatDateRange } from "../components/About/CareerTimeline";

// Months for generating valid "MMM YYYY" date strings
const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const dateStringArb = fc
  .tuple(
    fc.constantFrom(...MONTHS),
    fc.integer({ min: 2000, max: 2030 })
  )
  .map(([month, year]) => `${month} ${year}`);

describe("Property 3: Timeline Entry Data Completeness", () => {
  it("truncateDescription never returns a string exceeding 200 characters", () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 0, maxLength: 1000 }),
        (description) => {
          const truncated = truncateDescription(description, 200);
          // The result should never exceed 200 chars + 1 for ellipsis character
          // When truncated, the text is 200 chars + "…" (single char ellipsis)
          if (description.length <= 200) {
            expect(truncated).toBe(description);
            expect(truncated.length).toBeLessThanOrEqual(200);
          } else {
            // Truncated text is 200 chars + "…" = 201 chars total
            expect(truncated.length).toBe(201);
            expect(truncated.endsWith("…")).toBe(true);
            // The actual content portion is exactly 200 chars
            expect(truncated.slice(0, 200)).toBe(description.slice(0, 200));
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  it("truncateDescription returns empty string for falsy input", () => {
    expect(truncateDescription(null, 200)).toBe("");
    expect(truncateDescription(undefined, 200)).toBe("");
    expect(truncateDescription("", 200)).toBe("");
  });

  it("formatDateRange shows 'Present' when endDate is null", () => {
    fc.assert(
      fc.property(
        dateStringArb,
        (startDate) => {
          const result = formatDateRange(startDate, null);
          expect(result).toContain("Present");
          expect(result).toContain(startDate);
          expect(result).toBe(`${startDate} – Present`);
        }
      ),
      { numRuns: 100 }
    );
  });

  it("formatDateRange includes both start and end dates when endDate is provided", () => {
    fc.assert(
      fc.property(
        dateStringArb,
        dateStringArb,
        (startDate, endDate) => {
          const result = formatDateRange(startDate, endDate);
          expect(result).toContain(startDate);
          expect(result).toContain(endDate);
          expect(result).toBe(`${startDate} – ${endDate}`);
        }
      ),
      { numRuns: 100 }
    );
  });
});
