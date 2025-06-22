import { Close } from "../close/Close";
import styles from "./FileSuccess.module.css";
type Props = {
  onClose: () => void;
};
export const FileSuccess = ({ onClose }: Props) => {
  return (
    <div className={styles.closing}>
      <div>
        <button className={styles.succButton}>file_name</button>
      </div>

      <Close onClick={onClose} />
    </div>
  );
};
