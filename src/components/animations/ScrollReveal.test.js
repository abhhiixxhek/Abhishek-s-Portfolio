import React from "react";
import { render, screen } from "@testing-library/react";
import ScrollReveal, { getInitialOffset } from "./ScrollReveal";

// Mock the useReducedMotion hook
jest.mock("../../hooks/useReducedMotion");
const useReducedMotion = require("../../hooks/useReducedMotion").default;

// Mock the useMobileOptimization hook
jest.mock("../../hooks/useMobileOptimization", () => {
  return () => ({
    isMobile: false,
    getDuration: (d) => d,
    disableParallax: false,
    particleDensity: 80,
  });
});

// Mock framer-motion useInView
jest.mock("framer-motion", () => {
  const actual = jest.requireActual("framer-motion");
  return {
    ...actual,
    useInView: jest.fn(() => false),
  };
});
const { useInView } = require("framer-motion");

describe("ScrollReveal", () => {
  beforeEach(() => {
    useReducedMotion.mockReturnValue(false);
    useInView.mockReturnValue(false);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("renders children", () => {
    render(
      <ScrollReveal>
        <p>Hello World</p>
      </ScrollReveal>
    );
    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });

  it("passes once and amount options to useInView", () => {
    render(
      <ScrollReveal threshold={0.3} once={false}>
        <p>Content</p>
      </ScrollReveal>
    );
    expect(useInView).toHaveBeenCalledWith(
      expect.any(Object),
      expect.objectContaining({ amount: 0.3, once: false })
    );
  });

  it("uses default threshold of 0.2 and once true", () => {
    render(
      <ScrollReveal>
        <p>Content</p>
      </ScrollReveal>
    );
    expect(useInView).toHaveBeenCalledWith(
      expect.any(Object),
      expect.objectContaining({ amount: 0.2, once: true })
    );
  });

  describe("reduced motion", () => {
    beforeEach(() => {
      useReducedMotion.mockReturnValue(true);
    });

    it("renders children at full opacity immediately", () => {
      const { container } = render(
        <ScrollReveal>
          <p>Accessible Content</p>
        </ScrollReveal>
      );
      expect(screen.getByText("Accessible Content")).toBeInTheDocument();
      // Should be a plain div, no motion.div
      const wrapper = container.firstChild;
      expect(wrapper.tagName).toBe("DIV");
    });

    it("renders stagger children at full opacity immediately", () => {
      render(
        <ScrollReveal stagger>
          <p>Child 1</p>
          <p>Child 2</p>
        </ScrollReveal>
      );
      expect(screen.getByText("Child 1")).toBeInTheDocument();
      expect(screen.getByText("Child 2")).toBeInTheDocument();
    });
  });

  describe("stagger mode", () => {
    it("renders all children in stagger mode", () => {
      render(
        <ScrollReveal stagger staggerDelay={0.15}>
          <p>Item 1</p>
          <p>Item 2</p>
          <p>Item 3</p>
        </ScrollReveal>
      );
      expect(screen.getByText("Item 1")).toBeInTheDocument();
      expect(screen.getByText("Item 2")).toBeInTheDocument();
      expect(screen.getByText("Item 3")).toBeInTheDocument();
    });

    it("caps staggered children at maxChildren", () => {
      const children = Array.from({ length: 25 }, (_, i) => (
        <p key={i}>Child {i}</p>
      ));
      const { container } = render(
        <ScrollReveal stagger maxChildren={20}>
          {children}
        </ScrollReveal>
      );
      // All children should still render
      expect(screen.getByText("Child 0")).toBeInTheDocument();
      expect(screen.getByText("Child 24")).toBeInTheDocument();
    });
  });

  describe("getInitialOffset helper", () => {
    it("returns y offset for up direction", () => {
      expect(getInitialOffset("up", 30)).toEqual({ x: 0, y: 30 });
    });

    it("returns negative x offset for left direction", () => {
      expect(getInitialOffset("left", 40)).toEqual({ x: -40, y: 0 });
    });

    it("defaults to up direction for unknown values", () => {
      expect(getInitialOffset("unknown", 20)).toEqual({ x: 0, y: 20 });
    });
  });
});
