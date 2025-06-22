import { Close } from "../close/Close";
import styles from "./FileSuccess.module.css";
type Props = {
  fileName: string;

  onClose: () => void;
};
export const FileSuccess = ({ fileName, onClose }: Props) => {
  return (
    <div className={styles.closing}>
      <div>
        <button className={styles.succButton}>{fileName}</button>
      </div>

      <Close onClick={onClose} />
    </div>
  );
};
