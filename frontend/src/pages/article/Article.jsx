import React from "react";
import styles from "./Article.module.scss";
import Ad300x250 from "../../layouts/ads/300x250/Ad300x250";
import Tags from "../../layouts/tags/Tags";
import { categories } from "../../data/Categories";
import { useLocation } from "react-router";
import { convertDateToArarbic } from "../../helpers/global.helper";
import SectionContainer from "../../sections/section-container/SectionContainer";
import SideArticle from "../../components/articles/side-article/SideArticle";
import { useQuery } from "react-query";
import Ad970x250 from "../../layouts/ads/970x250/Ad970x250";
import Ad300x600 from "../../layouts/ads/300x600/Ad300x600";
import { fetchNews } from "../../helpers/data.helpers";

export default function Article() {
  const location = useLocation();
  const { article } = location.state || {};

  const { data: posts } = useQuery("news", fetchNews, {
    refetchOnWindowFocus: false,
    retry: false,
  });

  if (!article) {
    return <p>No article data available.</p>;
  }

  const {
    id,
    image: { src, srcset },
    author: { name = "جيم بوست" },
    headline,
    categoryId,
    content,
    location: artcileLocation = "المغرب",
    createdAt,
  } = article;

  const category = categories.find((category) => category.id === categoryId);

  const formatedDate = convertDateToArarbic(createdAt);

  return (
    <div className={styles.main} key={id}>
      <Ad970x250 />
      <div className={styles.container}>
        <div className={styles.article}>
          <p className={styles.category}>
            {artcileLocation} | {category.name}
          </p>
          <h1 className={styles.title}>{headline}</h1>
          {src ? (
            <img
              className={styles.sourceImage}
              srcSet={srcset}
              src={src}
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
              {posts?.slice(0, 10)?.map((article, index) => (
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
