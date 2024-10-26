import React from "react";
import styles from "./Categories.module.scss";
import { useQuery } from "react-query";
import MainArticle from "../../components/articles/main-article/MainArticle";
import SectionContainer from "../../sections/section-container/SectionContainer";
import { categories } from "../../data/Categories";
import { fetchNews } from "../../helpers/data.helpers";

const Categories = ({ category }) => {
  const categoryData = categories.find((cat) => cat.slug === category);

  const { data: posts } = useQuery("news", fetchNews, {
    refetchOnWindowFocus: false,
    retry: false,
  });

  const postsList = posts?.filter(
    (post) => post.categoryId === categoryData?.id
  );
  console.log(":::::: ~ postsList:", postsList);

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <SectionContainer title={categoryData.name} readMore>
          <div className={styles.section}>
            {postsList?.map((article) => (
              <MainArticle key={article.id} article={article} />
            ))}
          </div>
        </SectionContainer>
      </div>
    </div>
  );
};

export default Categories;
