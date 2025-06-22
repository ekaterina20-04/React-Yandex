import type { HighlightData } from "@/pages/AnaliticPage/AnaliticPage";
export type HistoryItem = {
  id: string;
  date: string;
  fileName: string;
  success: boolean;
  highlights: HighlightData | null;
};
export function saveToHistory(item: HistoryItem) {
  const existing = localStorage.getItem("uploadHistory");
  const history: HistoryItem[] = existing ? JSON.parse(existing) : [];
  history.unshift(item);
  localStorage.setItem("uploadHistory", JSON.stringify(history));
}
