/**
 * Property 2: Timeline Reverse Chronological Ordering
 *
 * For any list of entries with dates, rendered order is reverse chronological
 * (most recent startDate first).
 *
 * **Validates: Requirements 3.1**
 */
import * as fc from "fast-check";
import { sortEntries } from "../components/About/CareerTimeline";

// Months for generating valid "MMM YYYY" date strings
const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

/**
 * Arbitrary that generates a valid "MMM YYYY" date string
 */
const dateStringArb = fc
  .tuple(
    fc.constantFrom(...MONTHS),
    fc.integer({ min: 2000, max: 2030 })
  )
  .map(([month, year]) => `${month} ${year}`);

/**
 * Arbitrary that generates a valid TimelineEntry
 */
const timelineEntryArb = fc.record({
  id: fc.uuid(),
  role: fc.string({ minLength: 1, maxLength: 50 }),
  company: fc.string({ minLength: 1, maxLength: 50 }),
  startDate: dateStringArb,
  endDate: fc.oneof(dateStringArb, fc.constant(null)),
  description: fc.string({ minLength: 0, maxLength: 300 }),
});

describe("Property 2: Timeline Reverse Chronological Ordering", () => {
  it("sortEntries returns entries in reverse chronological order by startDate", () => {
    fc.assert(
      fc.property(
        fc.array(timelineEntryArb, { minLength: 1, maxLength: 15 }),
        (entries) => {
          const sorted = sortEntries(entries);

          // Verify each adjacent pair is in reverse chronological order
          for (let i = 0; i < sorted.length - 1; i++) {
            const currentDate = new Date(sorted[i].startDate);
            const nextDate = new Date(sorted[i + 1].startDate);
            // Current entry should be same or more recent than next
            expect(currentDate.getTime()).toBeGreaterThanOrEqual(nextDate.getTime());
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  it("sortEntries preserves all original entries (no entries lost or duplicated)", () => {
    fc.assert(
      fc.property(
        fc.array(timelineEntryArb, { minLength: 0, maxLength: 15 }),
        (entries) => {
          const sorted = sortEntries(entries);
          expect(sorted.length).toBe(entries.length);

          // Every original entry should appear in sorted output
          const sortedIds = sorted.map((e) => e.id).sort();
          const originalIds = entries.map((e) => e.id).sort();
          expect(sortedIds).toEqual(originalIds);
        }
      ),
      { numRuns: 100 }
    );
  });
});
