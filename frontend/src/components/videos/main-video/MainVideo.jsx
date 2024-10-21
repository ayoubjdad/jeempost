import React from "react";
import styles from "./MainVideo.module.scss";
import { Skeleton } from "@mui/material";

export default function MainVideo({ video, isLoading, index }) {
  const videoId = video?.id.videoId;
  const title =
    video?.snippet.title.length > 50
      ? video?.snippet.title.substring(0, 50) + "..."
      : video?.snippet.title;
  const thumbnail = video?.snippet.thumbnails.medium.url;

  if (isLoading) {
    return (
      <Skeleton
        variant="text"
        width={255}
        height={192}
        style={{
          transform: "none",
          borderRadius: "6px",
        }}
      />
    );
  }

  return (
    <div
      key={videoId}
      className={styles.main}
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${thumbnail})`,
      }}
    >
      <i className={`fi fi-tr-play-circle ${styles.playIcon}`} />
      <a
        href={`https://www.youtube.com/watch?v=${videoId}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <p className={styles.title} title={video?.snippet.title}>
          {title}
        </p>
      </a>
    </div>
  );
}
