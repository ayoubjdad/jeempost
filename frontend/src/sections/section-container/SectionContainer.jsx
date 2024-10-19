import React from "react";
import styles from "./SectionContainer.module.scss";
import ReadMore from "../../components/read-more/ReadMore";
import { categories } from "../../data/Categories";
import { useNavigate } from "react-router";

export default function SectionContainer({
  title,
  style,
  children,
  readMore = false,
}) {
  // const navigate = useNavigate();

  // const category = categories.find((category) => category.name === title);

  // const onClick = () => {
  //   navigate(`/${category.slug}`);
  // };

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
            // onClick={onClick}
            text="اقرأ المزيد"
            endIcon={<i class="fi fi-rr-arrow-left" />}
          />
        </div>
      )}
    </div>
  );
}
