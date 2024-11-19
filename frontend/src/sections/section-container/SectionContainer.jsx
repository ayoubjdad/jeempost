import React, { useContext } from "react";
import styles from "./SectionContainer.module.scss";
import ReadMore from "../../components/read-more/ReadMore";
import { useNavigate } from "react-router";
import { CategoriesContext } from "../../context/CategoriesContext";
import { categories } from "../../data/Categories";

export default function SectionContainer({
  title,
  style,
  children,
  readMore = false,
  categoryId,
}) {
  const navigate = useNavigate();

  const { setCategory } = useContext(CategoriesContext);

  const onReadMore = () => {
    if (categoryId) {
      const category = categories.find(
        (category) => category.id === categoryId
      );
      setCategory(category.slug);
      navigate(`/${category.slug}`);
    } else {
      setCategory("آخر الأخبار");
      navigate(`/آخر%20الأخبار`);
    }
  };

  return (
    <div className={styles.main} key={Math.random()}>
      <div className={styles.title}>
        {title && <h2>{title}</h2>}
        <hr />
      </div>
      <div style={style}>{children}</div>
      {readMore && (
        <div className={styles.readMore}>
          <ReadMore
            onClick={onReadMore}
            text="اقرأ المزيد"
            endIcon={<i class="fi fi-rr-arrow-left" />}
          />
        </div>
      )}
    </div>
  );
}
