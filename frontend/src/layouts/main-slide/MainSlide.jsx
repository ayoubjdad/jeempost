import React from "react";
import styles from "./MainSlide.module.scss";
import SmallArticle from "../../components/articles/small-article/SmallArticle";
import { useNavigate } from "react-router";
import { newsFormatDate } from "../../helpers/global.helper";

export default function MainSlide({ posts }) {
  const mainPost = posts?.[0];
  const {
    headline,
    image: { src },
    createdAt,
  } = mainPost;

  const navigate = useNavigate();

  const linkDate = newsFormatDate(createdAt);

  const onClick = () => {
    navigate(`/news/${linkDate}/${headline}`, { state: { article: mainPost } });
  };

  return (
    <div
      className={styles.main}
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${src})`,
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

const Articles = ({ posts }) => {
  const articles = posts?.slice(1, 5);

  return (
    <div className={styles.mainSlide}>
      {articles?.map((article, index) => (
        <SmallArticle key={index} article={article} />
      ))}
    </div>
  );
};
