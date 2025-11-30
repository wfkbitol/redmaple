import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import * as styles from "./index.module.scss"

const IndexPage: React.FC<PageProps> = () => {
  const categories = React.useRef<HTMLDivElement>(null);
  const category1 = React.useRef<HTMLDivElement>(null);
  const category2 = React.useRef<HTMLDivElement>(null);
  const category3 = React.useRef<HTMLDivElement>(null);
  const category4 = React.useRef<HTMLDivElement>(null);
  const about = React.useRef<HTMLDivElement>(null);

  const scroll = (element: HTMLDivElement | null, block: ScrollLogicalPosition) => {
    if (element) {
        element.scrollIntoView({ behavior: "smooth", block: block });
    }
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

                <div className={styles["scrollIndicatorContainer"]}>
                    <button className={styles["scrollIndicator"]} type="button" onClick={()=>scroll(categories.current, "start")}>
                        <svg viewBox="0 0 640 640">
                            <use href="/icons.svg#arrow-down" />
                        </svg>
                    </button>
                </div>
            </section>

            <section className={styles["categories"]} ref={categories}>
                <div className={styles["categoriesTitle"]}>文章分类</div>
                <div className={styles["categoriesList"]}>
                    <div className={styles["categoryItem"]} ref={category1}>
                        <div className={styles["categoryHeader"]}>
                            <svg viewBox="0 0 640 640" className={styles["categoryIcon"]}>
                                <use href="/icons.svg#article" />
                            </svg>
                            <div className={styles["categoryTitle"]}>文章</div>
                        </div>
                        <div className={styles["categoryDescription"]}>这里是较为正式和深入的文章集合。记录我对某些技术、行业或生活的系统化思考和长篇分析，适合静心阅读。</div>
                        <button className={styles["categoryMore"]}>查看更多</button>
                    </div>
                    <div className={styles["categoryItem"]} ref={category2}>
                        <div className={styles["categoryHeader"]}>
                            <svg viewBox="0 0 640 640" className={styles["categoryIcon"]}>
                                <use href="/icons.svg#note" />
                            </svg>
                            <div className={styles["categoryTitle"]}>笔记</div>
                        </div>
                        <div className={styles["categoryDescription"]}>这里是我的知识碎片和灵感草稿。内容可能不完整，但贵在及时与真实，是思维火花的第一现场。</div>
                        <button className={styles["categoryMore"]}>查看更多</button>
                    </div>
                    <div className={styles["categoryItem"]} ref={category3}>
                        <div className={styles["categoryHeader"]}>
                            <svg viewBox="0 0 640 640" className={styles["categoryIcon"]}>
                                <use href="/icons.svg##example" />
                            </svg>
                            <div className={styles["categoryTitle"]}>画廊</div>
                        </div>
                        <div className={styles["categoryDescription"]}>这里聚焦于具体的代码实例和其实现效果。旨在通过可运行的示例，直观地展示技术与创意结合的可能性。</div>
                        <button className={styles["categoryMore"]}>查看更多</button>
                    </div>
                    <div className={styles["categoryItem"]} ref={category4}>
                        <div className={styles["categoryHeader"]}>
                            <svg viewBox="0 0 640 640" className={styles["categoryIcon"]}>
                                <use href="/icons.svg##misc" />
                            </svg>
                            <div className={styles["categoryTitle"]}>杂七杂八</div>
                        </div>
                        <div className={styles["categoryDescription"]}>这是一个自由的角落。存放所有无法被简单定义的内容，或许是一次尝试、一个发现，或只是一份简单的随感。</div>
                        <button className={styles["categoryMore"]}>查看更多</button>
                    </div>
                </div>
                <div className={styles["scrollIndicatorContainer"]}>
                    <button className={styles["scrollIndicator"]} type="button" onClick={() => scroll(about.current, "start")}>
                        <svg viewBox="0 0 640 640">
                            <use href="/icons.svg#arrow-down" />
                        </svg>
                    </button>
                </div>
            </section>

            <section className={styles["aboutMe"]} ref={about}>
                <img className={styles["aboutAvatar"]} src="/avatar.jpeg" alt="avatar" />
                <div className={styles["aboutName"]}>BLUEROCKS</div>

                <div className={styles["aboutDesc"]} >
                    一介码农，浪迹江湖。诸般技艺，皆有涉猎，然皆浅尝辄止，未得真传。然，心游万仞，乐在其中矣。
                </div>

                <div className={styles["aboutTech"]}>
                    <div className={styles["aboutTechItem"]}>C#</div>
                    <div className={styles["aboutTechItem"]}>WPF</div>
                    <div className={styles["aboutTechItem"]}>Javascript</div>
                    <div className={styles["aboutTechItem"]}>React</div>
                </div>
            </section>
        </div>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
