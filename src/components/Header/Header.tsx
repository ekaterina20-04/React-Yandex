import styles from "./Header.module.css";

export const Header = () => {
  return (
    <>
      <div className={styles.main}>
        <div className={styles.main_left}>
          <img src="/img/logo_SS.png" className={styles.logo} alt="Логотип" />
          <div className={styles.main_text}> Межгалактическая аналитика</div>
        </div>
        <div className={styles.main_right}>
          <div className={styles.anal}>
            <img src="/img/save.png" alt="save" className={styles.a_img} />{" "}
            <p>CSV Аналитик</p>
          </div>
          <div className={styles.gener}>
            <img src="/img/pluss.png" alt="plus" className={styles.g_img} />
            <p>CSV Генератор</p>
          </div>
          <div className={styles.history}>
            <img
              src="/img/history.png"
              alt="history"
              className={styles.h_img}
            />
            <p>История</p>
          </div>
        </div>
      </div>
    </>
  );
};
