import { BtnUpload } from "@/components/ui/btn_upload/BtnUpload";
import styles from "./AnaliticPage.module.css";
import { BtnSent } from "@/components/ui/btn_sent/BtnSent";
import { FileSuccess } from "@/components/ui/file_success/FileSuccess";
import { FileError } from "@/components/ui/file_error/FileError";
import { GenerationProcess } from "@/components/ui/gener_procces/GenerationProcess";
import { BtnSentCan } from "@/components/ui/btn_sent_can/BtnSentCan";
import { dayOfYearToDateString } from "@/entities/aggregate/dayOfYear";
import { saveToHistory } from "@/entities/history/saveToHistory";
import { generateId } from "@/entities/aggregate/generateId";
import { useUploadStore } from "@/entities/aggregate/uploadStore";
import { FileReady } from "@/components/ui/file_ready/FileReady";
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
  const {
    uploadState,
    isParsing,
    selectedFile,
    highlights,
    isDragOver,

    setUploadState,
    setParsing,
    setFile,
    setHighlights,
    mergeHighlights,
    setDragOver,
    resetAll,
  } = useUploadStore();

  const handleFileUpload = (file: File) => {
    setFile(file);

    setUploadState("uploading");

    if (!file.name.endsWith(".csv")) {
      setUploadState("error");
      return;
    }

    setUploadState("success");
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileUpload(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const getFrameClass = () => {
    if (isDragOver || uploadState === "uploading") return styles.frameUploading;
    if (uploadState === "success") return styles.frameSuccess;
    if (uploadState === "error") return styles.frameError;
    return styles.frameInitial;
  };

  const handleSendClick = async () => {
    setParsing(true);
    if (!selectedFile) {
      setParsing(false);
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
        throw new Error(errorData.error || "Серверная ошибка");
      }
      if (!response.body) {
        throw new Error("Пустой ответ от сервера");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let done = false;

      while (!done) {
        const { value, done: d } = await reader.read();
        done = d;
        buffer += decoder.decode(value || new Uint8Array(), { stream: true });

        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (!line.trim()) continue;
          try {
            const parsed: Partial<HighlightData> = JSON.parse(line);
            mergeHighlights(parsed);
          } catch {
            console.warn("Не удалось распарсить JSON:", line);
          }
        }
      }

      if (buffer.trim()) {
        try {
          const parsed: Partial<HighlightData> = JSON.parse(buffer);
          mergeHighlights(parsed);
        } catch {
          console.warn("Не удалось распарсить остаток буфера:", buffer);
        }
      }

      setParsing(false);
      setUploadState("ready");

      const finalHighlights = useUploadStore.getState().highlights;
      if (finalHighlights) {
        saveToHistory({
          id: generateId(),
          date: new Date().toISOString(),
          fileName: selectedFile.name,
          success: true,
          highlights: finalHighlights,
        });
      }
    } catch (err: any) {
      setParsing(false);
      setUploadState("initial");
      saveToHistory({
        id: generateId(),
        date: new Date().toISOString(),
        fileName: selectedFile?.name || "—",
        success: false,
        highlights: null,
      });
    }
  };

  const handleReset = () => {
    resetAll();
  };
  return (
    <>
      <div className={styles.main}>
        <p className={styles.title}>
          Загрузите <b>csv</b> файл и получите <b>полную информацию</b> о нём за
          сверхнизкое время
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
              ) : uploadState === "ready" ? (
                <>
                  <FileReady
                    fileName={selectedFile?.name ?? "—"}
                    onClose={handleReset}
                  />
                </>
              ) : uploadState === "success" ? (
                <>
                  <FileSuccess
                    fileName={selectedFile?.name ?? "—"}
                    onClose={handleReset}
                  />
                  <div className={styles.for_p}>
                    <p className={styles.text_functional}>файл загружен!</p>
                  </div>
                </>
              ) : (
                <FileError
                  fileName={selectedFile?.name ?? "—"}
                  onClose={handleReset}
                ></FileError>
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
