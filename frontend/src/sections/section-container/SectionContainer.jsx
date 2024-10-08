import React from "react";
import styles from "./SectionContainer.module.scss";
import ReadMore from "../../components/read-more/ReadMore";

export default function SectionContainer({
  title,
  style,
  state,
  children,
  setState = () => {},
  onLoadMore = () => {},
  readMore = false,
}) {
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
            onClick={() => onLoadMore(state, setState)}
            text="اقرأ المزيد"
            endIcon={<i class="fi fi-rr-arrow-left" />}
          />
        </div>
      )}
    </div>
  );
}
