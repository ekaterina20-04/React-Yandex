import { useRef } from "react";
import styles from "./BtnUpload.module.css";
type Props = {
  onFileSelect?: (file: File) => void;
};
export const BtnUpload = ({ onFileSelect }: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onFileSelect) {
      onFileSelect(file);
    }
  };
  return (
    <>
      <button className={styles.uploadButton} onClick={handleClick}>
        Загрузить файл
      </button>
      <input
        type="file"
        ref={inputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
    </>
  );
};
