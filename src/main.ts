import Dropzone from "dropzone";
import "dropzone/dist/dropzone.css";
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

// Update using requestAnimationFrame
function updateWindowSizeWithRAF() {
  updateWindowSize();
  requestAnimationFrame(updateWindowSizeWithRAF);
}

requestAnimationFrame(updateWindowSizeWithRAF);

// Update on resize using ResizeObserver
const resizeObserver = new ResizeObserver(updateWindowSize);
resizeObserver.observe(document.body);

const dropzone = new Dropzone("div.my-dropzone", {
  url: "/file/post",
  maxFiles: 1,
  acceptedFiles: "image/*",
  autoProcessQueue: false,
  // @ts-ignore
  disablePreviews: true,
  addedfile: (file: Blob) => {
    // Create a URL representing the file
    const fileURL = URL.createObjectURL(file);

    // Set the URL as the src of the image
    img.src = fileURL;
    // disable dropzone
    dropzone.disable();
  },
});

// add button open same url in new window
const openButton = document.createElement("button");
openButton.textContent = "Open";
openButton.classList.add("open-button");

openButton.addEventListener("click", () => {
  const currentURL = window.location.href;
  // generate new window name
  const windowName =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);

  // generate window features, position and size (unique)
  // height between 200 and 800
  // width between 200 and 800
  const height = Math.floor(Math.random() * 600) + 200;
  const width = Math.floor(Math.random() * 600) + 200;
  // top between 0 and screen height - height
  // left between 0 and screen width - width
  const top = Math.floor(Math.random() * (getWindowSize().height - height));
  const left = Math.floor(Math.random() * (getWindowSize().width - width));
  const windowFeatures = `height=${height},width=${width},top=${top},left=${left},popup=1,resizable=1`;
  window.open(currentURL, windowName, windowFeatures);
});

const killButton = document.createElement("button");
killButton.textContent = "Kill";
killButton.classList.add("kill-button");

// close all popups on click
killButton.addEventListener("click", () => {
  window.close();
});

// kill on escape too
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    window.close();
  }
});

const resetButton = document.createElement("button");
resetButton.textContent = "Reset";
resetButton.classList.add("reset-button");

resetButton.addEventListener("click", () => {
  img.src = "";

  // Clear the image from local storage
  localStorage.removeItem("image");

  // Reset the dropzone
  dropzone.enable();
  dropzone.removeAllFiles();
  document.querySelector<HTMLDivElement>("#app")!.appendChild(img);
  // remove reset button
  resetButton.remove();
  openButton.remove();
});
// Select the file input and image elements
const img = document.createElement("img");
const storedImg = localStorage.getItem("image");

if (storedImg) {
  img.src = storedImg;
  dropzone.disable();
  document.querySelector<HTMLDivElement>("#app")!.appendChild(resetButton);
  document.querySelector<HTMLDivElement>("#app")!.appendChild(openButton);
  document.querySelector<HTMLDivElement>("#app")!.appendChild(killButton);
}
document.querySelector<HTMLDivElement>("#app")!.appendChild(img);

const reader = new FileReader();

dropzone.on("addedfile", (file: Blob) => {
  reader.onloadend = function () {
    // Convert image file to base64 string
    const base64String = reader.result as string;

    // Store base64 string in local storage
    localStorage.setItem("image", base64String);
  };

  reader.readAsDataURL(file);
  document.querySelector<HTMLDivElement>("#app")!.appendChild(resetButton);
  document.querySelector<HTMLDivElement>("#app")!.appendChild(openButton);
  document.querySelector<HTMLDivElement>("#app")!.appendChild(killButton);
});
