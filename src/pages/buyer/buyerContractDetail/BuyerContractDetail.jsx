import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import React, { useState } from "react";
import BuyerHeader from "../../../components/buyer/buyerHeader/BuyerHeader";
import Contact from "../../../components/guest/contact/Contact";
import "react-credit-cards/es/styles-compiled.css";
import "./buyerContractDetail.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  acceptDeleveryContract,
  addComment,
  addRating,
  selectContractBuyerById,
} from "../../../redux/contractSlice";
import { useNavigate, useParams } from "react-router-dom";
import Rating from "@material-ui/lab/Rating";
import { StarBorder } from "@material-ui/icons";
import Alert from "@material-ui/lab/Alert";

export default function BuyerContractDetail() {
  const { contractId } = useParams();
  const contractDetail = useSelector((state) =>
    selectContractBuyerById(state, contractId)
  );
  console.log("contractDetail", contractDetail);
  const [open, setOpen] = useState(false);
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState("sm");
  const [text, setText] = useState("");
  const [ratingPoint, setRatingPoint] = useState(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
  const handleOpen = () => {
    dispatch(acceptDeleveryContract(contractId))
      .unwrap()
      .then(() => {
        setSuccess("Xác nhận bàn giao thành công!");
        setOpen(true);
      })
      .catch(() => {
        setError("Xác nhận bàn giao thất bại!");
      });
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className="buyer_profile">
      <BuyerHeader />
      <h1 className="buyer_profile_title">Chi tiết hợp đồng</h1>
      <Container maxWidth="lg" className="profession_form">
        <div className="paymentRow">
          <h3>Mã hợp đồng : {contractDetail.contractCode} </h3>
        </div>
        <div className="paymentRow">
          <h4>Yêu cầu: {contractDetail.requirement}</h4>
        </div>
        <div className="paymentRow">
          <h4>Số lượng : {contractDetail.quantity} </h4>
        </div>
        <div className="paymentRow">
          <h4>
            Phí hủy hợp đồng: {contractDetail.contractCancelFee}% (= 100$)
          </h4>
        </div>
        <div className="paymentRow">
          <h2>Tổng chi phí: {contractDetail.totalPrice}$</h2>
        </div>{" "}
        <div className="paymentRow">
          <h2>
            Tổng thời gian bàn giao:{contractDetail.totalDeliveryTime} ngày
          </h2>
        </div>{" "}
        <div className="paymentRow">
          <h2>Ngày hoàn thành dự kiến: {contractDetail.expectCompleteDate}</h2>
        </div>{" "}
        <div className="paymentRow">
          <h2>Trạng thái bàn giao: {contractDetail.deliveryStatus}</h2>
        </div>{" "}
        <div className="paymentRow">
          <h2>Các đề nghị phát sinh: {contractDetail.extraOffers}</h2>
        </div>{" "}
        {/* <div className="paymentRow">
          <h2>Bình luận: {contractDetail.comments}</h2>
        </div>{" "} */}
        <div className="paymentRow">
          {contractDetail.deliveryStatus !== "SENDING" && (
            <Button variant="contained" color="primary" onClick={handleOpen}>
              Xác nhận bàn giao
            </Button>
          )}
        </div>
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
      {error !== "" && <Alert severity="error">{error}</Alert>}
      {success !== "" && <Alert severity="success">{success}</Alert>}
      <div className="sections_profile">
        <Contact />
      </div>
    </div>
  );
}
