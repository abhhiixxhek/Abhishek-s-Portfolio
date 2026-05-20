import React from "react";
import { render, act } from "@testing-library/react";
import useMobileOptimization, {
  MOBILE_BREAKPOINT,
  MOBILE_DURATION_FACTOR,
  MOBILE_PARTICLE_FACTOR,
} from "./useMobileOptimization";

// Helper component that exposes hook results via data attributes
function TestComponent({ desktopParticleDensity }) {
  const { isMobile, getDuration, disableParallax, particleDensity } =
    useMobileOptimization(desktopParticleDensity);

  return (
    <div
      data-testid="hook-output"
      data-is-mobile={String(isMobile)}
      data-disable-parallax={String(disableParallax)}
      data-particle-density={String(particleDensity)}
      data-dur-one={String(getDuration(1.0))}
      data-dur-half={String(getDuration(0.5))}
      data-dur-two={String(getDuration(2.0))}
      data-dur-zero={String(getDuration(0))}
    />
  );
}

describe("useMobileOptimization", () => {
  let matchMediaListeners;
  let mockMatches;

  beforeEach(() => {
    matchMediaListeners = [];
    mockMatches = false;

    window.matchMedia = jest.fn((query) => ({
      matches: mockMatches,
      media: query,
      addEventListener: jest.fn((event, handler) => {
        matchMediaListeners.push(handler);
      }),
      removeEventListener: jest.fn(),
      addListener: jest.fn(),
      removeListener: jest.fn(),
    }));
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  function getOutput(container) {
    return container.querySelector('[data-testid="hook-output"]');
  }

  describe("isMobile detection", () => {
    it("returns isMobile=false when viewport is >= 768px", () => {
      mockMatches = false;
      const { container } = render(<TestComponent />);
      expect(getOutput(container).dataset.isMobile).toBe("false");
    });

    it("returns isMobile=true when viewport is < 768px", () => {
      mockMatches = true;
      const { container } = render(<TestComponent />);
      expect(getOutput(container).dataset.isMobile).toBe("true");
    });

    it("updates isMobile when media query changes", () => {
      mockMatches = false;
      const { container } = render(<TestComponent />);
      expect(getOutput(container).dataset.isMobile).toBe("false");

      // Simulate media query change
      act(() => {
        matchMediaListeners.forEach((listener) =>
          listener({ matches: true })
        );
      });

      expect(getOutput(container).dataset.isMobile).toBe("true");
    });

    it("uses correct media query with breakpoint 768px", () => {
      render(<TestComponent />);
      expect(window.matchMedia).toHaveBeenCalledWith(
        `(max-width: ${MOBILE_BREAKPOINT - 1}px)`
      );
    });
  });

  describe("getDuration", () => {
    it("returns desktop duration unchanged when not mobile", () => {
      mockMatches = false;
      const { container } = render(<TestComponent />);
      const output = getOutput(container);
      expect(parseFloat(output.dataset.durOne)).toBeCloseTo(1.0);
      expect(parseFloat(output.dataset.durHalf)).toBeCloseTo(0.5);
      expect(parseFloat(output.dataset.durTwo)).toBeCloseTo(2.0);
    });

    it("returns duration * 0.7 on mobile", () => {
      mockMatches = true;
      const { container } = render(<TestComponent />);
      const output = getOutput(container);
      expect(parseFloat(output.dataset.durOne)).toBeCloseTo(0.7);
      expect(parseFloat(output.dataset.durHalf)).toBeCloseTo(0.35);
      expect(parseFloat(output.dataset.durTwo)).toBeCloseTo(1.4);
    });

    it("returns 0 for duration of 0 on mobile", () => {
      mockMatches = true;
      const { container } = render(<TestComponent />);
      const output = getOutput(container);
      expect(parseFloat(output.dataset.durZero)).toBe(0);
    });
  });

  describe("disableParallax", () => {
    it("returns false on desktop", () => {
      mockMatches = false;
      const { container } = render(<TestComponent />);
      expect(getOutput(container).dataset.disableParallax).toBe("false");
    });

    it("returns true on mobile", () => {
      mockMatches = true;
      const { container } = render(<TestComponent />);
      expect(getOutput(container).dataset.disableParallax).toBe("true");
    });
  });

  describe("particleDensity", () => {
    it("returns full desktop particle density when not mobile", () => {
      mockMatches = false;
      const { container } = render(<TestComponent />);
      expect(getOutput(container).dataset.particleDensity).toBe("80");
    });

    it("returns 50% of desktop particle density on mobile", () => {
      mockMatches = true;
      const { container } = render(<TestComponent />);
      expect(getOutput(container).dataset.particleDensity).toBe("40");
    });

    it("accepts custom desktop particle density", () => {
      mockMatches = true;
      const { container } = render(
        <TestComponent desktopParticleDensity={100} />
      );
      expect(getOutput(container).dataset.particleDensity).toBe("50");
    });

    it("rounds particle density to nearest integer", () => {
      mockMatches = true;
      const { container } = render(
        <TestComponent desktopParticleDensity={33} />
      );
      // 33 * 0.5 = 16.5, rounds to 17
      expect(getOutput(container).dataset.particleDensity).toBe("17");
    });
  });
});
