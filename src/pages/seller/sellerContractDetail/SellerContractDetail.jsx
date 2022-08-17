import {
  Button,
  Chip,
  CircularProgress,
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
import "./sellerContractDetail.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  selectContractSellerById,
  selectCurrentUser,
  uploadFile,
} from "../../../redux/userSlice";
import { useNavigate, useParams } from "react-router-dom";
import { CloudUpload, StarBorder } from "@material-ui/icons";
import {
  acceptExtra,
  cancleExtra,
  deleveryMilestone,
  fetchContractDetail,
  selectContractBuyerById,
  selectContractDetail,
  selectContractDetailStatus,
  selectContractStatus,
  uploadDeleveryContract,
} from "../../../redux/contractSlice";
import SellerHeader from "../../../components/seller/sellerHeader/SellerHeader";
import Alert from "@material-ui/lab/Alert";
import Comment from "../../../components/buyer/buyerComment/Comment";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function SellerContractDetail() {
  const { contractId } = useParams();
  const currentUser = useSelector(selectCurrentUser);
  const contractDetail = useSelector(selectContractDetail);
  const contractDetailStatus = useSelector(selectContractDetailStatus);
  const status = useSelector(selectContractStatus);
  console.log("contractDetail", contractDetail);
  const [open, setOpen] = useState(false);
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState("sm");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [file, setFile] = useState(null);
  const [descriptionDelevery, setDescriptionDelevery] = useState("");
  const [milstoneId, setMilestoneId] = useState("");
  const [listComment, setListComment] = useState([]);
  const [listStage, setListStage] = useState([]);
  const handleRating = () => {};
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
  const handleAcceptOffer = (value) => {
    const extraOfferId = value;
    dispatch(acceptExtra({ contractId, extraOfferId }))
      .unwrap()
      .then(() => {
        toast.success("Chấp nhận đề nghị thành công!");
        dispatch(fetchContractDetail(contractId));
      })
      .catch(() => {
        toast.error("Chấp nhận đề nghị thất bại!");
      });
  };

  const handleOpen = (e) => {
    setFile(e.target.files[0]);
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    formData.append("id", currentUser.id);
    formData.append("type", "DELIVERY");
    dispatch(uploadFile(formData))
      .unwrap()
      .then(() => {
        dispatch(uploadDeleveryContract(contractId))
          .unwrap()
          .then(() => {
            setSuccess("Tải lên bàn giao thành công!");
            setOpen(true);
          })
          .catch(() => {
            setError("Tải lên bàn giao thất bại!");
          });
      })
      .catch(() => {});
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
      <SellerHeader />
      <h1 className="buyer_profile_title">Chi tiết hợp đồng</h1>
      <Container maxWidth="lg" className="profession_form">
        <div className="paymentRow_Title">
          <h2>Mã hợp đồng : {contractDetail.contractCode} </h2>
          <Chip
            label={contractDetail.contractStatus}
            className="chip_pending"
          />
        </div>
        <div className="paymentRow_Content">
          <h3>Yêu cầu:</h3>
          <p>{contractDetail.requirement}</p>
        </div>
        <div className="paymentRow_Content">
          <h3>Trạng thái bàn giao:</h3>
          <p>{contractDetail.deliveryStatus}</p>
        </div>
        <div className="paymentRow_Content">
          <h3>Tổng thời gian bàn giao:</h3>
          <p>{contractDetail.totalDeliveryTime} ngày</p>
        </div>
        <div className="paymentRow_ContentLast">
          <h3>Ngày hoàn thành dự kiến:</h3>
          <p>{contractDetail.expectCompleteDate}</p>
        </div>
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
        {contractDetail.postRequest && (
          <div className="paymentRow_ContentLast">
            <h3>Giai đoạn bàn giao:</h3>
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
                          {item.status == "COMPLETE" ? (
                            <Chip label="Đã hoàn thành" />
                          ) : (
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
                          )}
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
        {contractDetail.extraOffers && (
          <div className="paymentRow_ContentLast">
            <h3>Đề nghị:</h3>
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 850 }}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Tiêu đề</TableCell>
                    <TableCell align="right">Mô tả</TableCell>
                    <TableCell align="right">Số ngày</TableCell>
                    <TableCell align="right">Chi phí</TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {contractDetail.extraOffers.map((item, index) => {
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
                          {item.shortDescription}
                        </TableCell>
                        <TableCell align="right">{item.additionTime}</TableCell>
                        <TableCell align="right">{item.extraPrice}</TableCell>
                        <TableCell align="right">
                          {item.opened ? (
                            <Button
                              variant="outlined"
                              color="primary"
                              onClick={() => handleAcceptOffer(item.id)}
                            >
                              Chấp nhận
                            </Button>
                          ) : (
                            <Chip label="Đã đóng" />
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}
        <div className="paymentRow">
          <Button
            variant="contained"
            onClick={() => navigate(-1)}
            style={{ marginRight: "10px" }}
          >
            Quay lại
          </Button>
          <label htmlFor="file1">
            <Button
              variant="contained"
              color="primary"
              component="span"
              startIcon={<CloudUpload />}
            >
              Tải lên bàn giao
            </Button>
          </label>
          <input
            type="file"
            id="file1"
            onChange={handleOpen}
            style={{ display: "none" }}
          />
          <img
            src={file ? URL.createObjectURL(file) : ""}
            alt=""
            style={{ width: "100px" }}
          />
        </div>
        {status == "loading" && (
          <CircularProgress style={{ margin: "0 auto" }} />
        )}
        {error !== "" && <Alert severity="error">{error}</Alert>}
        {success !== "" && <Alert severity="success">{success}</Alert>}
        <div className="paymentRow">
          <Comment comments={listComment} contractId={contractId} />
        </div>{" "}
      </Container>
      <ToastContainer limit={3000} position="bottom-right" />
      <div className="sections_profile">
        <Contact />
      </div>
    </div>
  );
}
