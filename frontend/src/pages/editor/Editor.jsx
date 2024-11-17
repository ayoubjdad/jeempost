import React, { useState } from "react";
import styles from "./Editor.module.scss";
import "./EditorOverrides.scss";
import { Autocomplete, Box, Button, Switch, TextField } from "@mui/material";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { categories } from "../../data/Categories";
import { useQuery } from "react-query";
import { saveArticle } from "../../helpers/data.helpers";
import {
  convertDateToArarbic,
  convertTimestampToDate,
} from "../../helpers/global.helper";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Add styles for Quill editor
import axios from "axios";
import { serverUrl } from "../../api/config";

const Icon = ({ icon }) => (
  <Box component="i" className={`fi fi-rr-${icon} ${styles.clearIcon}`} />
);

// * Full toolbar with RTL option
const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    [{ font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    [{ align: [] }],
    ["blockquote", "code-block"],
    ["link", "image", "video"],
    [{ direction: "rtl" }], // Add RTL button here
    ["clean"],
  ],
};
const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "code-block",
  "list",
  "bullet",
  "script",
  "align",
  "color",
  "background",
  "link",
  "image",
  "video",
  "direction",
];

const fetchImages = async () => {
  try {
    const response = await axios.get(serverUrl + "/api/images");
    return response.data.images;
  } catch (error) {
    console.error("Error fetching images:", error);
  }
};

export default function Editor() {
  const { data: images } = useQuery("images", fetchImages, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: false,
  });

  const defaultArticle = {
    id: String(Math.random() * 1000000),
    headline: "",
    subHeadline: "",
    categoryId: "",
    content: "",
    isHighlight: false,
    visibility: "منشور",
    image: { src: "", srcset: "" },
    url: "",
    author: { name: "جيم بوست", profileUrl: "" },
    location: "",
    tags: [],
    keywords: [],
    comments: [],
  };

  const [article, setArticle] = useState(defaultArticle);
  const [imageUrl, setImageUrl] = useState(null);
  const [content, setContent] = useState("");

  // Function to handle file upload input
  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = await uploadImage(file);
      setImageUrl(url);
    }
  };

  // Function to upload the image to the server and get the URL
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(
        serverUrl + "/api/upload/image",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return response.data.imageUrl;
    } catch (error) {
      console.error("❌ Error uploading image:", error);
      return null;
    }
  };

  const onChange = (key, e) => {
    try {
      let value = e.target.value;
      if (key === "isHighlight") {
        value = e.target.checked;
      }
      setArticle((prev) => ({ ...prev, [key]: value }));
    } catch (error) {
      console.error("❌", error);
    }
  };

  const onSelect = (key, e) => {
    try {
      const value = e.target.innerText;
      const category = categories.find((category) => {
        return category.name === value;
      });

      setArticle((prev) => ({ ...prev, [key]: value }));
      onChange("categoryId", { target: { value: category?.id } });
    } catch (error) {
      console.error("❌", error);
    }
  };

  const handleSave = async () => {
    try {
      const today = convertTimestampToDate(Date.now());

      const newArticle = {
        ...article,
        url: `/news/${today}/${article.headline}`,
        content,
        image: { ...article.image, src: imageUrl }, // Store only the URL of the uploaded image
      };

      await saveArticle(newArticle);
      alert("تم نشر المقال");
      setArticle({ ...defaultArticle });
      setContent("");
      setImageUrl(null); // Reset the image file after saving
    } catch (error) {
      console.error("❌ Error in handleSave:", error);
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.editorContainer}>
          <div className={styles.header}>
            <h1>إضافة نص جديد</h1>
            <Button onClick={handleSave}>نشر</Button>
          </div>
        </div>

        <div className={styles.editorContainer}>
          <div className={styles.editor}>
            <TextField
              variant="outlined"
              placeholder="العنوان"
              defaultValue={article.headline}
              onBlur={(e) => onChange("headline", e)}
            />

            <div dir={"rtl"}>
              <ReactQuill
                value={content}
                onChange={setContent}
                modules={modules}
                formats={formats}
                placeholder={"اكتب المحتوى هنا..."}
                theme="snow"
              />
            </div>
          </div>

          <div className={styles.params}>
            <div className={styles.param}>
              <p>بتاريخ</p>
              <TextField
                variant="outlined"
                value={convertDateToArarbic(Date.now())}
                disabled
              />
            </div>

            {/* <div className={styles.param}>
              <p>الحالة</p>
              <Autocomplete
                clearIcon={<Icon icon="cross-small" />}
                popupIcon={<Icon icon="angle-small-down" />}
                options={["مسودة", "منشور"]}
                defaultValue={"منشور"}
                renderInput={(params) => <TextField {...params} />}
              />
            </div> */}

            <div className={styles.param}>
              <p>مهم</p>
              <Switch onChange={(e) => onChange("isHighlight", e)} />
            </div>

            <div className={styles.param}>
              <p>تصنيف</p>
              <Autocomplete
                clearIcon={<Icon icon="cross-small" />}
                popupIcon={<Icon icon="angle-small-down" />}
                options={categories}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => <TextField {...params} />}
                onChange={(e) => onSelect("categoryId", e)}
              />
            </div>

            <div className={styles.param}>
              <p>الكاتب</p>
              <TextField variant="outlined" disabled value="جيم بوست" />
            </div>

            <div className={styles.param}>
              <p>الصورة</p>
              <div className={styles.upload}>
                <label htmlFor="upload-button" className={styles.uploadLabel}>
                  <span>حمل صورة</span>
                  <Box component="i" className="fi fi-rr-cloud-upload" />
                </label>

                <input
                  type="file"
                  id="upload-button"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleUpload}
                />
              </div>
            </div>

            <div className={styles.param}>
              <p></p>
              {imageUrl && (
                <div className={styles.imagePreview}>
                  <img src={serverUrl + imageUrl} alt="Preview" width="100" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
