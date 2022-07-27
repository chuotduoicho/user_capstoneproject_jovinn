import { Button, CircularProgress, Container } from "@material-ui/core";
import React, { useState } from "react";
import BuyerHeader from "../../../components/buyer/buyerHeader/BuyerHeader";
import Contact from "../../../components/guest/contact/Contact";
import "react-credit-cards/es/styles-compiled.css";
import "./sellerOrderDetail.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  acceptOrder,
  fetchContracts,
  rejectOrder,
  selectContractSellerById,
  selectContractStatus,
} from "../../../redux/contractSlice";
import { useNavigate, useParams } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";
import SellerHeader from "../../../components/seller/sellerHeader/SellerHeader";

export default function SellerOrderDetail() {
  const { orderId } = useParams();
  const contractDetail = useSelector((state) =>
    selectContractSellerById(state, orderId)
  );
  const status = useSelector(selectContractStatus);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleAcceptOrder = (e) => {
    e.preventDefault();
    dispatch(acceptOrder(orderId))
      .unwrap()
      .then(() => {
        dispatch(fetchContracts());
        setSuccess("Duyệt đơn thành công!");
        navigate("/sellerHome/manageContract");
      })
      .catch(() => {
        setError("Duyệt đơn thất bại!");
      });
  };
  const handleRejectOrder = (e) => {
    e.preventDefault();
    dispatch(rejectOrder(orderId))
      .unwrap()
      .then(() => {
        dispatch(fetchContracts());
        navigate("/sellerHome/manageOrder");
        setSuccess("Từ chối đơn thành công!");
      })
      .catch(() => {
        setError("Từ chối đơn thất bại!");
      });
  };

  return (
    <div className="buyer_profile">
      <SellerHeader />
      <h1 className="buyer_profile_title">Chi tiết đơn hàng</h1>
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
          <Button
            variant="contained"
            color="primary"
            onClick={handleAcceptOrder}
          >
            Duyệt đơn
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleRejectOrder}
          >
            Từ chối
          </Button>
        </div>{" "}
        {status == "loading" && (
          <CircularProgress style={{ margin: "0 auto" }} />
        )}
      </Container>

      {error !== "" && <Alert severity="error">{error}</Alert>}
      {success !== "" && <Alert severity="success">{success}</Alert>}
      <div className="sections_profile">
        <Contact />
      </div>
    </div>
  );
}
