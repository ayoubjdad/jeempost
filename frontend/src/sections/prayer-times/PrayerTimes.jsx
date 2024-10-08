import React from "react";
import styles from "./PrayerTimes.module.scss";
import axios from "axios";
import { convertTimestampToDate } from "../../helpers/global.helper";
import { useQuery } from "react-query";
import { Prayers } from "../../data/translations/Prayers";
import { Box } from "@mui/material";

// https://api.aladhan.com/v1/timings/{date}
const options = {
  refetchOnWindowFocus: false,
  retry: false,
};

const fetchPrayerTimes = async (latitude, longitude, method = 2) => {
  try {
    const latitude = 33.5731;
    const longitude = -7.5898;

    const response = await axios.get("http://api.aladhan.com/v1/timings", {
      params: {
        latitude,
        longitude,
        method, // method = 2 for Islamic Society of North America (ISNA)
      },
    });
    // Asr
    // Dhuhr
    // Fajr
    // Isha
    // Maghrib

    // const salawat = Object.keys(prayerTimes || {}).filter((prayer)=> Prayers?.[prayer])

    const prayerTimes = response.data.data.timings;

    const selectedPrayers = [
      { name: Prayers.Fajr, time: prayerTimes.Fajr },
      { name: Prayers.Dhuhr, time: prayerTimes.Dhuhr },
      { name: Prayers.Asr, time: prayerTimes.Asr },
      { name: Prayers.Maghrib, time: prayerTimes.Maghrib },
      { name: Prayers.Isha, time: prayerTimes.Isha },
    ];

    return selectedPrayers;
  } catch (error) {
    console.error("Error fetching prayer times:", error);
  }
};

const Salat = ({ prayer, index }) => {
  const icon =
    index === 0
      ? "sunrise-alt"
      : index === 1
      ? "sun"
      : index === 2
      ? "eclipse"
      : index === 3
      ? "sunset"
      : "moon";

  return (
    <div className={styles.salat}>
      <Box className={`fi fi-rr-${icon}`} component="i" />
      <p className={styles.alias}>{prayer.name}</p>
      <p className={styles.time}>{prayer.time}</p>
    </div>
  );
};

export default function PrayerTimes() {
  const { data: prayerTimes } = useQuery(
    "prayerTimes",
    fetchPrayerTimes,
    options
  );

  return (
    <div className={styles.main}>
      {prayerTimes?.map((prayer, index) => (
        <Salat prayer={prayer} index={index} />
      ))}
    </div>
  );
}
