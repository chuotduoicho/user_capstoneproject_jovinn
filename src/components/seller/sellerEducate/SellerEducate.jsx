import {
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@material-ui/core";
import { Delete, Edit, EditOutlined, Remove } from "@material-ui/icons";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addEdus, deleteEdu, fetchCurrentUser } from "../../../redux/userSlice";
import "./sellerEducate.scss";
function format(date) {
  date = new Date(date);

  var day = ("0" + date.getDate()).slice(-2);
  var month = ("0" + (date.getMonth() + 1)).slice(-2);
  var year = date.getFullYear();

  return day + "-" + month + "-" + year;
}
export default function SellerEducate({ educations, id }) {
  const [editStatus, setEditStatus] = useState(false);
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [title, setTitle] = useState("");
  const [universityName, setUniversityName] = useState("");
  const [major, setMajor] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const handleEdit = (e) => {
    setEditStatus(true);
  };
  const handleNotEdit = (e) => {
    setEditStatus(false);
  };
  const handleEduRemove = (id) => {
    setOpenDelete(false);
    dispatch(deleteEdu(id))
      .unwrap()
      .then(() => {
        dispatch(fetchCurrentUser());
      })

      .catch(() => {});
  };
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleAddEdu = () => {
    const edus = {
      title,
      universityName,
      major,
      fromDate,
      toDate,
      userId: id,
      country: "Vietnam",
    };
    dispatch(addEdus(edus))
      .unwrap()
      .then(() => {
        dispatch(fetchCurrentUser());
        setOpen(false);
      })

      .catch(() => {});
  };
  const [openDelete, setOpenDelete] = React.useState(false);
  const handleClickOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
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
                      {/* <TableCell align="right">Quốc gia</TableCell> */}
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
                          {/* <TableCell align="right"> {item.country}</TableCell> */}
                          <TableCell align="right">
                            {" "}
                            {format(item.yearOfGraduation)}
                          </TableCell>
                          {editStatus && (
                            <TableCell align="right">
                              <EditOutlined color="primary" />
                              <Delete
                                color="secondary"
                                style={{ cursor: "pointer" }}
                                onClick={handleClickOpenDelete}
                              />
                            </TableCell>
                          )}
                          <Dialog
                            open={openDelete}
                            onClose={handleCloseDelete}
                            aria-labelledby="responsive-dialog-title"
                          >
                            <DialogTitle id="responsive-dialog-title">
                              {"Bạn có muốn xóa học vấn này?"}
                            </DialogTitle>
                            <DialogActions>
                              <Button
                                onClick={() => handleEduRemove(item.id)}
                                color="secondary"
                                variant="outlined"
                              >
                                Xóa
                              </Button>
                              <Button
                                onClick={handleCloseDelete}
                                color="default"
                                variant="outlined"
                              >
                                Hủy
                              </Button>
                            </DialogActions>
                          </Dialog>
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
                  <Button onClick={() => setOpen(true)}>Thêm</Button>
                  <Button onClick={handleNotEdit}>Xong</Button>
                </ButtonGroup>
              )}
              <Dialog
                fullWidth
                maxWidth="sm"
                open={open}
                onClose={handleClose}
                aria-labelledby="max-width-dialog-title"
              >
                <DialogTitle id="max-width-dialog-title">
                  Thêm học vấn
                </DialogTitle>
                <DialogContent>
                  {" "}
                  <TextField
                    id="outlined-basic"
                    label="Tiêu đề"
                    variant="outlined"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Trường"
                    variant="outlined"
                    onChange={(e) => setUniversityName(e.target.value)}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Ngành"
                    variant="outlined"
                    onChange={(e) => setMajor(e.target.value)}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Năm bắt đầu "
                    variant="outlined"
                    type="date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={(e) => setToDate(e.target.value)}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Năm tốt nghiệp "
                    variant="outlined"
                    type="date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={(e) => setFromDate(e.target.value)}
                  />
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={handleAddEdu}
                    color="primary"
                    variant="contained"
                  >
                    Thêm
                  </Button>
                  <Button onClick={handleClose} color="primary">
                    Đóng
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
