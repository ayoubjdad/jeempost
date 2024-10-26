import React from "react";
import styles from "./Videos.module.scss";
import SectionContainer from "../section-container/SectionContainer";
import MainVideo from "../../components/videos/main-video/MainVideo";
import { useQuery } from "react-query";

const API_KEY = "AIzaSyA-temT-dFDU2GZgFezhlH2ei8fyDfXRzI";
const CHANNEL_ID = "UC9CDwSeyjDPUWAITrRCSOQQ";
const maxResults = 10;

const fetchVideos = async () => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=${maxResults}`
    );
    return response.json();
  } catch (error) {
    console.error("❌", error);
    return null;
  }
};

export default function Videos() {
  const { data: videos = [], isLoading: videosLoading } = useQuery(
    "videos",
    fetchVideos,
    {
      refetchOnWindowFocus: false,
      retry: false,
    }
  );

  const videosList = videos?.items?.slice(0, 8) || [];

  const onReadMore = () => {
    window.open("https://www.youtube.com/@jeempost", "_blank");
  };

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <SectionContainer title="فيديوهات" readMore onReadMore={onReadMore}>
          <div className={styles.section}>
            {videosList.map((video, index) => (
              <MainVideo
                video={video}
                index={index}
                isLoading={videosLoading}
              />
            ))}
          </div>
        </SectionContainer>
      </div>
    </div>
  );
}
