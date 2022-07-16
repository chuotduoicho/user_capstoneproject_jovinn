import { Container } from "@material-ui/core";
import React, { useState } from "react";
import BuyerHeader from "../../../components/buyer/buyerHeader/BuyerHeader";
import Contact from "../../../components/guest/contact/Contact";
import "react-credit-cards/es/styles-compiled.css";
import "./sellerDetail.scss";

export default function SellerDetail() {
  //dialog
  const [openPayment, setOpenPayment] = useState(false);

  const handlePayment = () => {
    setOpenPayment(false);
  };
  const handleOpenPayment = () => {
    setOpenPayment(true);
  };

  const handleClosePayment = () => {
    setOpenPayment(false);
  };

  return (
    <div className="buyer_profile">
      <BuyerHeader />
      <h1 className="buyer_profile_title">Thông tin người bán</h1>
      <Container maxWidth="lg" className="profession_form">
        <div className="paymentRow">
          <img
            src="https://i1-dulich.vnecdn.net/2021/07/16/1-1626437591.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=BWzFqMmUWVFC1OfpPSUqMA"
            className="paymentRow_img"
          />

          <div className="paymentRow_title">
            <h2>Tiêu đề</h2>
            <h4>Gói nâng cao</h4>
          </div>
        </div>
        <div className="paymentRow">
          <h3>Tổng giá : 1000$ - Phí hủy hợp đồng : 10% (100$)</h3>
          <h3></h3>
        </div>
        <div className="paymentRow">
          <h4>Sản phẩm bàn giao:</h4>
          <div>
            <p>✔️ Sản phẩm bàn giao 1</p>
          </div>
        </div>
        <div className="paymentRow">
          <h4>Thanh toán : 1 lần </h4>
        </div>
        <div className="paymentRow">
          <h4>Thời gian bàn giao: 3 ngày</h4>
        </div>
        <div className="paymentRow">
          <h2>Số tiền thanh toán : 1000$</h2>
        </div>{" "}
        <div className="paymentRow"></div>
      </Container>
      <div className="sections_profile">
        <Contact />
      </div>
    </div>
  );
}
