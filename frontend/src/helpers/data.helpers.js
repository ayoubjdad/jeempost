import axios from "axios";
import { newsUrl } from "../api/config";

export const fetchNews = async () => {
  const response = await axios.get(newsUrl);
  return response.data;
};

export const saveArticle = async (data) => {
  try {
    await axios.post(newsUrl, data);
  } catch (error) {
    console.error("❌ Error saving article:", error);
  }
};

export const deleteArticle = async (id) => {
  axios.delete(`${newsUrl}/${id}`);
};
