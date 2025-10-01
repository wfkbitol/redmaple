import styles from "./Home.module.css";
import icons from "../assets/icons.svg";

function Home() {
    return (
        <section className={styles["header"]}>
            <div className={styles["title"]}>
                红枫树
            </div>
            <div className={styles["bar"]} />
            <div className={styles["slogan"]}>
                You have to trust in something, your gut, destiny, life, karma, whatever.
            </div>


            <nav className={styles["nav"]}>
                <button type="button">C#</button>
                <button type="button">WPF</button>
                <button type="button">JS</button>
                <button type="button">杂七杂八</button>
            </nav>

            <div className={styles["scroll-indicator-container"]}>
                <svg viewBox="0 0 640 640" className={styles["scroll-indicator"]}>
                    <use href={`${icons}#arrow-down`} />
                </svg>
            </div>
        </section>

    )
}

export default Home;