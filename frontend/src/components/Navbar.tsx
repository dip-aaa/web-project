
import styles from "./Navbar.module.css";
import Link from "next/link";

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
        <Link href="/setup/login" passHref legacyBehavior>
          <a className={styles.login}>Login</a>
        </Link>
        <Link href="/setup/signup" passHref legacyBehavior>
          <a className={styles.joinHub}>Sign Up</a>
        </Link>
      </div>
    </nav>
  );
};
