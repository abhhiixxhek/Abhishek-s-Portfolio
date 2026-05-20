import React from "react";
import { render, act } from "@testing-library/react";
import Pre from "./Pre";

// Mock useReducedMotion hook
jest.mock("../hooks/useReducedMotion", () => {
  return jest.fn(() => false);
});

// Store callback ref for test access
let mockOnExitComplete = null;

jest.mock("framer-motion", () => {
  const React = require("react");
  return {
    motion: {
      div: React.forwardRef(({ children, exit, initial, animate, ...props }, ref) => {
        const validProps = {};
        if (props["aria-live"]) validProps["aria-live"] = props["aria-live"];
        if (props["aria-label"]) validProps["aria-label"] = props["aria-label"];
        if (props.id) validProps.id = props.id;
        if (props.className) validProps.className = props.className;
        if (props.style) validProps.style = props.style;
        return <div ref={ref} {...validProps}>{children}</div>;
      }),
    },
    AnimatePresence: ({ children, onExitComplete }) => {
      // Use a global-scoped variable to store the callback
      global.__mockAnimatePresenceOnExitComplete = onExitComplete;
      return <>{children}</>;
    },
  };
});

describe("Pre (Enhanced Preloader)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.__mockAnimatePresenceOnExitComplete = null;
  });

  test("renders preloader div when load is true", () => {
    const { container } = render(<Pre load={true} />);
    const preloader = container.querySelector("#preloader");
    expect(preloader).toBeInTheDocument();
  });

  test("removes preloader from DOM when load becomes false", () => {
    const { container, rerender } = render(<Pre load={true} />);
    expect(container.querySelector("#preloader")).toBeInTheDocument();

    rerender(<Pre load={false} />);
    // With AnimatePresence mock, child is removed immediately when condition is false
    expect(container.querySelector("#preloader")).not.toBeInTheDocument();
  });

  test("calls onExitComplete callback after exit animation", () => {
    const onExitComplete = jest.fn();
    const { rerender } = render(
      <Pre load={true} onExitComplete={onExitComplete} />
    );

    rerender(<Pre load={false} onExitComplete={onExitComplete} />);

    // Simulate AnimatePresence calling onExitComplete
    act(() => {
      if (global.__mockAnimatePresenceOnExitComplete) {
        global.__mockAnimatePresenceOnExitComplete();
      }
    });

    expect(onExitComplete).toHaveBeenCalledTimes(1);
  });

  test("applies aria-hidden and display:none after exit completes", () => {
    const { container, rerender } = render(<Pre load={true} />);

    rerender(<Pre load={false} />);

    // Simulate exit complete
    act(() => {
      if (global.__mockAnimatePresenceOnExitComplete) {
        global.__mockAnimatePresenceOnExitComplete();
      }
    });

    const hiddenElement = container.querySelector("#preloader-none");
    expect(hiddenElement).toBeInTheDocument();
    expect(hiddenElement).toHaveAttribute("aria-hidden", "true");
    expect(hiddenElement).toHaveStyle({ display: "none" });
  });

  test("preloader has accessible aria-live and aria-label attributes", () => {
    const { container } = render(<Pre load={true} />);
    const preloader = container.querySelector("#preloader");
    expect(preloader).toHaveAttribute("aria-live", "polite");
    expect(preloader).toHaveAttribute("aria-label", "Loading");
  });

  test("skips animation when reduced motion is preferred", () => {
    const useReducedMotion = require("../hooks/useReducedMotion");
    useReducedMotion.mockReturnValue(true);

    const onExitComplete = jest.fn();
    const { container } = render(
      <Pre load={false} onExitComplete={onExitComplete} />
    );

    // With reduced motion, hasExited should be set immediately
    const hiddenElement = container.querySelector("#preloader-none");
    expect(hiddenElement).toBeInTheDocument();
    expect(onExitComplete).toHaveBeenCalled();
  });
});
