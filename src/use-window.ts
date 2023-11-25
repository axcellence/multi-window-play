import { useEffect } from "react";
import { updateWindowSize } from "./helpers";

export function useWindow() {
  useEffect(() => {
    // Update using requestAnimationFrame
    function updateWindowSizeWithRAF() {
      updateWindowSize();
      requestAnimationFrame(updateWindowSizeWithRAF);
    }

    requestAnimationFrame(updateWindowSizeWithRAF); // Update on resize using ResizeObserver

    const resizeObserver = new ResizeObserver(updateWindowSize);
    resizeObserver.observe(document.body);
  }, []);
}
