"use client";

import { ParallaxLayer } from "./Cinematic";

type AmbientOrbsProps = {
  variant?: "default" | "dense" | "soft" | "single";
};

export function AmbientOrbs({ variant = "default" }: AmbientOrbsProps) {
  if (variant === "single") {
    return (
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <ParallaxLayer speed={0.4} className="absolute inset-0">
          <div
            className="orb orb-blue"
            style={{ width: 640, height: 640, top: -220, right: -180 }}
          />
        </ParallaxLayer>
      </div>
    );
  }

  if (variant === "soft") {
    return (
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <ParallaxLayer speed={0.3} className="absolute inset-0">
          <div
            className="orb orb-deep"
            style={{ width: 520, height: 520, top: 200, left: -160 }}
          />
        </ParallaxLayer>
        <ParallaxLayer speed={0.5} className="absolute inset-0">
          <div
            className="orb orb-blue"
            style={{ width: 460, height: 460, top: 900, right: -140 }}
          />
        </ParallaxLayer>
      </div>
    );
  }

  if (variant === "dense") {
    return (
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <ParallaxLayer speed={0.35} className="absolute inset-0">
          <div
            className="orb orb-blue"
            style={{ width: 720, height: 720, top: -260, left: "50%", transform: "translateX(-50%)" }}
          />
        </ParallaxLayer>
        <ParallaxLayer speed={0.25} className="absolute inset-0">
          <div
            className="orb orb-deep"
            style={{ width: 540, height: 540, top: 580, right: -160 }}
          />
        </ParallaxLayer>
        <ParallaxLayer speed={0.55} className="absolute inset-0">
          <div
            className="orb orb-bright"
            style={{ width: 420, height: 420, top: 1400, left: -140 }}
          />
        </ParallaxLayer>
      </div>
    );
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <ParallaxLayer speed={0.3} className="absolute inset-0">
        <div className="orb orb-blue" style={{ width: 600, height: 600, top: -200, right: -150 }} />
      </ParallaxLayer>
      <ParallaxLayer speed={0.5} className="absolute inset-0">
        <div className="orb orb-deep" style={{ width: 480, height: 480, top: 700, left: -180 }} />
      </ParallaxLayer>
    </div>
  );
}
