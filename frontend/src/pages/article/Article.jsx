import React, { useContext } from "react";
import styles from "./Article.module.scss";
import Ad300x250 from "../../layouts/ads/300x250/Ad300x250";
import Tags from "../../layouts/tags/Tags";
import { categories } from "../../data/Categories";
import { useLocation } from "react-router";
import { convertDateToArarbic } from "../../helpers/global.helper";
import SectionContainer from "../../sections/section-container/SectionContainer";
import SideArticle from "../../components/articles/side-article/SideArticle";
import Ad970x250 from "../../layouts/ads/970x250/Ad970x250";
import Ad300x600 from "../../layouts/ads/300x600/Ad300x600";
import { serverUrl } from "../../api/config";
import { DataContext } from "../../context/DataProvider";

export default function Article() {
  const location = useLocation();
  const { id } = location.state || {};

  const { news } = useContext(DataContext);

  if (!id) {
    return <p>No article data available.</p>;
  }

  const article = news?.find((article) => article.id === id);

  const {
    image: { src, srcset } = {}, // Fallback to an empty object if image is undefined
    author: { name = "جيم بوست" } = {}, // Fallback to an empty object if author is undefined
    headline,
    categoryId,
    content,
    location: articleLocation = "المغرب",
    createdAt,
  } = article || {};

  const category = categories.find((category) => category.id === categoryId);

  const imageSrc = serverUrl + src;
  const formatedDate = convertDateToArarbic(createdAt);

  return (
    <div className={styles.main} key={id}>
      <Ad970x250 />
      <div className={styles.container}>
        <div className={styles.article}>
          <p className={styles.category}>
            {articleLocation} | {category?.name}
          </p>
          <h1 className={styles.title}>{headline}</h1>
          {src ? (
            <img
              className={styles.sourceImage}
              srcSet={srcset}
              src={imageSrc}
              alt={headline}
            />
          ) : (
            <div className={styles.noSourceImage}>لا توجد صورة</div>
          )}
          <div>
            <p className={styles.author}>{name}</p>
            <p className={styles.date}>{formatedDate}</p>
          </div>
          <div
            className={styles.articleDetails}
            dangerouslySetInnerHTML={{ __html: content }}
          />
          <Tags list={categories.slice(0, 3)} />
        </div>
        <div className={`${styles.sections} ${styles.smallSection}`}>
          <Ad300x250 />
          <SectionContainer title="الأكثر قراءة">
            <div style={{ display: "grid", gap: "16px" }}>
              {news?.slice(0, 10)?.map((article, index) => (
                <SideArticle index={index} article={article} />
              ))}
            </div>
          </SectionContainer>
          <Ad300x600 />
        </div>
      </div>
    </div>
  );
}
