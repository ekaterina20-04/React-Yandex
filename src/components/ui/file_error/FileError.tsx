import { Close } from "../close/Close";
import styles from "./FileError.module.css";

type Props = {
  fileName: string;
  onClose: () => void;
};

export const FileError = ({ fileName, onClose }: Props) => {
  return (
    <div className={styles.main_err}>
      <div className={styles.closing}>
        <button className={styles.errButton}>{fileName}</button>
        <Close onClick={onClose} />
      </div>

      <div className={styles.errText}>упс, не то...</div>
    </div>
  );
};
