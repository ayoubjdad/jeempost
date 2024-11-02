import React from "react";
import styles from "./Edit.module.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useQuery } from "react-query";
import { fetchNews } from "../../../helpers/data.helpers";
import { categories } from "../../../data/Categories";
import { convertDateToArarbic } from "../../../helpers/global.helper";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router";

export default function Edit() {
  const { data: news = [], isLoading } = useQuery("news", fetchNews, {
    refetchOnWindowFocus: false,
    retry: false,
  });

  const navigate = useNavigate();

  const rows = news?.map((article) => {
    const category = categories.find(
      (category) => category.id === article.categoryId
    );
    const createdAt = convertDateToArarbic(article.createdAt);
    return {
      id: article.id,
      headline: article.headline,
      author: article.author.name,
      createdAt,
      category: category.name,
    };
  });

  const onClick = (article) => {
    navigate(`/admin/news/edit/${article.id}`, { state: { article } });
  };

  const addNews = () => {
    navigate("/admin/news/add-new");
  };

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>مقالات</h1>
          <Button
            sx={{ backgroundColor: "#040463", color: "white" }}
            onClick={addNews}
          >
            أضف جديداً
          </Button>
        </div>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">العنوان</TableCell>
                <TableCell align="right">الكاتب</TableCell>
                <TableCell align="right">تصنيف</TableCell>
                <TableCell align="right">التاريخ</TableCell>
                <TableCell align="left" />
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    align="right"
                    style={{
                      maxWidth: "500px",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                    }}
                    title={row.headline}
                  >
                    {row.headline}
                  </TableCell>
                  <TableCell align="right">{row.author}</TableCell>
                  <TableCell align="right">
                    <div
                      style={{
                        background: "#e0e0e0",
                        width: "fit-content",
                        padding: "2px 6px",
                        borderRadius: "4px",
                      }}
                    >
                      {row.category}
                    </div>
                  </TableCell>
                  <TableCell align="right">{row.createdAt}</TableCell>
                  <TableCell
                    align="right"
                    style={{ display: "flex", direction: "ltr", gap: "8px" }}
                  >
                    <Box
                      component="i"
                      className={`fi fi-rr-eye ${styles.icon}`}
                    />
                    <Box
                      component="i"
                      className={`fi fi-rr-pencil ${styles.icon}`}
                      onClick={() => onClick(row)}
                    />
                    <Box
                      component="i"
                      className={`fi fi-rr-trash ${styles.icon} ${styles.deleteIcon}`}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
