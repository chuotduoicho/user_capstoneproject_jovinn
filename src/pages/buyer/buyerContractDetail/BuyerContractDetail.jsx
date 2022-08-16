import {
  Button,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import React, { useState } from "react";
import BuyerHeader from "../../../components/buyer/buyerHeader/BuyerHeader";
import Contact from "../../../components/guest/contact/Contact";
import "./buyerContractDetail.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  acceptDeleveryContract,
  addComment,
  addRating,
  deleveryMilestone,
  fetchContractDetail,
  flagContract,
  selectContractBuyerById,
  selectContractDetail,
  selectContractDetailStatus,
} from "../../../redux/contractSlice";
import { useNavigate, useParams } from "react-router-dom";
import Rating from "@material-ui/lab/Rating";
import { Flag, FlagOutlined, StarBorder } from "@material-ui/icons";
import Alert from "@material-ui/lab/Alert";
import Comment from "../../../components/buyer/buyerComment/Comment";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function BuyerContractDetail() {
  const { contractId } = useParams();
  const contractDetail = useSelector(selectContractDetail);
  const contractDetailStatus = useSelector(selectContractDetailStatus);
  const [open, setOpen] = useState(false);
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState("sm");
  const [text, setText] = useState("");
  const [descriptionDelevery, setDescriptionDelevery] = useState("");
  const [milstoneId, setMilestoneId] = useState("");
  const [ratingPoint, setRatingPoint] = useState(0);
  const [listComment, setListComment] = useState([]);
  const [listStage, setListStage] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchContractDetail(contractId));
  }, []);
  useEffect(() => {
    if (contractDetailStatus == "success") {
      setListComment(contractDetail.comments);
      if (contractDetail.postRequest)
        setListStage(contractDetail.postRequest.milestoneContracts);
    }
  }, [contractDetailStatus]);

  const handleComment = () => {
    const obj = { ratingPoint: ratingPoint, comment: text };
    dispatch(addRating({ contractId, obj }))
      .unwrap()
      .then(() => {
        setSuccess("Xác nhận bàn giao thành công!");
        navigate("/buyerHome/manageContract");
        setOpen(false);
      })
      .catch(() => {
        setError("Xác nhận bàn giao thất bại!");
      });
  };
  const handleDelevery = () => {
    const delevery = {
      milestoneId: milstoneId,
      description: descriptionDelevery,
    };
    dispatch(deleveryMilestone({ contractId, delevery }))
      .unwrap()
      .then(() => {
        toast.success("Bàn giao thành công!");
        setOpenDelevery(false);
      })
      .catch(() => {
        toast.error("Bàn giao thất bại!");
        setOpenDelevery(false);
      });
  };
  const handleFlag = () => {
    dispatch(flagContract(contractId))
      .unwrap()
      .then(() => {
        toast.success("Gắn cờ thành công!");
        // setOpenDelevery(false);
      })
      .catch(() => {
        toast.error("Gắn cờ thất bại!");
        // setOpenDelevery(false);
      });
  };
  const handleOpen = () => {
    dispatch(acceptDeleveryContract(contractId))
      .unwrap()
      .then(() => {
        toast.success("Xác nhận bàn giao thành công!");
        setOpen(true);
      })
      .catch(() => {
        toast.error("Xác nhận bàn giao thất bại");
      });
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [openDelevery, setOpenDelevery] = useState(false);
  const handleClickOpenDelevery = () => {
    setOpenDelevery(true);
  };

  const handleCloseDelevery = () => {
    setOpenDelevery(false);
  };
  return (
    <div className="buyer_profile">
      <BuyerHeader />
      <h1 className="buyer_profile_title">Chi tiết hợp đồng</h1>
      <Container maxWidth="lg" className="profession_form">
        <div className="paymentRow_Title">
          <h2>Mã hợp đồng : {contractDetail.contractCode} </h2>
          {!contractDetail.flag ? (
            <FlagOutlined onClick={handleFlag} style={{ cursor: "pointer" }} />
          ) : (
            <Flag onClick={handleFlag} style={{ cursor: "pointer" }} />
          )}
          <Chip
            label={contractDetail.deliveryStatus}
            className="chip_pending"
          />
        </div>
        <div className="paymentRow_Content">
          <h3>Yêu cầu:</h3>
          <p>{contractDetail.requirement}</p>
        </div>
        <div className="paymentRow_Content">
          <h3>Tổng thời gian bàn giao:</h3>
          <p>{contractDetail.totalDeliveryTime} ngày</p>
        </div>
        <div className="paymentRow_ContentLast">
          <h3>Ngày hoàn thành dự kiến:</h3>
          <p>{contractDetail.expectCompleteDate}</p>
        </div>
        {contractDetail.postRequest && (
          <div className="paymentRow_ContentLast">
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 850 }}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Số thứ tự</TableCell>
                    <TableCell align="right">Mô tả</TableCell>
                    <TableCell align="right">Chi phí</TableCell>
                    <TableCell align="right">Trạng thái</TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {listStage.map((item, index) => {
                    return (
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          Giai đoạn {index + 1}
                        </TableCell>
                        <TableCell align="right"> {item.description}</TableCell>
                        <TableCell align="right">{item.milestoneFee}</TableCell>
                        <TableCell align="right">{item.status}</TableCell>
                        <TableCell align="right">
                          <Button
                            color="primary"
                            variant="outlined"
                            onClick={() => {
                              setOpenDelevery(true);
                              setMilestoneId(item.id);
                            }}
                          >
                            Bàn giao
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
                <Dialog
                  fullWidth
                  maxWidth="sm"
                  open={openDelevery}
                  onClose={handleCloseDelevery}
                  aria-labelledby="responsive-dialog-title"
                >
                  <DialogTitle id="responsive-dialog-title">
                    {"Nhập mô tả bàn giao"}
                  </DialogTitle>
                  <DialogContent>
                    <TextField
                      id="outlined-basic"
                      label="Mô tả bàn giao"
                      variant="outlined"
                      multiline
                      rows={5}
                      style={{ width: "100%" }}
                      onChange={(e) => setDescriptionDelevery(e.target.value)}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={handleDelevery}
                      color="primary"
                      variant="outlined"
                    >
                      Xác nhận
                    </Button>
                    <Button
                      onClick={handleCloseDelevery}
                      color="default"
                      variant="outlined"
                    >
                      Hủy
                    </Button>
                  </DialogActions>
                </Dialog>
              </Table>
            </TableContainer>
          </div>
        )}
        <div className="paymentRow_payment">
          <h4>Số lượng : </h4>
          <p>{contractDetail.quantity}</p>
        </div>
        <div className="paymentRow_payment">
          <h4>Tổng chi phí : </h4>
          <p>{contractDetail.totalPrice} $</p>
        </div>
        <div className="paymentRow_paymentLast">
          <h4>Phí hủy hợp đồng : </h4>
          <p>
            {contractDetail.quantity}% ( =
            {(contractDetail.totalPrice * contractDetail.quantity) / 100} $ )
          </p>
        </div>
        <div className="paymentRow">
          {contractDetail.deliveryStatus !== "SENDING" && (
            <Button variant="contained" color="primary" onClick={handleOpen}>
              Xác nhận bàn giao
            </Button>
          )}
        </div>
        {error !== "" && <Alert severity="error">{error}</Alert>}
        {success !== "" && <Alert severity="success">{success}</Alert>}
        <div className="paymentRow">
          <Comment comments={listComment} contractId={contractId} />
        </div>{" "}
        <Dialog
          fullWidth={fullWidth}
          maxWidth={maxWidth}
          open={open}
          onClose={handleClose}
          aria-labelledby="max-width-dialog-title"
        >
          <DialogTitle id="max-width-dialog-title">
            Đánh giá dịch vụ
          </DialogTitle>
          <DialogContent>
            <div className="profession_row">
              <Rating
                name="customized-empty"
                onChange={(e) => setRatingPoint(e.target.value)}
                defaultValue={ratingPoint}
                precision={1}
                emptyIcon={<StarBorder fontSize="inherit" />}
              />
              <TextField
                id="outlined-basic"
                label="Đánh giá về dịch vụ"
                variant="outlined"
                multiline
                rows={4}
                style={{ width: "100%" }}
                onChange={(e) => setText(e.target.value)}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleComment} color="primary" variant="contained">
              Xác nhận
            </Button>
            <Button onClick={handleClose} color="primary">
              Đóng
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
      <ToastContainer limit={3000} position="bottom-right" />
      <div className="sections_profile">
        <Contact />
      </div>
    </div>
  );
}
