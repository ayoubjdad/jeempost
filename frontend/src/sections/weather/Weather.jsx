import React from "react";
import styles from "./Weather.module.scss";
import axios from "axios";
import { useQuery } from "react-query";

const options = {
  refetchOnWindowFocus: false,
  retry: false,
};
const fetchWeather = async () => {
  const response = await axios.get(
    "https://api-business.asharqbusiness.com/api/weather"
  );
  return response.data;
};

export default function Weather() {
  const { data: weather } = useQuery("weather", fetchWeather, options);

  return (
    <div className={styles.main}>
      <p>{weather?.data?.name}</p>
      <p>{weather?.data?.temp?.now}</p>
      <p>|</p>
      <p>{weather?.data?.description}</p>
    </div>
  );
}
