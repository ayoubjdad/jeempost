import React from "react";
import styles from "./Home.module.scss";
import { gamesUrl, newsUrl } from "../../api/data";
import { useQuery } from "react-query";
import axios from "axios";
import ArticleWithBackground from "../../components/articles/article-with-background/ArticleWithBackground";
import SmallArticle from "../../components/articles/small-article/SmallArticle";
import MainArticle from "../../components/articles/main-article/MainArticle";
import Tag from "../../components/tag/Tag";
import Game from "../../components/games/game/Game";
import SectionContainer from "../../sections/section-container/SectionContainer";
import MainSlide from "../../layouts/main-slide/MainSlide";
import SideArticle from "../../components/articles/side-article/SideArticle";
import Videos from "../../sections/videos/Videos";
import Sports from "../../sections/sports/Sports";
import { categories } from "../../data/Categories";
import Ad728x90 from "../../layouts/ads/728x90/Ad728x90";
import Ad300x250 from "../../layouts/ads/300x250/Ad300x250";
import { Button } from "@mui/material";
import ReadMore from "../../components/read-more/ReadMore";

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
  const { data: posts } = useQuery("posts", fetchNews, options);

  return (
    <div className={styles.main}>
      <MainSlide posts={posts?.results?.slice(0, 5)} />
      <div className={styles.container}>
        <div className={styles.sections}>
          {/* <Ad728x90 /> */}

          <div className={styles.tags}>
            {categories.map((category) => (
              <Tag title={category.name} />
            ))}
          </div>

          <div className={styles.sectionsGrid}>
            <div className={styles.sections}>
              <SectionContainer
                readMore
                title="آخر الأخبار"
                style={{ display: "grid", gap: "32px" }}
              >
                <div className={styles.section}>
                  {posts?.results?.slice(0, 6)?.map((article, index) => (
                    <MainArticle key={index} article={article} />
                  ))}
                </div>
                <div className={styles.detailsSection}>
                  {posts?.results?.slice(0, 5)?.map((article, index) => (
                    <SmallArticle
                      key={index}
                      article={article}
                      withDescription
                    />
                  ))}
                </div>
              </SectionContainer>
              <SectionContainer title="اقتصاد" readMore>
                <div className={styles.section}>
                  {posts?.results?.slice(0, 3)?.map((article, index) => (
                    <MainArticle key={index} article={article} />
                  ))}
                </div>
              </SectionContainer>
              <SectionContainer title="المغرب" readMore>
                <div className={styles.section}>
                  {posts?.results?.slice(0, 5)?.map((article, index) => (
                    <ArticleWithBackground key={index} article={article} />
                  ))}
                </div>
              </SectionContainer>
            </div>
            <div className={`${styles.sections} ${styles.smallSection}`}>
              <Ad300x250 />
              <SectionContainer title="الأكثر قراءة">
                <div
                  style={{
                    display: "grid",
                    gap: "16px",
                  }}
                >
                  {posts?.results?.slice(0, 10)?.map((article, index) => (
                    <SideArticle index={index} article={article} />
                  ))}
                </div>
              </SectionContainer>
              <SectionContainer title="استطلاع رأي">
                استطلاع رأي
              </SectionContainer>
            </div>
          </div>
        </div>
      </div>
      <Videos articles={posts?.results} />
      <div className={styles.container}>
        <div className={styles.sections}>
          <div className={styles.sectionsGrid}>
            <div className={styles.sections}>
              <SectionContainer title="فن" readMore>
                <div className={styles.section}>
                  {posts?.results?.slice(0, 7)?.map((article, index) => (
                    <SmallArticle
                      key={index}
                      article={article}
                      withDescription
                    />
                  ))}
                </div>
              </SectionContainer>
            </div>
            <div className={`${styles.sections} ${styles.smallSection}`}>
              <SectionContainer title="الأكثر قراءة">
                <div
                  style={{
                    display: "grid",
                    gap: "16px",
                  }}
                >
                  {posts?.results?.slice(0, 10)?.map((article, index) => (
                    <SideArticle index={index} article={article} />
                  ))}
                </div>
              </SectionContainer>
            </div>
          </div>
        </div>
      </div>
      <Sports articles={posts?.results} />
    </div>
  );
}
