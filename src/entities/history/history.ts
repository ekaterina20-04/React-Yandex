const STORAGE_KEY = "report-history";
type HistoryRecord = {
  id: string;
  fileName: string;
  timestamp: number;
};
export function loadHistory(): HistoryRecord[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? (JSON.parse(raw) as HistoryRecord[]) : [];
}

export function saveHistory(records: HistoryRecord[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

export function addHistory(record: HistoryRecord): void {
  const existing = loadHistory();
  saveHistory([record, ...existing]);
}

export function clearHistory(): void {
  localStorage.removeItem(STORAGE_KEY);
}
