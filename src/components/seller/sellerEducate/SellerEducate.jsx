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
export default function SellerEducate() {
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
                    <TableRow
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        Cử nhân CNTT
                      </TableCell>
                      <TableCell align="right">FPT University</TableCell>
                      <TableCell align="right">Kỹ thuật phần mềm</TableCell>
                      <TableCell align="right">Việt Nam</TableCell>
                      <TableCell align="right">2022</TableCell>
                    </TableRow>
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
