export function isArcBrowser() {
  return getComputedStyle(document.documentElement).getPropertyValue(
    "--arc-palette-background"
  )
    ? 12
    : 0;
}

export function getWindowSize() {
  return {
    width: window.screen.width,
    height: window.screen.height,
    top:
      (window.screenTop +
        (window.outerHeight - window.innerHeight) -
        isArcBrowser()) *
      -1,
    left: window.screenLeft * -1,
  };
}

export function updateWindowSize() {
  const { width, height, left, top } = getWindowSize();
  document.documentElement.style.setProperty("--screenWidth", `${width}px`);
  document.documentElement.style.setProperty("--screenHeight", `${height}px`);
  document.documentElement.style.setProperty("--screenLeft", `${left}px`);
  document.documentElement.style.setProperty("--screenTop", `${top}px`);
}
