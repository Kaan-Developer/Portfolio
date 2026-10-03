import { lazy, Suspense, useEffect, useRef, useState } from "react";
import type { Application } from "@splinetool/runtime";

import Loading from "../feedback/Loading";

const Spline = lazy(() => import("@splinetool/react-spline"));

interface Scene {
  id: number;
  sceneUrl: string;
}

interface RobotCanvasProps {
  sceneId: number;
}

const scenes: Scene[] = [
  { id: 1, sceneUrl: import.meta.env.VITE_ROBOT_1_URL },
  { id: 2, sceneUrl: import.meta.env.VITE_ROBOT_2_URL },
];

const checkIsMobile = () => {
  if (typeof window === "undefined") return false;
  return (
    window.innerWidth < 768 ||
    !window.matchMedia("(hover: hover) and (pointer: fine)").matches
  );
};

const RobotCanvas = ({ sceneId }: RobotCanvasProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isMobile, setIsMobile] = useState(checkIsMobile);
  const [isLoading, setIsLoading] = useState(true);

  const selectedScene = scenes.find((scene) => scene.id === sceneId);

  const handleLoad = (splineApp: Application) => {
    splineApp.setZoom(1.55);
    setIsLoading(false);
  };

  // Ekran boyutu değişince mobil/desktop durumunu güncelle
  useEffect(() => {
    const handleResize = () => {
      const mobile = checkIsMobile();
      setIsMobile(mobile);
      if (mobile) setIsLoading(true); // desktop'a dönünce loader tekrar görünsün
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Robotun üstünde scroll yapınca sayfa kayması engellenmesin diye wheel olayı
  useEffect(() => {
    const container = containerRef.current;
    if (isMobile || !container) return;

    const handleWheel = (e: WheelEvent) => {
      e.stopPropagation();
    };

    container.addEventListener("wheel", handleWheel, {
      capture: true,
      passive: true,
    });

    return () => {
      container.removeEventListener("wheel", handleWheel, { capture: true });
    };
  }, [isMobile]);

  if (!selectedScene || isMobile) return null;

  return (
    <div ref={containerRef} className="relative h-full w-full touch-pan-y">
      {isLoading && (
        <div className="absolute inset-0 z-10">
          <Loading />
        </div>
      )}

      <Suspense fallback={null}>
        <Spline scene={selectedScene.sceneUrl} onLoad={handleLoad} />
      </Suspense>
    </div>
  );
};

export default RobotCanvas;