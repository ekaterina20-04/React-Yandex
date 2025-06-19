import { Close } from "../close/Close";
import styles from "./FileSuccess.module.css";

export const FileSuccess = () => {
  return (
    <div className={styles.closing}>
      <div className={styles.succButton}>
        <button className={styles.succButton}>file_name</button>
      </div>

      <Close />
    </div>
  );
};
