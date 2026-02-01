import styles from "./Navbar.module.css";

export const Navbar = () => {
  return (
    <nav className={styles.navbar} style={{ zIndex: 10, position: 'relative' }}>
      <div className={styles.logoContainer}>
        <div className={styles.logoCircle}>
          <img src="/win.svg" alt="Win" style={{ width: 36, height: 36, borderRadius: '50%', background: '#a86a21', display: 'block' }} />
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
