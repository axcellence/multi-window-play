import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { track } from "@vercel/analytics";
import { Analytics } from "@vercel/analytics/react";
import "./App.css";
import { useImageStore } from "./store";
import { useWindow } from "./use-window";
import { OpenButton } from "./components/open-new-window";
import { ResetButton } from "./components/reset";
import { CloseWindow } from "./components/close-window";

export default function App() {
  useWindow();
  const { imageUrl, setImageUrl } = useImageStore();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      track("image_dropped");
      acceptedFiles.forEach((file) => {
        const reader = new FileReader();

        reader.onabort = () => console.log("file reading was aborted");
        reader.onerror = () => console.log("file reading has failed");
        reader.onload = () => {
          // Do whatever you want with the file contents
          const binaryStr = reader.result;
          // binaryStr is the file's content as a binary string
          const base64String = btoa(
            new Uint8Array(binaryStr as ArrayBuffer).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ""
            )
          );
          setImageUrl(`data:image/png;base64,${base64String}`);
        };
        reader.readAsArrayBuffer(file);
      });
    },
    [setImageUrl]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
    },
  });

  return (
    <>
      <Analytics />
      <main>
        {imageUrl ? (
          <>
            <img className="select-none" src={imageUrl} alt="bg image" />
            <ActionBar />
          </>
        ) : (
          <div
            className={`absolute inset-0 grid place-items-center `}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <p>Drag 'n' drop an image (png, jpg) here</p>
            )}
          </div>
        )}
      </main>
    </>
  );
}

function ActionBar() {
  const windowNames = useImageStore((state) => state.windowNames);

  const windowNameExists = windowNames.includes(window.name);

  return (
    <div className="flex gap-4 bg-gradient-to-br from-white/30 to-white/5 text-neutral-900 font-semibold rounded-full py-2 px-6 fixed bottom-12 left-1/2 -translate-x-1/2 shadow-md border border-white/10 backdrop-blur-md">
      {!windowNameExists && (
        <>
          <ResetButton />
          <OpenButton />
        </>
      )}
      {windowNameExists && <CloseWindow />}
    </div>
  );
}
