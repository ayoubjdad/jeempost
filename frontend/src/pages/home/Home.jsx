import React, { useContext, useEffect, useState } from "react";
import styles from "./Home.module.scss";
import { useQuery } from "react-query";
import axios from "axios";
import ArticleWithBackground from "../../components/articles/article-with-background/ArticleWithBackground";
import SmallArticle from "../../components/articles/small-article/SmallArticle";
import MainArticle from "../../components/articles/main-article/MainArticle";
import SectionContainer from "../../sections/section-container/SectionContainer";
import MainSlide from "../../layouts/main-slide/MainSlide";
import SideArticle from "../../components/articles/side-article/SideArticle";
import Videos from "../../sections/videos/Videos";
import Sports from "../../sections/sports/Sports";
import { categories } from "../../data/Categories";
import PrayerTimes from "../../sections/prayer-times/PrayerTimes";
import Tags from "../../layouts/tags/Tags";
import { CategoriesContext } from "../../context/CategoriesContext";
import { newsUrl, serverUrl } from "../../api/config";

const options = {
  refetchOnWindowFocus: false,
  retry: false,
};
const fetchNews = async () => {
  const response = await axios.get(newsUrl);
  // const response = await axios.get(newsUrl, {
  //   headers: {
  //     "x-rapidapi-key": "87705006f3mshfe19f4c4fb732fdp1f49e3jsnf93da7793083",
  //     "x-rapidapi-host": "arabic-news-api.p.rapidapi.com",
  //   },
  // });
  return response.data;
};

export default function Home() {
  const { setCategory } = useContext(CategoriesContext);

  const { data: posts, isLoading: postsLoading } = useQuery(
    "posts",
    fetchNews,
    options
  );
  const [lastNews, setLastNews] = useState(posts?.results?.slice(0, 12));

  return (
    <div className={styles.main}>
      <MainSlide posts={posts?.results?.slice(0, 5)} />
      <div className={styles.container}>
        <div className={styles.sections}>
          <div
            className={styles.sectionsGrid}
            style={{ gridTemplateColumns: "1fr" }}
          >
            <div
              className={styles.sections}
              style={{ gridTemplateColumns: "1fr" }}
            >
              <Tags list={categories} onClick={setCategory} />
              <SectionContainer title="آخر الأخبار" readMore>
                <div
                  className={styles.section}
                  style={{
                    gridTemplateColumns: "repeat(4,1fr)",
                  }}
                >
                  {posts?.results?.slice(0, 12)?.map((article, index) => (
                    <MainArticle key={index} article={article} />
                  ))}
                </div>
              </SectionContainer>
            </div>
          </div>

          <div className={styles.sectionsGrid}>
            <div className={styles.sections}>
              <SectionContainer title="اقتصاد" readMore>
                <div className={styles.section}>
                  {posts?.results?.slice(0, 6)?.map((article, index) => (
                    <MainArticle key={index} article={article} />
                  ))}
                </div>
              </SectionContainer>
              <SectionContainer title="المغرب" readMore>
                <div className={styles.section}>
                  {posts?.results?.slice(0, 6)?.map((article, index) => (
                    <ArticleWithBackground key={index} article={article} />
                  ))}
                </div>
              </SectionContainer>
            </div>
            <div className={`${styles.sections} ${styles.smallSection}`}>
              <SectionContainer title="أوقات الصلاة">
                <PrayerTimes />
              </SectionContainer>
              <SectionContainer title="الأكثر قراءة">
                <div style={{ display: "grid", gap: "16px" }}>
                  {posts?.results?.slice(0, 10)?.map((article, index) => (
                    <SideArticle index={index} article={article} />
                  ))}
                </div>
              </SectionContainer>
            </div>
          </div>
        </div>
      </div>
      <Videos articles={posts?.results} />
      <div className={styles.container}>
        <div className={styles.sections}>
          <SectionContainer title="فن" readMore>
            <div className={styles.section}>
              {posts?.results?.slice(0, 9)?.map((article, index) => (
                <SmallArticle key={index} article={article} withDescription />
              ))}
            </div>
          </SectionContainer>
        </div>
      </div>
      <Sports articles={posts?.results} />
    </div>
  );
}
