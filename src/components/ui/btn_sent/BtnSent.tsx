import styles from "./BtnSent.module.css";

export const BtnSent = () => {
  return (
    <button className={styles.sendButton} disabled>
      Отправить
    </button>
  );
};
