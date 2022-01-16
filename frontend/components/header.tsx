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
              <a>Stats</a>
            </Link>
          </li>
          <li>
            <Link href="/leaderboard">
              <a>Leaderboard</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
