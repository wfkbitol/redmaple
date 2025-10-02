import styles from "./Home.module.css";
import icons from "../assets/icons.svg";

function Home() {
    return (
        <>
            <section className={styles["header"]}>
                <div className={styles["title"]}>
                    红枫树
                </div>
                <div className={styles["bar"]} />
                <div className={styles["slogan"]}>
                    You have to trust in something, your gut, destiny, life, karma, whatever.
                </div>


                <nav className={styles["nav"]}>
                    <button type="button">博文</button>
                    <button type="button">笔记</button>
                    <button type="button">实例</button>
                    <button type="button">杂七杂八</button>
                </nav>

                <div className={styles["scroll-indicator-container"]}>
                    <svg viewBox="0 0 640 640" className={styles["scroll-indicator"]}>
                        <use href={`${icons}#arrow-down`} />
                    </svg>
                </div>
            </section>

            <section className={styles["categories"]}>
                <div className={styles["categories-title"]}>文章分类</div>
                <div className={styles["categories-list"]}>
                    <div className={styles["category-item"]}>
                        <div className={styles["category-header"]}>
                            <div className={styles["category-icon"]} />
                            <div className={styles["category-title"]}>博文</div>
                        </div>
                        <div className={styles["category-description"]}>这里是较为正式和深入的文章集合。记录我对某些技术、行业或生活的系统化思考和长篇分析，适合静心阅读。</div>
                        <button className={styles["category-more"]}>查看更多</button>
                    </div>
                    <div className={styles["category-item"]}>
                        <div className={styles["category-header"]}>
                            <div className={styles["category-icon"]} />
                            <div className={styles["category-title"]}>笔记</div>
                        </div>
                        <div className={styles["category-description"]}>这里是我的知识碎片和灵感草稿。内容可能不完整，但贵在及时与真实，是思维火花的第一现场。</div>
                        <button className={styles["category-more"]}>查看更多</button>
                    </div>
                    <div className={styles["category-item"]}>
                       <div className={styles["category-header"]}>
                            <div className={styles["category-icon"]} />
                            <div className={styles["category-title"]}>示例</div>
                        </div>
                        <div className={styles["category-description"]}>这里聚焦于具体的代码实例和其实现效果。旨在通过可运行的示例，直观地展示技术与创意结合的可能性。</div>
                        <button className={styles["category-more"]}>查看更多</button>
                    </div>
                    <div className={styles["category-item"]}>
                       <div className={styles["category-header"]}>
                            <div className={styles["category-icon"]} />
                            <div className={styles["category-title"]}>杂七杂八</div>
                        </div>
                        <div className={styles["category-description"]}>这是一个自由的角落。存放所有无法被简单定义的内容，或许是一次尝试、一个发现，或只是一份简单的随感。</div>
                        <button className={styles["category-more"]}>查看更多</button>
                    </div>
                </div>
            </section>
        </>

    )
}

export default Home;