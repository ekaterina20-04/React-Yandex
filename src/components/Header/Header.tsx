import { NavLink } from "react-router-dom";
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
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? styles.linkActive : styles.link
            }
          >
            <img src="/img/save.png" alt="save" className={styles.a_img} />{" "}
            <p>CSV Аналитик</p>
          </NavLink>
          <NavLink
            to="/generate"
            className={({ isActive }) =>
              isActive ? styles.linkActive : styles.link
            }
          >
            <img src="/img/pluss.png" alt="plus" className={styles.g_img} />
            <p>CSV Генератор</p>
          </NavLink>
          <NavLink
            to="/history"
            className={({ isActive }) =>
              isActive ? styles.linkActive : styles.link
            }
          >
            <img
              src="/img/history.png"
              alt="history"
              className={styles.h_img}
            />
            <p>История</p>
          </NavLink>
        </div>
      </div>
    </>
  );
};
