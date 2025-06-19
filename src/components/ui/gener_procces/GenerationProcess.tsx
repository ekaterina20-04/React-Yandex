import styles from "./GenerationProcess.module.css";

export const GenerationProcess = () => {
  return (
    <div className={styles.main}>
      <div className={styles.loader}>O</div>

      <div className={styles.text}>идет процесс генерации</div>
    </div>
  );
};
