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
          {/* <Game /> */}
          <div style={{ display: "flex", gap: "16px" }}>
            {posts?.results?.slice(0, 10)?.map(() => (
              <Tag title="مباشر" />
            ))}
          </div>
          <div className={styles.sectionsGrid}>
            <div className={styles.sections}>
              <SectionContainer title="آخر الأخبار">
                <div
                  style={{
                    display: "grid",
                    gap: "16px",
                    gridTemplateColumns: "1fr 1fr 1fr",
                  }}
                >
                  {posts?.results?.slice(0, 9)?.map((article, index) => (
                    <MainArticle key={index} article={article} />
                  ))}
                </div>
                <div
                  style={{
                    display: "grid",
                    gap: "16px",
                    gridTemplateColumns: "1fr 1fr",
                  }}
                >
                  {posts?.results?.slice(0, 5)?.map((article, index) => (
                    <SmallArticle
                      key={index}
                      article={article}
                      withDescription
                    />
                  ))}
                </div>
              </SectionContainer>
              <SectionContainer title="اقتصاد">
                <div
                  style={{
                    display: "grid",
                    gap: "16px",
                    gridTemplateColumns: "1fr 1fr 1fr",
                  }}
                >
                  {posts?.results?.slice(0, 3)?.map((article, index) => (
                    <MainArticle key={index} article={article} />
                  ))}
                </div>
              </SectionContainer>
              <SectionContainer title="المغرب">
                <div
                  style={{
                    display: "grid",
                    gap: "16px",
                    gridTemplateColumns: "1fr 1fr 1fr",
                  }}
                >
                  {posts?.results?.slice(0, 5)?.map((article, index) => (
                    <ArticleWithBackground key={index} article={article} />
                  ))}
                </div>
              </SectionContainer>
            </div>
            <div className={styles.sections}>
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
              <SectionContainer title="فن">
                <div
                  style={{
                    display: "grid",
                    gap: "16px",
                    gridTemplateColumns: "1fr 1fr",
                  }}
                >
                  {posts?.results?.slice(0, 7)?.map((article, index) => (
                    <SmallArticle key={index} article={article} /> // Passing the article as a prop
                  ))}
                </div>
              </SectionContainer>
            </div>
            <div className={styles.sections}>
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
