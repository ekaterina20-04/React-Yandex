import styles from "./Close.module.css";
type Props = {
  onClick: () => void;
};
export const Close = ({ onClick }: Props) => {
  return (
    <button className={styles.close} onClick={onClick}>
      <img src="/img/close.png" alt="" />
    </button>
  );
};
