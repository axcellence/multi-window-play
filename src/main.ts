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

// Update every 10 seconds
// setInterval(updateWindowSize, 100);
function updateWindowSizeWithRAF() {
  updateWindowSize();
  requestAnimationFrame(updateWindowSizeWithRAF);
}

requestAnimationFrame(updateWindowSizeWithRAF);

// Update on resize using ResizeObserver
const resizeObserver = new ResizeObserver(updateWindowSize);
resizeObserver.observe(document.body);

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  
`;

const dropzone = new Dropzone("div.my-dropzone", {
  url: "/file/post",
  maxFiles: 1,
  acceptedFiles: "image/*",
  autoProcessQueue: false,
  disablePreviews: true,
  addedfile: (file: Blob) => {
    // Create a URL representing the file
    const fileURL = URL.createObjectURL(file);

    // Set the URL as the src of the image
    img.src = fileURL;
    // disable dropzone
    dropzone.disable();
  }
});
const resetButton = document.createElement("button");
resetButton.textContent = "Reset";
resetButton.addEventListener("click", () => {
  img.src = "";

  // Clear the image from local storage
  localStorage.removeItem('image');

  // Reset the dropzone
  dropzone.enable();
  dropzone.removeAllFiles();
  document.querySelector<HTMLDivElement>("#app")!.appendChild(img);
  // remove reset button
  resetButton.remove();
});
// Select the file input and image elements
const img = document.createElement("img");
const storedImg = localStorage.getItem('image');

if (storedImg) {
  img.src = storedImg;
  dropzone.disable();
  document.querySelector<HTMLDivElement>("#app")!.appendChild(resetButton);
}
document.querySelector<HTMLDivElement>("#app")!.appendChild(img);

const reader = new FileReader();

dropzone.on("addedfile", (file: Blob) => {
  reader.onloadend = function() {
    // Convert image file to base64 string
    const base64String = reader.result as string;

    // Store base64 string in local storage
    localStorage.setItem('image', base64String);
  };

  reader.readAsDataURL(file);
  document.querySelector<HTMLDivElement>("#app")!.appendChild(resetButton);
});