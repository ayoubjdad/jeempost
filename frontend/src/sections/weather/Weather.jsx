import React from "react";
import styles from "./Weather.module.scss";
import axios from "axios";
import { useQuery } from "react-query";

const options = {
  refetchOnWindowFocus: false,
  refetchOnMount: false,
  retry: false,
};
const fetchWeather = async () => {
  const response = await axios.get(
    "https://api-business.asharqbusiness.com/api/weather",
    {
      params: {
        city: "Casablanca", // Assuming the API allows querying by city name
      },
    }
  );
  return response.data;
};

export default function Weather() {
  const { data: weather } = useQuery("weather", fetchWeather, options);

  const date = new Date(Date.now());

  // Convert to Arabic locale
  const arabicDate = date.toLocaleDateString("ar-MA", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className={styles.main}>
      {/* <p className={styles.city}>{weather?.data?.name}</p> */}
      {/* <p className={styles.separator}>|</p> */}
      <p className={styles.temp}>{weather?.data?.temp?.now}</p>
      <p className={styles.separator}>|</p>
      <p className={styles.date}>{arabicDate}</p>
    </div>
  );
}
