import { useImageStore } from '../store';
import { Button } from './button';
import { BackIcon } from '../icons';

export function ResetButton() {
  const setImageUrl = useImageStore((state) => state.setImageUrl);
  const setWindowNames = useImageStore((state) => state.setWindowNames);

  function handleReset() {
    setImageUrl("");
    setWindowNames([]);
  }

  return <Button icon={<BackIcon />} label="Reset" onClick={handleReset} />;
}