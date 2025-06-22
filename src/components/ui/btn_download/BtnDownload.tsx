import styles from "./BtnDownload.module.css";

export const BtnDownload = () => {
  return (
    <button className={styles.downButton} disabled>
      Отправить
    </button>
  );
};
