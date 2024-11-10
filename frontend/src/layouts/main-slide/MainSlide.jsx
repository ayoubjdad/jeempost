import React from "react";
import styles from "./MainSlide.module.scss";
import SmallArticle from "../../components/articles/small-article/SmallArticle";
import { useNavigate } from "react-router";
import { newsFormatDate } from "../../helpers/global.helper";
import { serverUrl } from "../../api/config";

export default function MainSlide({ posts = [] }) {
  const mainPost = posts?.[0];
  const { id, headline, image: { src } = {}, createdAt } = mainPost || {};
  const imageSrc = serverUrl + src;

  const navigate = useNavigate();

  const linkDate = newsFormatDate(createdAt);

  const onClick = () => {
    navigate(`/news/${linkDate}/${headline}`, { state: { id } });
  };

  return (
    <div
      className={styles.main}
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${imageSrc})`,
      }}
    >
      <div className={styles.container}>
        <div className={styles.articles}>
          <h1 className={styles.title} onClick={onClick}>
            {headline}
          </h1>
          <Articles posts={posts} />
        </div>
      </div>
    </div>
  );
}

const Articles = ({ posts = [] }) => {
  const articles = posts?.slice(1, 5);

  return (
    <div className={styles.mainSlide}>
      {articles?.map((article, index) => (
        <SmallArticle
          index={index}
          article={{
            id: article.id,
            image: article.image,
            headline: article.headline,
            categoryId: article.categoryId,
            createdAt: article.createdAt,
          }}
        />
      ))}
    </div>
  );
};
