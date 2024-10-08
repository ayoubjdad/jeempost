import React, { useState } from "react";
import styles from "./Editor.module.scss";
import "./EditorOverrides.scss";
import { Autocomplete, Button, Switch, TextField } from "@mui/material";
import { EditorState } from "draft-js";
import { Editor as DraftEditor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { categories } from "../../data/Categories";

export default function Editor() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  function onEditorStateChange(newEditorState) {
    setEditorState(newEditorState);
  }

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.editorContainer}>
          <div className={styles.header}>
            <h1>إضافة نص جديد</h1>
            <div className={styles.headerButtons}>
              <Button>حفظ</Button>
              <Button sx={{ backgroundColor: "#040463", color: "white" }}>
                نشر
              </Button>
            </div>
          </div>
        </div>
        <div className={styles.editorContainer}>
          <div className={styles.editor}>
            <TextField variant="outlined" defaultValue="إضافة نص جديد" />
            <DraftEditor
              editorState={editorState}
              wrapperClassName="demo-wrapper"
              editorClassName="demo-editor"
              onEditorStateChange={onEditorStateChange}
              toolbar={{
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
              }}
            />
          </div>
          <div className={styles.params}>
            <div className={styles.param}>
              <p>بتاريخ</p>
              <TextField
                variant="outlined"
                defaultValue={Date.now()}
                disabled
              />
            </div>
            <div className={styles.param}>
              <p>صنف</p>
              <Autocomplete
                clearIcon={
                  <i className={`fi fi-rr-cross-small ${styles.clearIcon}`} />
                }
                popupIcon={
                  <i
                    className={`fi fi-rr-angle-small-down ${styles.clearIcon}`}
                  />
                }
                // open
                options={categories}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => <TextField {...params} />}
              />
            </div>
            <div className={styles.param}>
              <p>الصورة</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
