import styles from "./Navbar.module.css";
import Link from "next/link";
import Image from "next/image";

export const Navbar = () => {
  return (
    <nav className={styles.navbar} style={{ zIndex: 10, position: 'relative' }}>
      <div className={styles.logoContainer}>
        <div className={styles.logoCircle}>
          <Image src="/win.svg" alt="Win" width={36} height={36} style={{ borderRadius: '50%', background: '#a86a21', display: 'block' }} />
        </div>
        <span className={styles.logoText}>KOSH</span>
      </div>
      <div className={styles.actions}>
        <Link href="/setup/login" className={styles.login}>Login</Link>
        <Link href="/setup/signup" className={styles.joinHub}>Sign Up</Link>
      </div>
    </nav>
  );
};
