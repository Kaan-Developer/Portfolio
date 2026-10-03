import { lazy, Suspense, useEffect, useRef, useState } from "react";
import type { Application } from "@splinetool/runtime";

import Loading from "../feedback/Loading";
import aboutRobotPoster from "../../assets/images/AboutRobot.png";

const Spline = lazy(() => import("@splinetool/react-spline"));

interface Scene {
  id: number;
  sceneUrl: string;
  poster: string;
}

interface RobotCanvasProps {
  sceneId: number;
}

const scenes: Scene[] = [
  {
    id: 1,
    sceneUrl: import.meta.env.VITE_ROBOT_1_URL,
    poster: "",
  },
  {
    id: 2,
    sceneUrl: import.meta.env.VITE_ROBOT_2_URL,
    poster: aboutRobotPoster,
  },
];

const checkIsMobile = () => {
  if (typeof window === "undefined") return false;
  return (
    window.innerWidth < 768 ||
    !window.matchMedia("(hover: hover) and (pointer: fine)").matches
  );
};

const RobotCanvas = ({ sceneId }: RobotCanvasProps) => {
  const splineRef = useRef<Application | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isMobile, setIsMobile] = useState(checkIsMobile);
  const [isLoading, setIsLoading] = useState(true);

  const selectedScene = scenes.find((scene) => scene.id === sceneId);

  const updateZoom = () => {
    const splineApp = splineRef.current;
    if (!splineApp) return;
    splineApp.setZoom(window.innerWidth < 768 ? 1.3 : 1.55);
  };

  const handleLoad = (splineApp: Application) => {
    splineRef.current = splineApp;
    updateZoom();
    setIsLoading(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(checkIsMobile());
      updateZoom();
    };

    window.addEventListener("resize", handleResize);

    const container = containerRef.current;
    if (!container) {
      return () => window.removeEventListener("resize", handleResize);
    }

    const handleWheel = (e: WheelEvent) => {
      e.stopPropagation();
    };

    container.addEventListener("wheel", handleWheel, {
      capture: true,
      passive: true,
    });

    return () => {
      container.removeEventListener("wheel", handleWheel, {
        capture: true,
      });
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!selectedScene) return null;

  if (isMobile && selectedScene.poster) {
    return (
      <div className="relative h-full w-full flex items-end justify-center">
        <img
          src={selectedScene.poster}
          alt="Robot"
          className="h-full w-full object-contain object-bottom select-none pointer-events-none"
        />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full touch-pan-y"
    >
      {isLoading && (
        <div className="absolute inset-0 z-10">
          <Loading />
        </div>
      )}

      <Suspense fallback={null}>
        <Spline
          scene={selectedScene.sceneUrl}
          onLoad={handleLoad}
        />
      </Suspense>
    </div>
  );
};

export default RobotCanvas;