import styles from "./Close.module.css";

export const Close = () => {
  return (
    <button className={styles.close} disabled>
      X
    </button>
  );
};
