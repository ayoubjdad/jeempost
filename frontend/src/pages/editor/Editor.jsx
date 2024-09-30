import React from "react";
import styles from "./Editor.module.scss";
import { Autocomplete, Button, Switch, TextField } from "@mui/material";

export default function Editor() {
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <h1>إضافة نص جديد</h1>
        <div className={styles.editorContainer}>
          <div className={styles.editor}>
            <TextField variant="outlined" defaultValue="إضافة نص جديد" />
            <TextField
              variant="outlined"
              defaultValue="إضافة نص جديد"
              multiline
            />
          </div>
          <div className={styles.params}>
            <div className={styles.param}>
              <p>نشر</p>
              <Switch />
            </div>
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
                disablePortal
                options={[]}
                renderInput={(params) => <TextField {...params} />}
              />
            </div>
            <div className={styles.param}>
              <p>الصورة</p>
            </div>
            <Button>إضافة</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
