import styles from "./FileError.module.css";

export const FileError = () => {
  return (
    <div className={styles.main_err}>
      <button className={styles.errButton}>file_name</button>
      <div className={styles.errText}>упс, не то...</div>
    </div>
  );
};
