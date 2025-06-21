import styles from "./GenerationProcess.module.css";

export const GenerationProcess = () => {
  return (
    <div className={styles.main}>
      <div className={styles.loader}>
        <img src="/img/loader.png" className={styles.loader_img} alt="" />
      </div>
    </div>
  );
};
