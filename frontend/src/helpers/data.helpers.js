import axios from "axios";
import { newsUrl } from "../api/config";

export const fetchNews = async () => {
  const response = await axios.get(newsUrl);
  return response.data;
};

export const saveArticle = async (data) => {
  await axios.post(newsUrl, data);
};
