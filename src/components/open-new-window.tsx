import { useKey } from "react-use";

import { useImageStore } from "../store";
import { getWindowSize } from "../helpers";
import { WindowIcon } from "../icons";
import { Button } from "./button";

export async function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function handleOpenMultiple(times: number) {
  for (let i = 0; i < times; i++) {
    handleOpen();
    wait(1000);
  }
}

function handleOpen() {
  const windowName = crypto.randomUUID();
  useImageStore.setState({
    windowNames: [...useImageStore.getState().windowNames, windowName],
  });

  const height = Math.floor(Math.random() * 800) + 200;
  const width = Math.floor(Math.random() * 800) + 200;
  const top = Math.floor(Math.random() * (getWindowSize().height - height));
  const left = Math.floor(Math.random() * (getWindowSize().width - width));

  const windowFeatures = `height=${height},width=${width},top=${top},left=${left},popup=1,resizable=1`;

  window.open(window.location.href, windowName, windowFeatures);
}

export function OpenButton() {
  useKey(" ", handleOpen);
  useKey("5", () => handleOpenMultiple(5));

  return <Button icon={<WindowIcon />} label="Open" onClick={handleOpen} />;
}
