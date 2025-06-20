import ReactDOM from "react-dom";
import styles from "./HistoryPage.module.css";
import { Close } from "@/components/ui/close/Close";

export const Modal = ({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) => {
  return ReactDOM.createPortal(
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
      <div className={styles.closeBtn} onClick={onClose}>
        <Close />
      </div>
    </div>,
    document.body
  );
};
