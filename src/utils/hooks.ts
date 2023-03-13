import { useState, useEffect } from "react";
import { TWindowSize } from "../types/types";

export function useWindowSize(): TWindowSize {
  const [windowSize, setWindowSize] = useState<TWindowSize>({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    function onResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", onResize);
    onResize();
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return windowSize;
}
