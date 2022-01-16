import type { NextPage } from "next";
import Link from "next/link";

import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import logo from "../public/logo.png";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Smart Flask</title>
        <meta
          name="A flask capable of tracking your water habits"
          content="Powered by Red Bull"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Smart Flask</h1>
        <Image alt="Logo" src={logo} width={300} height={300} />

        <p className={styles.description}>
          A flask that monitors your water drinking habits
        </p>

        <div className={styles.grid}>
          <a href="/how" className={styles.card}>
            <h2>How It Works &rarr;</h2>
            <p>Find out how we created our smart flask.</p>
          </a>

          <a href="/leaderboard" className={styles.card}>
            <h2>Leaderboard &rarr;</h2>
            <p>See how you compare against other drinkers!</p>
          </a>

          <a href="/user?flask='flask_one'" className={styles.card}>
            <h2>Stats &rarr;</h2>
            <p>See your daily drinking stats.</p>
          </a>

          <a href="/new/user" className={styles.card}>
            <h2>Sign Up &rarr;</h2>
            <p>Sign up to begin tracking your drinking habits today.</p>
          </a>
        </div>
      </main>
    </div>
  );
};

export default Home;
