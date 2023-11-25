import { create } from "zustand";
import { persist } from "zustand/middleware";

type State = {
  imageUrl: string;
  setImageUrl: (imageUrl: string) => void;
  windowNames: string[];
  setWindowNames: (windowNames: string[]) => void;
  addWindowName: (windowName: string) => void;
};

export const useImageStore = create<State>()(
  persist(
    (set) => ({
      imageUrl: "",
      setImageUrl: (imageUrl: string) => set({ imageUrl }),
      windowNames: [],
      setWindowNames: (windowNames: string[]) => set({ windowNames }),
      addWindowName: (windowName: string) =>
        set((state) => ({
          windowNames: [...state.windowNames, windowName],
        })),
    }),
    {
      name: "image-store",
    }
  )
);
