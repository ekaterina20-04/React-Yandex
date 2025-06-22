import { Close } from "../close/Close";
import styles from "./ErrorGener.module.css";

type Props = {
  onClose: () => void;
};

export const ErrorGener = ({ onClose }: Props) => {
  return (
    <div className={styles.main_err}>
      <div className={styles.closing}>
        <button className={styles.errButton}>Ошибка</button>
        <Close onClick={onClose} />
      </div>

      <div className={styles.errText}>упс, не то...</div>
    </div>
  );
};
