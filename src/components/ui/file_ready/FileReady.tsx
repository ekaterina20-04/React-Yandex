import { Close } from "../close/Close";
import styles from "./FileReady.module.css";
type Props = {
  fileName: string;

  onClose: () => void;
};
export const FileReady = ({ fileName, onClose }: Props) => {
  return (
    <div className={styles.main}>
      <div className={styles.closing}>
        <div>
          <button className={styles.succButton}>{fileName}</button>
        </div>

        <Close onClick={onClose} />
      </div>
      <div className={styles.ready}>готово!</div>
    </div>
  );
};
