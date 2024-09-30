import React from "react";
import styles from "./MainSlide.module.scss";
import SmallArticle from "../../components/articles/small-article/SmallArticle";

export default function MainSlide({ posts }) {
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.articles}>
          <h1 className={styles.title}>
            ماكرون يعود لملف الذاكرة.. هل تستجيب باريس لبعض مطالب الجزائر لإنهاء
            الأزمة الناجمة عن دعمها لمغربية الصحراء؟
          </h1>
          <div className={styles.mainSlide}>
            {posts?.slice(1, 5)?.map((article, index) => (
              <SmallArticle key={index} article={article} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
