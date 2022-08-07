import { Button, Chip, Container } from "@material-ui/core";
import React from "react";
import BuyerHeader from "../../../components/buyer/buyerHeader/BuyerHeader";
import Contact from "../../../components/guest/contact/Contact";
import "./buyerOrderDetail.scss";
import { useSelector } from "react-redux";
import { selectContractBuyerById } from "../../../redux/contractSlice";
import { useNavigate, useParams } from "react-router-dom";

export default function BuyerOrderDetail() {
  const { orderId } = useParams();
  const contractDetail = useSelector((state) =>
    selectContractBuyerById(state, orderId)
  );
  console.log("contractDetail", contractDetail);
  const navigate = useNavigate();
  return (
    <div className="buyer_profile">
      <BuyerHeader />
      <h1 className="buyer_profile_title">Chi tiết đơn hàng</h1>
      <Container maxWidth="lg" className="profession_form">
        <div className="paymentRow_Title">
          <h2>Mã đơn hàng : {contractDetail.contractCode} </h2>
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
          <Button variant="contained" onClick={() => navigate(-1)}>
            Quay lại
          </Button>
        </div>{" "}
      </Container>
      <div className="sections_profile">
        <Contact />
      </div>
    </div>
  );
}
