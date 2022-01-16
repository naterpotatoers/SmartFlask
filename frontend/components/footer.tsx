import styles from "../styles/Home.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <a
        className=".nav a:hover"
        href="https://github.com/naterpotatoers/SmartFlask"
        target="_blank"
        rel="noopener noreferrer"
      >
        CruzHacks 2022
      </a>
    </footer>
  );
}

export default Footer;
