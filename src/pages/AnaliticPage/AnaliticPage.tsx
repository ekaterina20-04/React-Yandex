import { BtnUpload } from "@/components/ui/btn_upload/BtnUpload";
import styles from "./AnaliticPage.module.css";
import { BtnSent } from "@/components/ui/btn_sent/BtnSent";
import { useState } from "react";
import { FileSuccess } from "@/components/ui/file_success/FileSuccess";
import { FileError } from "@/components/ui/file_error/FileError";
import { BtnDownload } from "@/components/ui/btn_download/BtnDownload";
import { BtnClean } from "@/components/ui/btn_clean/BtnClean";
import { BtnSentCan } from "@/components/ui/btn_sent_can/BtnSentCan";

export const AnaliticPage = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadState, setUploadState] = useState<
    "initial" | "uploading" | "success" | "error"
  >("initial");

  const handleFileUpload = async (file: File) => {
    console.log("Загружается:", file.name);

    setUploadState("uploading");
    try {
      if (!file.name.endsWith(".csv")) {
        throw new Error("Недопустимый формат файла");
      }

      if (file.size > 10 * 1024 * 1024) {
        throw new Error("Файл слишком большой");
      }

      // Здесь может быть настоящая отправка:
      // await uploadToServer(file)

      // Эмуляция запроса
      // await new Promise((resolve) => setTimeout(resolve, 2000));

      // Если всё прошло хорошо
      setUploadState("success");
    } catch (err) {
      console.error("Ошибка загрузки:", err);
      setUploadState("error");
    }
  };
  return (
    <>
      <div className={styles.main}>
        <p className={styles.title}>
          Загрузите <b>csv</b> файл и получите <b>полную информацию</b> о нём
          за сверхнизкое время
        </p>
        <div
          className={`
            ${styles.purple_block}
            ${uploadState === "success" ? styles.frameInitial : ""}
            ${uploadState === "uploading" ? styles.frameUploading : ""}
            ${uploadState === "success" ? styles.frameSuccess : ""}
            ${uploadState === "error" ? styles.frameError : ""}
          `}
        >
          <div className={styles.functional}>
            <div className={styles.button}>
              {uploadState === "uploading" || uploadState === "initial" ? (
                <BtnUpload onFileSelect={handleFileUpload} />
              ) : uploadState === "success" ? (
                <FileSuccess />
              ) : (
                <FileError></FileError>
              )}
            </div>
            <div className={styles.for_p}>
              <p className={styles.text_functional}>или перетащите сюда</p>
            </div>
          </div>
        </div>
        <div className={styles.btn_sent}>
          {uploadState === "uploading" || uploadState === "initial" ? (
            <BtnSent />
          ) : uploadState === "success" ? (
            <BtnSentCan />
          ) : (
            <></>
          )}
        </div>
        <div className={styles.here_have}>
          Здесь <br />
          появятся хайлайты
        </div>
      </div>
    </>
  );
};
