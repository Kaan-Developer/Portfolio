import { lazy, Suspense, useEffect, useRef, useState } from "react";
import type { Application } from "@splinetool/runtime";

import Loading from "../feedback/Loading";

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
    poster: "",
  },
];

const hasMouse = () =>
  window.matchMedia("(hover: hover) and (pointer: fine)").matches;

const RobotCanvas = ({ sceneId }: RobotCanvasProps) => {
  const splineRef = useRef<Application | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isDesktop] = useState(hasMouse);

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
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      // Spline'ın wheel hareketini almasını engelle.
      // Spline canvas üzerinde wheel'i dinleyip zoom yapıyor ve sahne
      // ayarına göre preventDefault ile sayfa kaydırmasını kesiyor.
      // Olayı burada (capture fazında) kesiyoruz; preventDefault
      // çağırmadığımız için kaydırmayı tarayıcının native scroll'u yapar.
      e.stopPropagation();
    };

    container.addEventListener("wheel", handleWheel, {
      capture: true,
      passive: true,
    });

    window.addEventListener("resize", updateZoom);

    return () => {
      container.removeEventListener("wheel", handleWheel, {
        capture: true,
      });

      window.removeEventListener("resize", updateZoom);
    };
  }, []);

  if (!selectedScene) return null;

  const poster = (
    <img
      src={selectedScene.poster}
      alt=""
      className="h-full w-full object-contain object-bottom"
    />
  );

  if (!isDesktop) return poster;

  return (
    <div ref={containerRef} className="h-full w-full touch-pan-y">
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
