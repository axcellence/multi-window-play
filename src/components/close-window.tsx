import React from "react";
import { useKey } from "react-use";

import { Button } from "./button";
import { CloseIcon } from "../icons";
import { useImageStore } from "../store";

function handleWindowClose() {
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
