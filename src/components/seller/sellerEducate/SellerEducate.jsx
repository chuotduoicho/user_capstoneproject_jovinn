import {
  Button,
  ButtonGroup,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import React from "react";
import { useState } from "react";
import "./sellerEducate.scss";
function format(date) {
  date = new Date(date);

  var day = ("0" + date.getDate()).slice(-2);
  var month = ("0" + (date.getMonth() + 1)).slice(-2);
  var year = date.getFullYear();

  return day + "-" + month + "-" + year;
}
export default function SellerEducate({ educations }) {
  const [editStatus, setEditStatus] = useState(false);
  const handleEdit = (e) => {
    setEditStatus(true);
  };
  const handleNotEdit = (e) => {
    setEditStatus(false);
  };

  return (
    <div className="sellerIntro">
      {" "}
      <div className="top">
        <div className="left">
          <div className="editButton" onClick={handleEdit}>
            Chỉnh sửa
          </div>
          <h1 className="title">Học vấn</h1>
          <div className="item">
            <div className="details">
              <TableContainer component={Paper}>
                <Table
                  sx={{ minWidth: 650 }}
                  size="small"
                  aria-label="a dense table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>Tiêu đề</TableCell>
                      <TableCell align="right">Trường</TableCell>
                      <TableCell align="right">Ngành</TableCell>
                      <TableCell align="right">Quốc gia</TableCell>
                      <TableCell align="right">Năm</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {educations.map((item, index) => {
                      return (
                        <TableRow
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {item.title}
                          </TableCell>
                          <TableCell align="right">
                            {" "}
                            {item.universityName}
                          </TableCell>
                          <TableCell align="right"> {item.major}</TableCell>
                          <TableCell align="right"> {item.country}</TableCell>
                          <TableCell align="right">
                            {" "}
                            {format(item.yearOfGraduation)}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
              {editStatus && (
                <ButtonGroup
                  disableElevation
                  variant="contained"
                  className="btnGroup"
                  style={{ justifyContent: "center" }}
                >
                  <Button>Cập nhật</Button>
                  <Button onClick={handleNotEdit}>Hủy</Button>
                </ButtonGroup>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
