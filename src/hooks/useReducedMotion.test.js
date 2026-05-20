import React from "react";
import { render, act } from "@testing-library/react";
import useReducedMotion from "./useReducedMotion";

// Helper component that exposes the hook's return value
function TestComponent({ onValue }) {
  const prefersReducedMotion = useReducedMotion();
  onValue(prefersReducedMotion);
  return null;
}

describe("useReducedMotion", () => {
  let listeners;

  function createMockMediaQuery(matches) {
    listeners = [];

    return jest.fn().mockImplementation((query) => ({
      matches,
      media: query,
      addEventListener: jest.fn((event, handler) => {
        listeners.push(handler);
      }),
      removeEventListener: jest.fn((event, handler) => {
        listeners = listeners.filter((l) => l !== handler);
      }),
    }));
  }

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("returns false when prefers-reduced-motion is not set", () => {
    window.matchMedia = createMockMediaQuery(false);
    let value;
    render(<TestComponent onValue={(v) => { value = v; }} />);
    expect(value).toBe(false);
  });

  it("returns true when prefers-reduced-motion: reduce is active", () => {
    window.matchMedia = createMockMediaQuery(true);
    let value;
    render(<TestComponent onValue={(v) => { value = v; }} />);
    expect(value).toBe(true);
  });

  it("updates when media query changes mid-session", () => {
    window.matchMedia = createMockMediaQuery(false);
    let value;
    render(<TestComponent onValue={(v) => { value = v; }} />);

    expect(value).toBe(false);

    // Simulate preference change
    act(() => {
      listeners.forEach((listener) => listener({ matches: true }));
    });

    expect(value).toBe(true);
  });

  it("updates back to false when reduced motion preference is disabled", () => {
    window.matchMedia = createMockMediaQuery(true);
    let value;
    render(<TestComponent onValue={(v) => { value = v; }} />);

    expect(value).toBe(true);

    act(() => {
      listeners.forEach((listener) => listener({ matches: false }));
    });

    expect(value).toBe(false);
  });

  it("cleans up event listener on unmount", () => {
    const removeEventListener = jest.fn();
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      addEventListener: jest.fn(),
      removeEventListener,
    }));

    const { unmount } = render(<TestComponent onValue={() => {}} />);
    unmount();

    expect(removeEventListener).toHaveBeenCalledWith("change", expect.any(Function));
  });

  it("returns false when window.matchMedia is not available", () => {
    const originalMatchMedia = window.matchMedia;
    delete window.matchMedia;

    let value;
    render(<TestComponent onValue={(v) => { value = v; }} />);
    expect(value).toBe(false);

    // Restore for cleanup
    window.matchMedia = originalMatchMedia;
  });
});
