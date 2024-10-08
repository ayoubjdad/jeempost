import React, { useContext, useEffect, useState } from "react";
import styles from "./Home.module.scss";
import { gamesUrl, newsUrl } from "../../api/data";
import { useQuery } from "react-query";
import axios from "axios";
import ArticleWithBackground from "../../components/articles/article-with-background/ArticleWithBackground";
import SmallArticle from "../../components/articles/small-article/SmallArticle";
import MainArticle from "../../components/articles/main-article/MainArticle";
import Game from "../../components/games/game/Game";
import SectionContainer from "../../sections/section-container/SectionContainer";
import MainSlide from "../../layouts/main-slide/MainSlide";
import SideArticle from "../../components/articles/side-article/SideArticle";
import Videos from "../../sections/videos/Videos";
import Sports from "../../sections/sports/Sports";
import { categories } from "../../data/Categories";
import Ad728x90 from "../../layouts/ads/728x90/Ad728x90";
import Ad300x250 from "../../layouts/ads/300x250/Ad300x250";
import { Button, Chip } from "@mui/material";
import ReadMore from "../../components/read-more/ReadMore";
import PrayerTimes from "../../sections/prayer-times/PrayerTimes";
import Tags from "../../layouts/tags/Tags";
import { CategoriesContext } from "../../context/CategoriesContext";

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
  return response.data;
};

export default function Home() {
  const { setCategory } = useContext(CategoriesContext);

  const { data: posts, isLoading: postsLoading } = useQuery(
    "posts",
    fetchNews,
    options
  );
  const [lastNews, setLastNews] = useState(posts?.results?.slice(0, 6));

  useEffect(() => {
    if (!postsLoading) {
      setLastNews(posts?.results?.slice(0, 6));
    }
  }, [postsLoading]);

  const onLoadMore = (state, setState) => {
    const dataLength = state?.length;
    setState((currentData) => {
      const result = [
        ...currentData,
        ...posts?.results?.slice(dataLength, dataLength + 6),
      ];
      return result;
    });
  };

  return (
    <div className={styles.main}>
      <MainSlide posts={posts?.results?.slice(0, 5)} />
      <div className={styles.container}>
        <div className={styles.sections}>
          <div className={styles.sectionsGrid}>
            <div className={styles.sections}>
              <Tags list={categories} onClick={setCategory} />

              <SectionContainer
                readMore
                title="آخر الأخبار"
                style={{ display: "grid", gap: "32px" }}
                onLoadMore={onLoadMore}
                state={lastNews}
                setState={setLastNews}
              >
                <div className={styles.section}>
                  {lastNews?.map((article, index) => (
                    <MainArticle key={index} article={article} />
                  ))}
                </div>
              </SectionContainer>
              <SectionContainer title="اقتصاد">
                <div className={styles.section}>
                  {posts?.results?.slice(0, 6)?.map((article, index) => (
                    <MainArticle key={index} article={article} />
                  ))}
                </div>
              </SectionContainer>
              <SectionContainer title="المغرب">
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
