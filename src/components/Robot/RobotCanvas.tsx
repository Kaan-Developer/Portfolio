import { useEffect, useRef } from "react";
import Spline from "@splinetool/react-spline";
import type { Application } from "@splinetool/runtime";

interface Scene {
  id: number;
  sceneUrl: string;
}

interface RobotCanvasProps {
  sceneId: number;
}

const scenes: Scene[] = [
  {
    id: 1,
    sceneUrl: import.meta.env.VITE_ROBOT_1_URL,
  },
  {
    id: 2,
    sceneUrl: import.meta.env.VITE_ROBOT_2_URL,
  },
];

const RobotCanvas = ({ sceneId }: RobotCanvasProps) => {
  const splineRef = useRef<Application | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const selectedScene = scenes.find((scene) => scene.id === sceneId);

  const updateZoom = () => {
    const splineApp = splineRef.current;
    if (!splineApp) return;

    const isMobile = window.innerWidth < 768;
    const zoomLevel = isMobile ? 1.3 : 1.55;

    splineApp.setZoom(zoomLevel);
  };

  const handleLoad = (splineApp: Application) => {
    splineRef.current = splineApp;
    updateZoom();
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

  return (
    <div
      ref={containerRef}
      className="h-full w-full touch-pan-y"
    >
      <Spline
        scene={selectedScene.sceneUrl}
        onLoad={handleLoad}
      />
    </div>
  );
};

export default RobotCanvas;