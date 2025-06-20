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
            <div key={item.id} className={styles.purple_block}>
              <div className={styles.file_name}>
                <img src="/img/file_icon.png" alt="file_icon" />
                <p>{item.fileName}</p>
              </div>
              <div className={styles.date}>{item.date}</div>

              <div
                className={item.success ? styles.success : styles.success_not}
              >
                <p>Обработан успешно</p>{" "}
                <img
                  src={
                    item.success ? "/img/success_black.png" : "/img/success.png"
                  }
                  alt=""
                />
              </div>
              <div
                className={!item.success ? styles.success : styles.success_not}
              >
                <p>Не удалось обработать</p>
                <img
                  src={
                    item.success
                      ? "/img/not_success.png"
                      : "/img/not_success_black.png"
                  }
                  alt=""
                />
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};
