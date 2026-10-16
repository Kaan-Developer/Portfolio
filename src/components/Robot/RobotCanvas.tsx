import { lazy, Suspense, useEffect, useRef, useState } from "react";
import type { Application } from "@splinetool/runtime";

import ErrorBoundary from "../feedback/ErrorBoundary";
import Loading from "../feedback/Loading";

const Spline = lazy(() => import("@splinetool/react-spline"));

interface Scene {
  id: number;
  sceneUrl: string;
  frame?: { width: number; height: number };
  backgroundObjectId?: string;
}

interface RobotCanvasProps {
  sceneId: number;
}

const scenes: Scene[] = [
  { id: 1, sceneUrl: import.meta.env.VITE_ROBOT_1_URL },
  {
    id: 2,
    sceneUrl: import.meta.env.VITE_ROBOT_2_URL,
    backgroundObjectId: "9e0f8cf5-5312-4321-bf8b-da4b800916aa",
    // Covers this scene's camera offset, robot movement and Spline badge clearance.
    frame: { width: 400, height: 480 },
  },
];

const fitScene = (app: Application, container: HTMLDivElement, scene: Scene) => {
  if (!scene.frame) return;

  const { clientWidth: width, clientHeight: height } = container;
  const padding = 32;
  if (width <= padding * 2 || height <= padding * 2) return;

  app.setZoom(
    Math.min(
      (width - padding * 2) / scene.frame.width,
      (height - padding * 2) / scene.frame.height,
    ),
  );
};

const checkIsMobile = () => {
  if (typeof window === "undefined") return false;

  return window.innerWidth < 1024;
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
  const [attempt, setAttempt] = useState(0);
  const [loadError, setLoadError] = useState<string | null>(null);

  const selectedScene = scenes.find((scene) => scene.id === sceneId);

  const handleSceneError = (error: Error) => {
    appRef.current = null;
    setLoadError(error.message);
    setIsLoading(false);
  };

  const handleRetry = () => {
    appRef.current = null;
    setLoadError(null);
    setIsLoading(true);
    setAttempt((previous) => previous + 1);
  };

  const handleLoad = (splineApp: Application) => {
    appRef.current = splineApp;

    if (selectedScene?.backgroundObjectId) {
      splineApp.findObjectById(selectedScene.backgroundObjectId)?.hide();
    }

    if (containerRef.current && selectedScene) {
      fitScene(splineApp, containerRef.current, selectedScene);
    }

    if (!inViewRef.current) splineApp.stop();

    setIsLoading(false);
  };

  useEffect(() => {
    const handleResize = () => {
      const mobile = checkIsMobile();
      if (mobile === isMobile) return;

      appRef.current = null;
      setIsMobile(mobile);

      if (!mobile) setIsLoading(true);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobile]);

  useEffect(() => {
    const container = containerRef.current;
    if (isMobile || !container || !selectedScene?.frame) return;
    if (typeof ResizeObserver === "undefined") return;

    const observer = new ResizeObserver(() => {
      if (appRef.current) fitScene(appRef.current, container, selectedScene);
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, [isMobile, selectedScene]);

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
      <ErrorBoundary
        key={`${sceneId}:${attempt}`}
        onError={handleSceneError}
        fallback={
          <div role="alert" className="flex h-full flex-col items-center justify-center gap-3 px-4 text-center text-sm text-muted">
            <p>The robot could not load.</p>
            {import.meta.env.DEV && loadError && (
              <p className="max-w-full break-words text-xs">{loadError}</p>
            )}
            <button
              type="button"
              onClick={handleRetry}
              className="cursor-pointer rounded-full border border-border px-4 py-2 text-ink"
            >
              Try again
            </button>
          </div>
        }
      >
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
