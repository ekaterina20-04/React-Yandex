import { useEffect, useState } from "react";
import styles from "./HistoryPage.module.css";
import type { HistoryItem } from "@/entities/history/saveToHistory";
import { Modal } from "./HistoryModal";
import { dayOfYearToDateString } from "@/entities/aggregate/dayOfYear";

export const HistoryPage = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);

  useEffect(() => {
    const data = localStorage.getItem("uploadHistory");
    if (data) {
      setHistory(JSON.parse(data));
    }
  }, []);
  const openModal = (item: HistoryItem) => {
    if (item.success) {
      setSelectedItem(item);
    }
  };
  const closeModal = () => setSelectedItem(null);

  const deleteItem = (key: string) => {
    const data = localStorage.getItem("uploadHistory");
    if (data) {
      const parsed: HistoryItem[] = JSON.parse(data);
      const updated = parsed.filter((item) => item.id !== key);
      localStorage.setItem("uploadHistory", JSON.stringify(updated));
      setHistory(updated);
    }
  };
  return (
    <>
      <div className={styles.main}>
        {history.length === 0 ? (
          <></>
        ) : (
          history.map((item) => (
            <div className={styles.block_file}>
              <div
                onClick={() => openModal(item)}
                style={{ cursor: item.success ? "pointer" : "default" }}
                key={item.id}
                className={styles.purple_block}
              >
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
                      item.success
                        ? "/img/success_black.png"
                        : "/img/success.png"
                    }
                    alt=""
                  />
                </div>
                <div
                  className={
                    !item.success ? styles.success : styles.success_not
                  }
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
              <div
                className={styles.delete}
                onClick={() => deleteItem(item.id)}
              >
                <img src="/img/crash_history.png" alt="delete" />
              </div>
            </div>
          ))
        )}
      </div>
      {selectedItem && selectedItem.highlights && (
        <Modal onClose={closeModal}>
          <div className={styles.white_block}>
            <div className={styles.block_text}>
              <p className={styles.params_text}>
                {selectedItem.highlights.total_spend_galactic}
              </p>
              <p>общие расходы в галактических кредитах</p>
            </div>
          </div>

          <div className={styles.white_block}>
            <div className={styles.block_text}>
              <p className={styles.params_text}>
                {selectedItem.highlights.rows_affected}
              </p>
              <p>количество обработанных записей</p>
            </div>
          </div>
          <div className={styles.white_block}>
            <div className={styles.block_text}>
              <p className={styles.params_text}>
                {selectedItem.highlights.big_spent_at != null
                  ? dayOfYearToDateString(selectedItem.highlights.big_spent_at)
                  : "-"}
              </p>
              <p>день года с максимальными расходами</p>
            </div>
          </div>
          <div className={styles.white_block}>
            <div className={styles.block_text}>
              <p className={styles.params_text}>
                {selectedItem.highlights.big_spent_civ}
              </p>
              <p>цивилизация с максимальными расходами</p>
            </div>
          </div>
          <div className={styles.white_block}>
            <div className={styles.block_text}>
              <p className={styles.params_text}>
                {selectedItem.highlights.less_spent_civ}
              </p>
              <p>цивилизация с минимальными расходами</p>
            </div>
          </div>
          <div className={styles.white_block}>
            <div className={styles.block_text}>
              <p className={styles.params_text}>
                {selectedItem.highlights.less_spent_at != null
                  ? dayOfYearToDateString(selectedItem.highlights.less_spent_at)
                  : "-"}
              </p>
              <p>день года с минимальными расходами </p>
            </div>
          </div>
          <div className={styles.white_block}>
            <div className={styles.block_text}>
              <p className={styles.params_text}>
                {selectedItem.highlights.big_spent_value}
              </p>
              <p>максимальная сумма расходов за день </p>
            </div>
          </div>
          <div className={styles.white_block}>
            <div className={styles.block_text}>
              <p className={styles.params_text}>
                {selectedItem.highlights.average_spend_galactic}
              </p>
              <p> средние расходы в галактических кредитах</p>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};
