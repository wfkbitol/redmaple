import styles from "./Home.module.css";
import icons from "../assets/icons.svg";
import { useRef } from "react";
import avatar from "../assets/avatar.jpeg";

function Home() {
    const categories = useRef<HTMLDivElement>(null);
    const category1 = useRef<HTMLDivElement>(null);
    const category2 = useRef<HTMLDivElement>(null);
    const category3 = useRef<HTMLDivElement>(null);
    const category4 = useRef<HTMLDivElement>(null);
    const about = useRef<HTMLDivElement>(null);

    function scroll(target: HTMLDivElement | null, block:ScrollLogicalPosition) {
        target?.scrollIntoView({ behavior: "smooth", block });
    }

    return (
        <div className={styles["container"]}>
            <section className={styles["header"]}>
                <div className={styles["title"]}>
                    红枫树
                </div>
                <div className={styles["bar"]} />
                <div className={styles["slogan"]}>
                    You have to trust in something, your gut, destiny, life, karma, whatever.
                </div>

                <nav className={styles["nav"]}>
                    <button type="button" onClick={() => scroll(category1.current,"center")}>文章</button>
                    <button type="button" onClick={() => scroll(category2.current, "center")}>笔记</button>
                    <button type="button" onClick={() => scroll(category3.current, "center")}>画廊</button>
                    <button type="button" onClick={() => scroll(category4.current, "center")}>杂七杂八</button>
                </nav>

                <div className={styles["scroll-indicator-container"]}>
                    <button className={styles["scroll-indicator"]} type="button" onClick={()=>scroll(categories.current, "start")}>
                        <svg viewBox="0 0 640 640">
                            <use href={`${icons}#arrow-down`} />
                        </svg>
                    </button>
                </div>
            </section>

            <section className={styles["categories"]} ref={categories}>
                <div className={styles["categories-title"]}>文章分类</div>
                <div className={styles["categories-list"]}>
                    <div className={styles["category-item"]} ref={category1}>
                        <div className={styles["category-header"]}>
                            <svg viewBox="0 0 640 640" className={styles["category-icon"]}>
                                <use href={`${icons}#article`} />
                            </svg>
                            <div className={styles["category-title"]}>文章</div>
                        </div>
                        <div className={styles["category-description"]}>这里是较为正式和深入的文章集合。记录我对某些技术、行业或生活的系统化思考和长篇分析，适合静心阅读。</div>
                        <button className={styles["category-more"]}>查看更多</button>
                    </div>
                    <div className={styles["category-item"]} ref={category2}>
                        <div className={styles["category-header"]}>
                            <svg viewBox="0 0 640 640" className={styles["category-icon"]}>
                                <use href={`${icons}#note`} />
                            </svg>
                            <div className={styles["category-title"]}>笔记</div>
                        </div>
                        <div className={styles["category-description"]}>这里是我的知识碎片和灵感草稿。内容可能不完整，但贵在及时与真实，是思维火花的第一现场。</div>
                        <button className={styles["category-more"]}>查看更多</button>
                    </div>
                    <div className={styles["category-item"]} ref={category3}>
                        <div className={styles["category-header"]}>
                            <svg viewBox="0 0 640 640" className={styles["category-icon"]}>
                                <use href={`${icons}#example`} />
                            </svg>
                            <div className={styles["category-title"]}>画廊</div>
                        </div>
                        <div className={styles["category-description"]}>这里聚焦于具体的代码实例和其实现效果。旨在通过可运行的示例，直观地展示技术与创意结合的可能性。</div>
                        <button className={styles["category-more"]}>查看更多</button>
                    </div>
                    <div className={styles["category-item"]} ref={category4}>
                        <div className={styles["category-header"]}>
                            <svg viewBox="0 0 640 640" className={styles["category-icon"]}>
                                <use href={`${icons}#misc`} />
                            </svg>
                            <div className={styles["category-title"]}>杂七杂八</div>
                        </div>
                        <div className={styles["category-description"]}>这是一个自由的角落。存放所有无法被简单定义的内容，或许是一次尝试、一个发现，或只是一份简单的随感。</div>
                        <button className={styles["category-more"]}>查看更多</button>
                    </div>
                </div>
                <div className={styles["scroll-indicator-container"]}>
                    <button className={styles["scroll-indicator"]} type="button" onClick={() => scroll(about.current, "start")}>
                        <svg viewBox="0 0 640 640">
                            <use href={`${icons}#arrow-down`} />
                        </svg>
                    </button>
                </div>
            </section>

            <section className={styles["about-me"]} ref={about}>
                <img className={styles["about-avatar"]} src={avatar} alt="avatar" />
                <div className={styles["about-name"]}>BLUEROCKS</div>

                <div className={styles["about-desc"]} >
                    一介码农，浪迹江湖。诸般技艺，皆有涉猎，然皆浅尝辄止，未得真传。然，心游万仞，乐在其中矣。
                </div>

                <div className={styles["about-tech"]}>
                    <div className={styles["about-tech-item"]}>C#</div>
                    <div className={styles["about-tech-item"]}>WPF</div>
                    <div className={styles["about-tech-item"]}>Javascript</div>
                    <div className={styles["about-tech-item"]}>React</div>
                </div>
            </section>
        </div>
    )
}

export default Home;