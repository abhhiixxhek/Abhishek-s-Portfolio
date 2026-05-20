import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ScrollReveal from "../animations/ScrollReveal";

/**
 * Static timeline data for career entries.
 * Entries are defined here and sorted by the component in reverse chronological order.
 */
const timelineData = [
  {
    id: "1",
    role: "AI/ML Engineer",
    company: "Oneture Technologies Pvt. Ltd.",
    startDate: "Aug 2025",
    endDate: null,
    description:
      "Building RAG-based Compliance Auditor, Supplier Scout Automation Agent, Human-to-SQL Autonomous Agent, and AI Patent Retrieval systems for production use.",
  },
  {
    id: "2",
    role: "AI/ML Intern",
    company: "Mastersoft ERP Solutions Pvt. Ltd.",
    startDate: "Jun 2024",
    endDate: "Jul 2025",
    description:
      "Deployed 5+ AI chatbots with FAISS-backed RAG, built facial recognition attendance system across 8 Docker containers, and automated content generation on AWS.",
  },
];

/**
 * Parses a date string in "MMM YYYY" format to a Date object for sorting.
 * @param {string} dateStr - Date string like "Jan 2024"
 * @returns {Date}
 */
function parseDateString(dateStr) {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) {
    // If parsing fails, return a very old date so it sorts to the end
    return new Date(0);
  }
  return date;
}

/**
 * Sorts timeline entries in reverse chronological order (most recent first).
 * Entries with null endDate (current positions) are treated as most recent.
 * @param {Array} entries
 * @returns {Array}
 */
function sortEntries(entries) {
  return [...entries].sort((a, b) => {
    const dateA = parseDateString(a.startDate);
    const dateB = parseDateString(b.startDate);
    return dateB - dateA;
  });
}

/**
 * Truncates a string to maxLength characters, appending ellipsis if truncated.
 * @param {string} text
 * @param {number} maxLength
 * @returns {string}
 */
function truncateDescription(text, maxLength = 200) {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "…";
}

/**
 * Formats a date range string from start and end dates.
 * @param {string} startDate
 * @param {string|null} endDate
 * @returns {string}
 */
function formatDateRange(startDate, endDate) {
  return `${startDate} – ${endDate || "Present"}`;
}

/**
 * CareerTimeline - Displays professional experience in a vertical timeline layout.
 *
 * Features:
 * - Vertical connecting line on left side using #c770f0
 * - Circle markers at each entry
 * - Reverse chronological ordering
 * - ScrollReveal animations (direction: left, distance: 30px)
 * - Responsive: removes left line at ≤767px
 * - Empty state placeholder
 */
function CareerTimeline({ entries = timelineData }) {
  // Empty state
  if (!entries || entries.length === 0) {
    return (
      <Container className="career-timeline-section">
        <Row style={{ justifyContent: "center", paddingTop: "30px" }}>
          <Col md={10} className="career-timeline-empty">
            <p style={{ color: "#a588c0", textAlign: "center", fontSize: "1.1em" }}>
              No experience data available
            </p>
          </Col>
        </Row>
      </Container>
    );
  }

  const sortedEntries = sortEntries(entries);

  return (
    <Container className="career-timeline-section">
      <Row style={{ justifyContent: "center", paddingTop: "30px", paddingBottom: "30px" }}>
        <Col md={10}>
          <h1 className="project-heading" style={{ paddingBottom: "20px" }}>
            My <strong className="purple">Experience</strong>
          </h1>
          <div className="career-timeline">
            {sortedEntries.map((entry) => (
              <ScrollReveal key={entry.id} direction="left" distance={30}>
                <div className="career-timeline-entry">
                  <div className="career-timeline-marker" />
                  <div className="career-timeline-content">
                    <h3 className="career-timeline-role">{entry.role}</h3>
                    <h4 className="career-timeline-company">{entry.company}</h4>
                    <span className="career-timeline-date">
                      {formatDateRange(entry.startDate, entry.endDate)}
                    </span>
                    <p className="career-timeline-description">
                      {truncateDescription(entry.description, 200)}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

// Export helpers for testing
export { sortEntries, truncateDescription, formatDateRange, parseDateString, timelineData };
export default CareerTimeline;
