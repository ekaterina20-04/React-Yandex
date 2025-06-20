import { useEffect, useState } from "react";
import styles from "./HistoryPage.module.css";
import type { HistoryItem } from "@/entities/history/saveToHistory";

export const HistoryPage = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const data = localStorage.getItem("uploadHistory");
    if (data) {
      setHistory(JSON.parse(data));
    }
  }, []);
  return (
    <>
      <div className={styles.main}>
        {history.length === 0 ? (
          <></>
        ) : (
          history.map((item) => (
            <div className={styles.purple_block}>
              <div className={styles.file_name}>
                <img src="/img/file_icon.png" alt="file_icon" />
                <p>{}</p>
              </div>
              <div className={styles.date}>date</div>
              <div className={styles.success}>
                <p>Обработан успешно</p> <img src="/img/success.png" alt="" />
              </div>
              <div className={styles.not_success}>
                {" "}
                <p>Не удалось обработать</p>
                <img src="/img/not_success.png" alt="" />
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};
