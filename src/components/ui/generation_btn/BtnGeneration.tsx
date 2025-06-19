import styles from "./BtnGeneration.module.css";

export const BtnGeneration = () => {
  return (
    <button className={styles.btnGeneration} disabled>
      Начать генерацию
    </button>
  );
};
