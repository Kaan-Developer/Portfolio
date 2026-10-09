import { lazy, Suspense, useEffect, useRef, useState } from "react";
import type { Application } from "@splinetool/runtime";

import ErrorBoundary from "../feedback/ErrorBoundary";
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

const supportsIntersectionObserver = () =>
  typeof IntersectionObserver !== "undefined";

const RobotCanvas = ({ sceneId }: RobotCanvasProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const appRef = useRef<Application | null>(null);
  const inViewRef = useRef(!supportsIntersectionObserver());

  const [isMobile, setIsMobile] = useState(checkIsMobile);
  const [isLoading, setIsLoading] = useState(true);
  const [inView, setInView] = useState(() => !supportsIntersectionObserver());
  const [hasEntered, setHasEntered] = useState(
    () => !supportsIntersectionObserver(),
  );

  const selectedScene = scenes.find((scene) => scene.id === sceneId);

  const handleLoad = (splineApp: Application) => {
    splineApp.setZoom(1.55);
    appRef.current = splineApp;

    if (!inViewRef.current) splineApp.stop();

    setIsLoading(false);
  };

  useEffect(() => {
    const handleResize = () => {
      const mobile = checkIsMobile();
      setIsMobile(mobile);

      if (!mobile) setIsLoading(true);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (isMobile || !container) return;

    const handleWheel = (event: WheelEvent) => event.stopPropagation();
    container.addEventListener("wheel", handleWheel, {
      capture: true,
      passive: true,
    });

    return () => {
      container.removeEventListener("wheel", handleWheel, { capture: true });
    };
  }, [isMobile]);

  // Start loading shortly before the canvas enters the viewport.
  useEffect(() => {
    const element = containerRef.current;
    if (isMobile || !element) return;

    if (!supportsIntersectionObserver()) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;
        inViewRef.current = visible;
        setInView(visible);
        if (visible) setHasEntered(true);
      },
      { rootMargin: "200px 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [isMobile]);

  // Pause Spline when it is outside the viewport.
  useEffect(() => {
    const app = appRef.current;
    if (!app) return;

    if (inView) app.play();
    else app.stop();
  }, [inView]);

  if (!selectedScene || isMobile) return null;

  return (
    <div ref={containerRef} className="relative h-full w-full touch-pan-y">
      {isLoading && (
        <div className="absolute inset-0 z-10">
          <Loading />
        </div>
      )}
      <ErrorBoundary onError={() => setIsLoading(false)}>
        <Suspense fallback={null}>
          {hasEntered && (
            <Spline scene={selectedScene.sceneUrl} onLoad={handleLoad} />
          )}
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default RobotCanvas;
