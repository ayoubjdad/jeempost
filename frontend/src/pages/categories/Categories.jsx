import React, { useContext } from "react";
import styles from "./Categories.module.scss";
import MainArticle from "../../components/articles/main-article/MainArticle";
import SectionContainer from "../../sections/section-container/SectionContainer";
import { categories } from "../../data/Categories";
import { DataContext } from "../../context/DataProvider";

const Categories = ({ category }) => {
  const { news, isNewsLoading } = useContext(DataContext);

  const categoryData = categories.find((cat) => cat.slug === category);

  let newsList = [...news];
  if (category !== "آخر الأخبار") {
    newsList = news?.filter((post) => post.categoryId === categoryData?.id);
  }

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <SectionContainer title={categoryData?.name || "آخر الأخبار"} readMore>
          <div
            className={styles.section}
            style={{
              gridTemplateColumns: isNewsLoading && "1fr",
              justifyItems: isNewsLoading && "center",
            }}
          >
            {isNewsLoading ? (
              <div className={styles.loader} />
            ) : (
              newsList?.map((article) => (
                <MainArticle key={article.id} article={article} />
              ))
            )}
          </div>
        </SectionContainer>
      </div>
    </div>
  );
};

export default Categories;
