import React from "react";
import { render, screen } from "@testing-library/react";
import AnimatedText from "./AnimatedText";

// Mock framer-motion to inspect props passed to motion.span
jest.mock("framer-motion", () => {
  const React = require("react");
  return {
    motion: {
      span: React.forwardRef(({ children, style, initial, animate, transition, ...props }, ref) => (
        <span
          ref={ref}
          style={style}
          data-initial={JSON.stringify(initial)}
          data-animate={JSON.stringify(animate)}
          data-transition={JSON.stringify(transition)}
          {...props}
        >
          {children}
        </span>
      )),
    },
  };
});

// Mock useReducedMotion hook
jest.mock("../../hooks/useReducedMotion", () => {
  return jest.fn(() => false);
});

// Mock the useMobileOptimization hook
jest.mock("../../hooks/useMobileOptimization", () => {
  return () => ({
    isMobile: false,
    getDuration: (d) => d,
    disableParallax: false,
    particleDensity: 80,
  });
});

const useReducedMotion = require("../../hooks/useReducedMotion");

describe("AnimatedText", () => {
  beforeEach(() => {
    useReducedMotion.mockReturnValue(false);
  });

  it("renders empty span when text is empty string", () => {
    const { container } = render(<AnimatedText text="" />);
    const spans = container.querySelectorAll("span");
    expect(spans.length).toBeGreaterThanOrEqual(1);
  });

  it("renders empty span when text is undefined", () => {
    const { container } = render(<AnimatedText text={undefined} />);
    const spans = container.querySelectorAll("span");
    expect(spans.length).toBeGreaterThanOrEqual(1);
  });

  it("splits text into individual characters with motion.span", () => {
    const { container } = render(<AnimatedText text="Hello" />);
    const motionSpans = container.querySelectorAll("[data-initial]");
    expect(motionSpans).toHaveLength(5);
  });

  it("sets display: inline-block on each letter span", () => {
    const { container } = render(<AnimatedText text="Hi" />);
    const motionSpans = container.querySelectorAll("[data-initial]");
    motionSpans.forEach((span) => {
      expect(span.style.display).toBe("inline-block");
    });
  });

  it("calculates letter delay as (index / text.length) * totalDuration", () => {
    const text = "ABC";
    const totalDuration = 0.9;
    const { container } = render(
      <AnimatedText text={text} totalDuration={totalDuration} />
    );
    const motionSpans = container.querySelectorAll("[data-transition]");

    motionSpans.forEach((span, index) => {
      const transition = JSON.parse(span.getAttribute("data-transition"));
      const expectedDelay = (index / text.length) * totalDuration;
      expect(transition.delay).toBeCloseTo(expectedDelay, 5);
    });
  });

  it("animates opacity from 0 to 1", () => {
    const { container } = render(<AnimatedText text="A" />);
    const motionSpan = container.querySelector("[data-initial]");
    const initial = JSON.parse(motionSpan.getAttribute("data-initial"));
    const animate = JSON.parse(motionSpan.getAttribute("data-animate"));
    expect(initial.opacity).toBe(0);
    expect(animate.opacity).toBe(1);
  });

  it("uses ease-out timing function", () => {
    const { container } = render(<AnimatedText text="A" />);
    const motionSpan = container.querySelector("[data-transition]");
    const transition = JSON.parse(motionSpan.getAttribute("data-transition"));
    expect(transition.ease).toBe("easeOut");
  });

  it("renders plain text without splitting when reduced motion is preferred", () => {
    useReducedMotion.mockReturnValue(true);
    const { container } = render(<AnimatedText text="Hello" />);
    // Should not have motion spans
    const motionSpans = container.querySelectorAll("[data-initial]");
    expect(motionSpans).toHaveLength(0);
    // Should render text directly
    expect(container.textContent).toBe("Hello");
  });

  it("renders using the specified 'as' element", () => {
    const { container } = render(<AnimatedText text="Test" as="h1" />);
    const h1 = container.querySelector("h1");
    expect(h1).toBeInTheDocument();
  });

  it("applies className prop", () => {
    const { container } = render(
      <AnimatedText text="Test" className="my-class" />
    );
    const wrapper = container.querySelector(".my-class");
    expect(wrapper).toBeInTheDocument();
  });

  it("renders spaces as non-breaking spaces", () => {
    const { container } = render(<AnimatedText text="A B" />);
    const motionSpans = container.querySelectorAll("[data-initial]");
    // The middle span should contain a non-breaking space
    expect(motionSpans[1].textContent).toBe("\u00A0");
  });

  it("uses default totalDuration of 0.8 when not specified", () => {
    const text = "AB";
    const { container } = render(<AnimatedText text={text} />);
    const motionSpans = container.querySelectorAll("[data-transition]");
    const transition = JSON.parse(motionSpans[1].getAttribute("data-transition"));
    // Second letter delay = (1 / 2) * 0.8 = 0.4
    expect(transition.delay).toBeCloseTo(0.4, 5);
  });
});
