import React from "react";
import styles from "./Categories.module.scss";
import axios from "axios";
import { useQuery } from "react-query";
import MainArticle from "../../components/articles/main-article/MainArticle";
import SectionContainer from "../../sections/section-container/SectionContainer";
import { categories } from "../../data/Categories";
import { newsUrl } from "../../api/config";

const fetchNews = async () => {
  const { data } = await axios.get(newsUrl);
  return data;
};

const Categories = ({ category }) => {
  const categoryData = categories.find((cat) => cat.slug === category);

  const { data: posts } = useQuery("posts", fetchNews, {
    refetchOnWindowFocus: false,
    retry: false,
    enabled: !!category,
  });

  const postsList = posts?.filter(
    (post) => post.categoryId === categoryData?.id
  );

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
