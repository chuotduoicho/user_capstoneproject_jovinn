import {
  Button,
  CircularProgress,
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
import { useDispatch, useSelector } from "react-redux";
import { selectContractSellerById } from "../../../redux/userSlice";
import { useNavigate, useParams } from "react-router-dom";
import Rating from "@material-ui/lab/Rating";
import { StarBorder } from "@material-ui/icons";
import {
  selectContractBuyerById,
  selectContractStatus,
  uploadDeleveryContract,
} from "../../../redux/contractSlice";
import SellerHeader from "../../../components/seller/sellerHeader/SellerHeader";

export default function SellerContractDetail() {
  const { contractId } = useParams();
  const contractDetail = useSelector((state) =>
    selectContractBuyerById(state, contractId)
  );
  const status = useSelector(selectContractStatus);
  console.log("contractDetail", contractDetail);
  const [open, setOpen] = useState(false);
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState("sm");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const handleRating = () => {};
  const dispatch = useDispatch();

  const handleOpen = () => {
    dispatch(uploadDeleveryContract(contractId))
      .unwrap()
      .then(() => {
        setSuccess("Tải lên bàn giao thành công!");
        setOpen(true);
      })
      .catch(() => {
        setError("Tải lên bàn giao thất bại!");
      });
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className="buyer_profile">
      <SellerHeader />
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
          <Button variant="contained" color="primary" onClick={handleOpen}>
            Tải lên bàn giao
          </Button>
        </div>
        {status == "loading" && (
          <CircularProgress style={{ margin: "0 auto" }} />
        )}
      </Container>
      <div className="sections_profile">
        <Contact />
      </div>
    </div>
  );
}
