import { BtnUpload } from "@/components/ui/btn_upload/BtnUpload";
import styles from "./AnaliticPage.module.css";
import { BtnSent } from "@/components/ui/btn_sent/BtnSent";
import { useState } from "react";
import { FileSuccess } from "@/components/ui/file_success/FileSuccess";
import { FileError } from "@/components/ui/file_error/FileError";
import { BtnDownload } from "@/components/ui/btn_download/BtnDownload";
import { BtnClean } from "@/components/ui/btn_clean/BtnClean";
import { GenerationProcess } from "@/components/ui/gener_procces/GenerationProcess";
import { BtnSentCan } from "@/components/ui/btn_sent_can/BtnSentCan";
import { dayOfYearToDateString } from "@/entities/aggregate/dayOfYear";
import { saveToHistory } from "@/entities/history/saveToHistory";
import { generateId } from "@/entities/aggregate/generateId";
export type HighlightData = {
  total_spend_galactic: number;
  average_spend_galactic: number;
  rows_affected: number;
  less_spent_at: number;
  big_spent_at: number;
  less_spent_civ: string;
  big_spent_civ: string;
  less_spent_value: number;
  big_spent_value: number;
};

export const AnaliticPage = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadState, setUploadState] = useState<
    "initial" | "uploading" | "success" | "error"
  >("initial");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [highlights, setHighlights] = useState<HighlightData | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isParsing, setIsParsing] = useState(false);

  const handleFileUpload = async (file: File) => {
    console.log("Загружается:", file.name);

    setUploadState("uploading");
    try {
      if (!file.name.endsWith(".csv")) {
        throw new Error("Недопустимый формат файла");
      }

      setSelectedFile(file);

      setUploadState("success");
    } catch (err) {
      console.error("Ошибка загрузки:", err);
      setUploadState("error");
      setSelectedFile(null);
    }
  };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileUpload(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };
  const getFrameClass = () => {
    if (isDragOver || uploadState === "uploading") return styles.frameUploading;
    if (uploadState === "success") return styles.frameSuccess;
    if (uploadState === "error") return styles.frameError;
    return styles.frameInitial;
  };
  const handleSendClick = async () => {
    console.log("click");
    setIsParsing(true);
    if (!selectedFile) {
      alert("Файл не выбран");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      const BASE_URL = import.meta.env.VITE_BASE_URL;

      const response = await fetch(`${BASE_URL}/aggregate?rows=100`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert("Ошибка сервера: " + errorData.error);
        return;
      }

      if (!response.body) {
        alert("Ошибка: пустой ответ");
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let { value, done } = await reader.read();
      let buffer = "";

      while (!done) {
        buffer += decoder.decode(value, { stream: true });

        // Разбиваем по строкам (ответ - json lines)
        const lines = buffer.split("\n");

        // Последняя строка может быть неполной, оставляем ее в буфере
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (line.trim()) {
            try {
              const parsed: HighlightData = JSON.parse(line);
              setHighlights((prev) => ({ ...prev, ...parsed }));

              console.log("Получен объект:", parsed);
            } catch (e) {
              console.warn("Не удалось распарсить JSON:", line);
            }
          }
        }

        ({ value, done } = await reader.read());
      }

      // Обработка остатка в буфере после окончания потока
      if (buffer.trim()) {
        try {
          const parsed: HighlightData = JSON.parse(buffer);
          console.log("Получен объект:", parsed);
          setHighlights(parsed);
        } catch (e) {
          console.warn("Не удалось распарсить JSON:", buffer);
        }
      }

      alert("Агрегация завершена");
      console.log("hightlotns", highlights);
      setIsParsing(false);
      setUploadState("initial");
      if (highlights) {
        saveToHistory({
          id: generateId(),
          date: new Date().toISOString(),
          fileName: selectedFile.name,
          success: true,
          highlights: { ...highlights },
        });
      }
    } catch (error) {
      alert("Ошибка при отправке: " + error);
      setIsParsing(false);
      setUploadState("initial");

      saveToHistory({
        id: generateId(),
        date: new Date().toISOString(),
        fileName: selectedFile.name,
        success: false,
        highlights: null,
      });
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setUploadState("initial");
    setHighlights(null);
    setIsParsing(false);
    console.log("close");
  };
  return (
    <>
      <div className={styles.main}>
        <p className={styles.title}>
          Загрузите <b>csv</b> файл и получите <b>полную информацию</b> о нём
          за сверхнизкое время
        </p>
        <div
          className={`${styles.purple_block} ${getFrameClass()}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className={styles.functional}>
            <div className={styles.button}>
              {isParsing && uploadState !== "initial" ? (
                <>
                  <GenerationProcess />
                  <div className={styles.text}>идет парсинг файла </div>
                </>
              ) : uploadState === "uploading" || uploadState === "initial" ? (
                <>
                  <BtnUpload onFileSelect={handleFileUpload} />
                  <div className={styles.for_p}>
                    <p className={styles.text_functional}>
                      или перетащите сюда
                    </p>
                  </div>
                </>
              ) : uploadState === "success" ? (
                <>
                  <FileSuccess onClose={handleReset} />
                  <div className={styles.for_p}>
                    <p className={styles.text_functional}>файл загружен!</p>
                  </div>
                </>
              ) : (
                <FileError onClose={handleReset}></FileError>
              )}
            </div>
          </div>
        </div>
        <div className={styles.btn_sent}>
          {uploadState === "uploading" || uploadState === "initial" ? (
            <BtnSent />
          ) : uploadState === "success" && !isParsing ? (
            <div onClick={handleSendClick}>
              <BtnSentCan />
            </div>
          ) : (
            <></>
          )}
        </div>
        {!highlights ? (
          <div className={styles.here_have}>
            Здесь <br />
            появятся хайлайты
          </div>
        ) : (
          <div className={styles.highlits_main}>
            <div className={styles.white_block}>
              <div className={styles.block_text}>
                <p className={styles.params_text}>
                  {highlights.total_spend_galactic}
                </p>
                <p>общие расходы в галактических кредитах</p>
              </div>
            </div>

            <div className={styles.white_block}>
              <div className={styles.block_text}>
                <p className={styles.params_text}>{highlights.rows_affected}</p>
                <p>количество обработанных записей</p>
              </div>
            </div>
            <div className={styles.white_block}>
              <div className={styles.block_text}>
                <p className={styles.params_text}>
                  {highlights.big_spent_at != null
                    ? dayOfYearToDateString(highlights.big_spent_at)
                    : "-"}
                </p>
                <p>день года с максимальными расходами</p>
              </div>
            </div>
            <div className={styles.white_block}>
              <div className={styles.block_text}>
                <p className={styles.params_text}>{highlights.big_spent_civ}</p>
                <p>цивилизация с максимальными расходами</p>
              </div>
            </div>
            <div className={styles.white_block}>
              <div className={styles.block_text}>
                <p className={styles.params_text}>
                  {highlights.less_spent_civ}
                </p>
                <p>цивилизация с минимальными расходами</p>
              </div>
            </div>
            <div className={styles.white_block}>
              <div className={styles.block_text}>
                <p className={styles.params_text}>
                  {highlights.less_spent_at != null
                    ? dayOfYearToDateString(highlights.less_spent_at)
                    : "-"}
                </p>
                <p>день года с минимальными расходами </p>
              </div>
            </div>
            <div className={styles.white_block}>
              <div className={styles.block_text}>
                <p className={styles.params_text}>
                  {highlights.big_spent_value}
                </p>
                <p>максимальная сумма расходов за день </p>
              </div>
            </div>
            <div className={styles.white_block}>
              <div className={styles.block_text}>
                <p className={styles.params_text}>
                  {highlights.average_spend_galactic}
                </p>
                <p> средние расходы в галактических кредитах</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
