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
import "./sellerContractDetail.scss";
import { useSelector } from "react-redux";
import { selectContractSellerById } from "../../../redux/userSlice";
import { useNavigate, useParams } from "react-router-dom";
import Rating from "@material-ui/lab/Rating";
import { StarBorder } from "@material-ui/icons";

export default function SellerContractDetail() {
  const { contractId } = useParams();
  const contractDetail = useSelector((state) =>
    selectContractSellerById(state, contractId)
  );
  console.log("contractDetail", contractDetail);
  const [open, setOpen] = useState(false);
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState("sm");
  const handleRating = () => {};
  const handleOpen = () => {
    setOpen(true);
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
        <div className="paymentRow">
          <h2>Bình luận: {contractDetail.comments}</h2>
        </div>{" "}
        <div className="paymentRow">
          <Button variant="contained" color="primary" onClick={handleOpen}>
            Tải lên bàn giao
          </Button>
        </div>
        {/* <Dialog
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
                defaultValue={2}
                precision={0.5}
                emptyIcon={<StarBorder fontSize="inherit" />}
              />
              <TextField
                id="outlined-basic"
                label="Đánh giá về dịch vụ"
                variant="outlined"
                multiline
                rows={4}
                style={{ width: "100%" }}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleRating} color="primary" variant="contained">
              Xác nhận
            </Button>
            <Button onClick={handleClose} color="primary">
              Đóng
            </Button>
          </DialogActions>
        </Dialog> */}
      </Container>
      <div className="sections_profile">
        <Contact />
      </div>
    </div>
  );
}
