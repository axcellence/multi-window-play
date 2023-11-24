import "./style.css";

function isArcBrowser() {
  return getComputedStyle(document.documentElement).getPropertyValue(
    "--arc-palette-background"
  )
    ? 12
    : 0;
}

// get window size
function getWindowSize() {
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

// Update window size
function updateWindowSize() {
  const { width, height, left, top } = getWindowSize();
  document.documentElement.style.setProperty("--screenWidth", `${width}px`);
  document.documentElement.style.setProperty("--screenHeight", `${height}px`);
  document.documentElement.style.setProperty("--screenLeft", `${left}px`);
  document.documentElement.style.setProperty("--screenTop", `${top}px`);
}

// Initial setup
updateWindowSize();

// Update every 10 seconds
setInterval(updateWindowSize, 500);

// Update on resize using ResizeObserver
const resizeObserver = new ResizeObserver(updateWindowSize);
resizeObserver.observe(document.body);

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <img src="./blob.jpeg" alt="blob" />
`;
