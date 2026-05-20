import React from "react";
import { render, screen } from "@testing-library/react";
import SectionHeader from "./SectionHeader";

// Mock useReducedMotion hook
jest.mock("../../hooks/useReducedMotion", () => jest.fn());

// Mock the useMobileOptimization hook
jest.mock("../../hooks/useMobileOptimization", () => {
  return () => ({
    isMobile: false,
    getDuration: (d) => d,
    disableParallax: false,
    particleDensity: 80,
  });
});

// Mock framer-motion
jest.mock("framer-motion", () => {
  const React = require("react");
  return {
    motion: {
      h2: React.forwardRef(({ children, initial, animate, transition, ...props }, ref) => (
        <h2 ref={ref} data-testid="motion-h2" data-initial={JSON.stringify(initial)} data-animate={JSON.stringify(animate)} data-transition={JSON.stringify(transition)} {...props}>
          {children}
        </h2>
      )),
      div: React.forwardRef(({ children, initial, animate, transition, style, ...props }, ref) => (
        <div ref={ref} data-testid="motion-div" data-initial={JSON.stringify(initial)} data-animate={JSON.stringify(animate)} data-transition={JSON.stringify(transition)} style={style} {...props}>
          {children}
        </div>
      )),
    },
    useInView: jest.fn(() => true),
  };
});

const useReducedMotion = require("../../hooks/useReducedMotion");
const { useInView } = require("framer-motion");

describe("SectionHeader", () => {
  beforeEach(() => {
    useReducedMotion.mockReturnValue(false);
    useInView.mockReturnValue(true);
  });

  it("renders title text", () => {
    render(<SectionHeader title="My Projects" />);
    expect(screen.getByText("My Projects")).toBeInTheDocument();
  });

  it("renders highlight portion in purple accent color", () => {
    render(<SectionHeader title="About Me" highlight="Me" />);
    const highlighted = screen.getByText("Me");
    expect(highlighted).toHaveStyle({ color: "#c770f0" });
  });

  it("applies custom className", () => {
    const { container } = render(<SectionHeader title="Test" className="custom-header" />);
    expect(container.firstChild).toHaveClass("custom-header");
  });

  it("uses once: false on useInView to re-trigger on viewport re-entry", () => {
    render(<SectionHeader title="Test" />);
    expect(useInView).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ once: false })
    );
  });

  it("animates text with 15px upward translation over 400ms when in view", () => {
    render(<SectionHeader title="Test" />);
    const heading = screen.getByTestId("motion-h2");
    const initial = JSON.parse(heading.getAttribute("data-initial"));
    const animate = JSON.parse(heading.getAttribute("data-animate"));
    const transition = JSON.parse(heading.getAttribute("data-transition"));

    expect(initial).toEqual({ opacity: 0, y: 15 });
    expect(animate).toEqual({ opacity: 1, y: 0 });
    expect(transition.duration).toBe(0.4);
    expect(transition.ease).toBe("easeOut");
  });

  it("animates underline with scaleX 0→1 over 600ms when in view", () => {
    render(<SectionHeader title="Test" />);
    const underlines = screen.getAllByTestId("motion-div");
    const underline = underlines[0];
    const initial = JSON.parse(underline.getAttribute("data-initial"));
    const animate = JSON.parse(underline.getAttribute("data-animate"));
    const transition = JSON.parse(underline.getAttribute("data-transition"));

    expect(initial).toEqual({ scaleX: 0 });
    expect(animate).toEqual({ scaleX: 1 });
    expect(transition.duration).toBe(0.6);
    expect(transition.ease).toBe("easeOut");
  });

  it("applies gradient background on underline", () => {
    render(<SectionHeader title="Test" />);
    const underlines = screen.getAllByTestId("motion-div");
    const underline = underlines[0];
    expect(underline).toHaveStyle({
      background: "linear-gradient(to right, #c770f0, #e8a0ff)",
    });
  });

  it("resets animations when not in view", () => {
    useInView.mockReturnValue(false);
    render(<SectionHeader title="Test" />);
    const heading = screen.getByTestId("motion-h2");
    const animate = JSON.parse(heading.getAttribute("data-animate"));
    expect(animate).toEqual({ opacity: 0, y: 15 });
  });

  describe("reduced motion", () => {
    beforeEach(() => {
      useReducedMotion.mockReturnValue(true);
    });

    it("shows text immediately without motion when reduced motion is preferred", () => {
      render(<SectionHeader title="My Projects" />);
      const heading = screen.getByRole("heading", { level: 2 });
      expect(heading).toHaveStyle({ opacity: 1 });
    });

    it("shows underline immediately without motion when reduced motion is preferred", () => {
      const { container } = render(<SectionHeader title="Test" />);
      // In reduced motion mode, we render a plain div (not motion.div)
      const underline = container.querySelector("div > div");
      expect(underline).toBeInTheDocument();
      // Underline is rendered with gradient and no hidden state (no scaleX(0))
      expect(underline).toHaveStyle({
        background: "linear-gradient(to right, #c770f0, #e8a0ff)",
      });
      // No motion.div used — no data-testid="motion-div" in reduced motion path
      expect(container.querySelector("[data-testid='motion-div']")).not.toBeInTheDocument();
    });

    it("renders highlight in purple even with reduced motion", () => {
      render(<SectionHeader title="About Me" highlight="Me" />);
      const highlighted = screen.getByText("Me");
      expect(highlighted).toHaveStyle({ color: "#c770f0" });
    });
  });
});
