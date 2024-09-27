import React from "react";
import styles from "./SectionContainer.module.scss";
import ReadMore from "../../components/read-more/ReadMore";

export default function SectionContainer({
  children,
  title,
  readMore = false,
  style,
}) {
  return (
    <div className={styles.main}>
      <div className={styles.title}>
        {title && <h2>{title}</h2>}
        <hr />
      </div>
      <div style={style}>{children}</div>
      {readMore && (
        <div className={styles.readMore}>
          <ReadMore
            text="اقرأ المزيد"
            endIcon={<i class="fi fi-rr-arrow-left" />}
          />
        </div>
      )}
    </div>
  );
}
