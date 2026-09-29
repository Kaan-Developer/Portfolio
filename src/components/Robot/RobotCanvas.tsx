import { useRef } from "react";
import Spline from "@splinetool/react-spline";
import { Application } from "@splinetool/runtime";



const RobotCanvas = () => {
  const splineRef = useRef<Application | null>
  (null);

  const handleLoad = (splineApp: Application) => {
    splineRef.current = splineApp;

    const isMobile = window.innerWidth < 768
    const zoomLevel = isMobile ? 1.15 : 1.35;

    splineApp.setZoom(zoomLevel);
  }

  return (
    <div className="h-full w-full">
      <Spline scene="https://prod.spline.design/Q88sjYL64X6gO-4Y/scene.splinecode"
       onLoad={handleLoad} />
    </div>
  );
};

export default RobotCanvas;