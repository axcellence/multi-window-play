import { useKey } from 'react-use';
import { track } from "@vercel/analytics";

import { useImageStore } from '../store';
import { Button } from './button';
import { BackIcon } from '../icons';

export function ResetButton() {
  track("reset");
  const setImageUrl = useImageStore((state) => state.setImageUrl);
  const setWindowNames = useImageStore((state) => state.setWindowNames);
  useKey('r', handleReset);

  function handleReset() {
    setImageUrl("");
    setWindowNames([]);
  }

  return <Button icon={<BackIcon />} label="Reset" onClick={handleReset} />;
}