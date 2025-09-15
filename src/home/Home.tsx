import styles from "./Home.module.css";
import maple from "../assets/maple.svg";

function Home() {
    return (
        <div className={styles["main"]}>
            <div className={styles["nav-container"]}>
                <div className={styles["nav1"]}>
                    <img className={styles["maple"]} src={maple}/>
                    <div className={styles["title"]}>Red Maple</div>
                    <div className={styles["about"]}>About</div>
                </div>
                <div className={styles["nav2"]}>
                    <div className={styles["link"]}>WPF</div>
                    <div className={styles["link"]}>Web</div>
                    <div className={styles["link"]}>C#</div>
                    <div className={styles["link"]}>Javascript</div>
                </div>
            </div>
            <div className={styles["theme"]}>
                <img src="https://z.wiki/u/otxhGS" />
                <div className={styles["motto"]}>
                    <div className={styles["cover"]}/>
                    <div className={styles["content"]}>
                        You have to trust in something, your gut, destiny, life, karma, whatever.
                        <div className={styles["author"]}>- Steve Jobs</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;