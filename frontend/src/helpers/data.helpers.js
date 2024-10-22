import axios from "axios";
import { newsUrl } from "../api/config";

export const fetchNews = async () => {
  const response = await axios.get(newsUrl);
  return response.data;
};
