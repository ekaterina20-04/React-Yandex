import { BtnGeneration } from "@/components/ui/generation_btn/BtnGeneration";
import styles from "./GeneratorPage.module.css";
import { GenerationProcess } from "@/components/ui/gener_procces/GenerationProcess";
import { useState } from "react";
import { fetchReport } from "@/entities/report/api";
import { FileError } from "@/components/ui/file_error/FileError";
import { addHistory } from "@/entities/report/history/history";
export const GeneratorPage = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const downloadCSV = (csvData: string, fileName: string) => {
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleLoad = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchReport({ size: 0.1 });

      const fileName = `report_${Date.now()}.csv`;
      downloadCSV(result, fileName);

      addHistory({
        id: crypto.randomUUID(),
        fileName,
        timestamp: Date.now(),
      });

      setData(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className={styles.main}>
        <div className={styles.text}>
          Сгенерируйте готовый csv-файл нажатием одной кнопки
        </div>
        <div className={styles.btn} onClick={handleLoad}>
          {!loading && !error && <BtnGeneration />}
          {loading && <GenerationProcess />}
          {error && <FileError />}
        </div>
      </div>
    </>
  );
};
