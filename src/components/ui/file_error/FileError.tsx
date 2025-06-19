import { Close } from "../close/Close";
import styles from "./FileError.module.css";

export const FileError = () => {
  return (
    <div className={styles.main_err}>
      <div className={styles.closing}>
        <button className={styles.errButton}>file_name</button>
        <Close />
      </div>

      <div className={styles.errText}>упс, не то...</div>
    </div>
  );
};
