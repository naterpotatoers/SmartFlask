import Link from "next/link";
import styles from "../styles/Home.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <nav>
        <ul className={styles.nav}>
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Link href="/user?flask='flask_one'">
              <a>Data</a>
            </Link>
          </li>
          <li>
            <Link href="/new/user">
              <a>New User</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
