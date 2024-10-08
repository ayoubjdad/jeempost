import React from "react";
import styles from "./Categories.module.scss";
import { newsUrl } from "../../api/data";
import axios from "axios";
import { useQuery } from "react-query";
import MainArticle from "../../components/articles/main-article/MainArticle";
import SectionContainer from "../../sections/section-container/SectionContainer";
import { categories } from "../../data/Categories";

const options = {
  refetchOnWindowFocus: false,
  retry: false,
};
const fetchNews = async () => {
  const response = await axios.get(newsUrl, {
    headers: {
      "x-rapidapi-key": "87705006f3mshfe19f4c4fb732fdp1f49e3jsnf93da7793083",
      "x-rapidapi-host": "arabic-news-api.p.rapidapi.com",
    },
  });
  return response?.data?.results || [];
};

export default function Categories({ category }) {
  const categoryName = categories.filter((cat) => cat.slug === category);

  const { data: posts, isLoading: postsLoading } = useQuery(
    "posts",
    fetchNews,
    options
  );

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <SectionContainer title={categoryName[0].name} readMore>
          <div className={styles.section}>
            {posts?.map((article, index) => (
              <MainArticle key={index} article={article} />
            ))}
          </div>
        </SectionContainer>
      </div>
    </div>
  );
}
