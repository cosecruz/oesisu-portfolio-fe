import { Canvas } from "@react-three/fiber";
import StudioLights from "./three/StudioLights";
import { features, featureSequence } from "../constants";
import clsx from "clsx";
import { Suspense, useEffect, useRef } from "react";
import { Html } from "@react-three/drei";
import MacbookModel from "./models/Macbook";
import { useMediaQuery } from "react-responsive";
import useMacbookStore from "../store";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Group } from "three";

// GSAP plugin imports (make sure they’re registered once globally)
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const ModelScroll: React.FC = () => {
  const groupRef = useRef<Group | null>(null);
  const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });
  const { setTexture } = useMacbookStore();

  // Preload all feature videos
  useEffect(() => {
    featureSequence.forEach((feature) => {
      const video = document.createElement("video");

      Object.assign(video, {
        src: feature.videoPath,
        muted: true,
        playsInline: true,
        preload: "auto",
        crossOrigin: "anonymous",
      });

      video.load();
    });
  }, []);

  // GSAP Scroll Animations
  useGSAP(() => {
    const sectionTrigger = "#f-canvas";

    // 3D model rotation animation
    const modelTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionTrigger,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        pin: true,
      },
    });

    // Spin model once across scroll
    if (groupRef.current) {
      modelTimeline.to(groupRef.current.rotation, {
        y: Math.PI * 2,
        ease: "power1.inOut",
      });
    }

    // Feature texture sync + text fade
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionTrigger,
        start: "top center",
        end: "bottom top",
        scrub: 1,
      },
    });

    featureSequence.forEach((feature, i) => {
      timeline
        .call(() => setTexture(feature.videoPath))
        .to(`.box${i + 1}`, {
          opacity: 1,
          y: 0,
          delay: feature.delay,
          duration: 1,
        });
    });
  }, []);

  return (
    <group ref={groupRef}>
      <Suspense
        fallback={
          <Html>
            <h1 className="text-white text-3xl uppercase">Loading...</h1>
          </Html>
        }
      >
        <MacbookModel scale={isMobile ? 0.05 : 0.08} position={[0, -1, 0]} />
      </Suspense>
    </group>
  );
};

const Features: React.FC = () => {
  return (
    <section id="features" className="relative">
      <h2>See it all in a new light.</h2>

      <Canvas id="f-canvas" camera={{ position: [0, 0, 3], fov: 50 }}>
        <StudioLights />
        <ambientLight intensity={0.5} />
        <ModelScroll />
      </Canvas>

      <div className="absolute inset-0 pointer-events-none">
        {features.map((feature, index) => (
          <div
            key={feature.id}
            className={clsx("box", `box${index + 1}`, feature.styles)}
          >
            <img src={feature.icon} alt={feature.highlight} />
            <p>
              <span className="text-white">{feature.highlight}</span>{" "}
              {feature.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
