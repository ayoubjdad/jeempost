import React, { useContext } from "react";
import styles from "./Home.module.scss";
import { useQuery } from "react-query";
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
import { fetchNews } from "../../helpers/data.helpers";

export default function Home() {
  const { setCategory } = useContext(CategoriesContext);

  const { data: posts, isLoading: postsLoading } = useQuery("news", fetchNews, {
    refetchOnWindowFocus: false,
    retry: false,
  });

  if (postsLoading) return null;

  const mainSlideList = posts?.filter((item) => item.isHighlight);
  const lastNewsList = posts?.filter((item) => item.categoryId === 1);
  const economyList = posts?.filter((item) => item.categoryId === 3);
  const sportList = posts?.filter((item) => item.categoryId === 4);
  const artList = posts?.filter((item) => item.categoryId === 5);
  const worldList = posts?.filter((item) => item.categoryId === 6);

  return (
    <div className={styles.main}>
      <MainSlide posts={mainSlideList} />

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
              <LastNewsSection lastNewsList={lastNewsList} />
            </div>
          </div>

          <div className={styles.sectionsGrid}>
            <div className={styles.sections}>
              <EconomySection economyList={economyList} />
              <WorldSection worldList={worldList} />
            </div>
            <div className={`${styles.sections} ${styles.smallSection}`}>
              <SectionContainer title="أوقات الصلاة">
                <PrayerTimes />
              </SectionContainer>
              <SectionContainer title="الأكثر قراءة">
                <div style={{ display: "grid", gap: "16px" }}>
                  {posts?.slice(0, 10)?.map((article, index) => (
                    <SideArticle index={index} article={article} />
                  ))}
                </div>
              </SectionContainer>
            </div>
          </div>
        </div>
      </div>

      <Videos />

      <div className={styles.container}>
        <div className={styles.sections}>
          <div
            className={styles.sectionsGrid}
            style={{ gridTemplateColumns: "1fr" }}
          >
            <ArtSection artList={artList} />
          </div>
        </div>
      </div>

      <Sports articles={sportList} />
    </div>
  );
}

const LastNewsSection = ({ lastNewsList }) => {
  if (!lastNewsList?.length) return null;

  return (
    <SectionContainer title="آخر الأخبار" readMore>
      <div
        className={styles.section}
        style={{ gridTemplateColumns: "repeat(4, 1fr)" }}
      >
        {lastNewsList?.slice(0, 8)?.map((article, index) => (
          <MainArticle key={index} article={article} />
        ))}
      </div>
    </SectionContainer>
  );
};

const EconomySection = ({ economyList }) => {
  if (!economyList?.length) return null;

  return (
    <SectionContainer title="اقتصاد" readMore>
      <div className={styles.section}>
        {economyList?.slice(0, 6)?.map((article, index) => (
          <MainArticle key={index} article={article} />
        ))}
      </div>
    </SectionContainer>
  );
};

const WorldSection = ({ worldList }) => {
  if (!worldList?.length) return null;

  return (
    <SectionContainer title="دولي" readMore>
      <div className={styles.section}>
        {worldList?.slice(0, 6)?.map((article, index) => (
          <ArticleWithBackground key={index} article={article} />
        ))}
      </div>
    </SectionContainer>
  );
};

const ArtSection = ({ artList }) => {
  if (!artList?.length) return null;

  return (
    <SectionContainer title="فن" readMore>
      <div className={styles.section}>
        {artList?.slice(0, 9)?.map((article, index) => (
          <SmallArticle key={index} article={article} withDescription />
        ))}
      </div>
    </SectionContainer>
  );
};
