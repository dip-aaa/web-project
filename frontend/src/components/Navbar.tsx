import vector from "../app/vector.svg";
import styles from "./Navbar.module.css";

export const Navbar = () => {
  return (
    <nav className={styles.navbar} style={{ zIndex: 10, position: 'relative' }}>
      <div className={styles.logoContainer}>
        <div className={styles.logoCircle}>
          <img src={vector} alt="Vector" style={{ width: 24, height: 20 }} />
        </div>
        <span className={styles.logoText}>KOSH</span>
      </div>
      <div className={styles.actions}>
        <span className={styles.login}>Login</span>
        <button className={styles.joinHub}>Join Hub</button>
      </div>
    </nav>
  );
};
