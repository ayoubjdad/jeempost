import React, { useState } from "react";
import styles from "./Editor.module.scss";
import "./EditorOverrides.scss";
import { Autocomplete, Box, Button, TextField } from "@mui/material";
import { convertToRaw, EditorState } from "draft-js";
import { Editor as DraftEditor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { categories } from "../../data/Categories";
import axios from "axios";
import draftToHtml from "draftjs-to-html";
import { newsUrl } from "../../api/config";

const toolbar = {
  options: [
    "inline",
    "blockType",
    "fontSize",
    "list",
    "textAlign",
    "link",
    "history",
  ],
  fontSize: {
    options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48],
  },
};

const Icon = ({ icon }) => (
  <Box component="i" className={`fi fi-rr-${icon} ${styles.clearIcon}`} />
);

export default function Editor() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [article, setArticle] = useState({
    id: "",
    headline: "",
    subHeadline: "",
    category: "",
    content: "",
    date: Date.now(),
    image: { src: "", srcset: "" },
    url: "",
    author: { name: "جيم بوست", profileUrl: "" },
    location: "",
    tags: [],
    keywords: [],
    comments: [],
  });

  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  const onCategoryChange = (e) => {
    setArticle((prevState) => {
      return { ...prevState, category: e.target.innerText };
    });
  };

  const onTitleChange = (e) => {
    setArticle((prevState) => ({
      ...prevState,
      headline: e.target.value,
      url: `news/19/10/2024/${e.target.value}`,
    }));
  };

  // * Handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setArticle((prevState) => ({
          ...prevState,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // * ==========================================================================
  // * ==========================================================================

  const saveArticle = async () => {
    const contentState = editorState.getCurrentContent();
    const rawContent = convertToRaw(contentState);
    const htmlContent = draftToHtml(rawContent);

    const articleToSave = {
      ...article,
      id: Math.random().toString(36).substring(2, 30),
      image: {
        ...article.image,
        src: "https://i1.hespress.com/wp-content/uploads/2022/12/agricole-agriculture.jpg",
      },
      content: htmlContent,
    };

    console.log(":::::: ~ article:", articleToSave);
    await axios.post(`${newsUrl}/create`, articleToSave);
  };

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.editorContainer}>
          <div className={styles.header}>
            <h1>إضافة نص جديد</h1>
            <div className={styles.headerButtons}>
              <Button>حفظ</Button>
              <Button
                sx={{ backgroundColor: "#040463", color: "white" }}
                onClick={saveArticle}
              >
                نشر
              </Button>
            </div>
          </div>
        </div>

        <div className={styles.editorContainer}>
          <div className={styles.editor}>
            <TextField
              variant="outlined"
              placeholder="العنوان"
              onChange={onTitleChange}
            />
            <DraftEditor
              editorState={editorState}
              wrapperClassName="demo-wrapper"
              editorClassName="demo-editor"
              onEditorStateChange={onEditorStateChange}
              placeholder="اكتب نصا هنا"
              toolbar={toolbar}
            />
          </div>

          <div className={styles.params}>
            <div className={styles.param}>
              <p>بتاريخ</p>
              <TextField variant="outlined" value={article.date} disabled />
            </div>

            <div className={styles.param}>
              <p>صنف</p>
              <Autocomplete
                clearIcon={<Icon icon="cross-small" />}
                popupIcon={<Icon icon="angle-small-down" />}
                options={categories}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => <TextField {...params} />}
                onChange={onCategoryChange}
              />
            </div>

            <div className={styles.param}>
              <p>الصورة</p>
              <div className={styles.upload}>
                {/* <label htmlFor="upload-button" className={styles.uploadLabel}>
                  <span>حمل صورة</span>
                  <Box component="i" className="fi fi-rr-cloud-upload" />
                </label> */}

                {/* <input
                  type="file"
                  id="upload-button"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleImageUpload}
                /> */}
              </div>
            </div>

            <div className={styles.param}>
              <p></p>
              {article.image && (
                <div className={styles.imagePreview}>
                  <img src={article.image} alt="Preview" width="100" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
