import { Close } from "../close/Close";
import styles from "./Done.module.css";
type Props = {
  onClose: () => void;
};
export const Done = ({ onClose }: Props) => {
  return (
    <div className={styles.done}>
      <div className={styles.closing}>
        <div>
          <button className={styles.succButton}>Done!</button>
        </div>

        <Close onClick={onClose} />
      </div>
      <div className={styles.text}>файл сгенерирован!</div>
    </div>
  );
};
