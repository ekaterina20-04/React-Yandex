import type { HighlightData } from "@/pages/AnaliticPage/AnaliticPage";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UploadState {
  uploadState: "initial" | "uploading" | "success" | "error";
  isParsing: boolean;
  selectedFile: File | null;
  highlights: HighlightData | null;
  isDragOver: boolean;

  // экшены
  setUploadState: (state: UploadState["uploadState"]) => void;
  setParsing: (parsing: boolean) => void;
  setFile: (file: File | null) => void;
  setHighlights: (h: HighlightData | null) => void;
  setDragOver: (drag: boolean) => void;
  resetAll: () => void;
  mergeHighlights: (h: Partial<HighlightData>) => void;
}

export const useUploadStore = create<
  UploadState,
  [["zustand/persist", UploadState]]
>(
  persist<UploadState>(
    (set, get) => ({
      // начальное состояние
      uploadState: "initial",
      isParsing: false,
      selectedFile: null,
      highlights: null,
      isDragOver: false,

      // экшены для управления состоянием
      setUploadState: (uploadState) => set({ uploadState }),

      setParsing: (isParsing) => set({ isParsing }),

      setFile: (selectedFile) => set({ selectedFile }),

      setHighlights: (highlights) => set({ highlights }),

      // частичное слияние incremental-данных
      mergeHighlights: (partial) =>
        set((state) => ({
          highlights: state.highlights
            ? { ...state.highlights, ...partial }
            : (partial as HighlightData),
        })),

      setDragOver: (isDragOver) => set({ isDragOver }),

      // сброс всего стейта в начальное состояние
      resetAll: () =>
        set({
          uploadState: "initial",
          isParsing: false,
          selectedFile: null,
          highlights: null,
          isDragOver: false,
        }),
    }),
    {
      name: "upload-storage", // ключ для persist в localStorage
    }
  )
);
