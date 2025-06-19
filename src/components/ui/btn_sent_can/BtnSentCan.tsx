import styles from "./BtnSentCan.module.css";

export const BtnSentCan = () => {
  return (
    <button className={styles.sendButtonCan} disabled>
      Отправить
    </button>
  );
};
