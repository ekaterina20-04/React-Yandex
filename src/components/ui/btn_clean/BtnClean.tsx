import styles from "./BtnClean.module.css";

export const BtnClean = () => {
  return (
    <button className={styles.cleanButton} disabled>
      Очистить
    </button>
  );
};
