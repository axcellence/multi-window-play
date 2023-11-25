import { useKey } from "react-use";
import { track } from "@vercel/analytics";

import { Button } from "./button";
import { CloseIcon } from "../icons";
import { useImageStore } from "../store";

function handleWindowClose() {
  track("window_closed");
  window.close();
  useImageStore.setState({
    windowNames: useImageStore
      .getState()
      .windowNames.filter((name) => name !== window.name),
  });
}

export function CloseWindow() {
  useKey("Escape", handleWindowClose);

  return <Button icon={<CloseIcon />} label="Close" onClick={handleWindowClose} />;
}
