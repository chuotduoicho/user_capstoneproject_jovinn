import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import React, { useState } from "react";
import BuyerHeader from "../../../components/buyer/buyerHeader/BuyerHeader";
import Contact from "../../../components/guest/contact/Contact";
import Alert from "@material-ui/lab/Alert";
import Card from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import "./buyerPayment.scss";
import Checkout from "../../../components/payment/Checkout";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addContract } from "../../../redux/contractSlice";
import { fetchCurrentUser } from "../../../redux/userSlice";

export default function BuyerPayment() {
  const { state } = useLocation();
  const { order } = state || {};
  console.log("order", order);
  //dialog
  const [openPayment, setOpenPayment] = useState(false);
  const [error, setError] = useState("");
  const [successfull, setSuccessfull] = useState("");
  const dispatch = useDispatch();
  const handlePayment = () => {
    dispatch(addContract(order))
      .unwrap()
      .then(() => {
        console.log("add order success");
        setSuccessfull("Thanh toán thành công!");
        setError("");
      })
      .catch(() => {
        console.log("add order fail");
        setError("Thanh toán thất bại!");
        setSuccessfull("");
      });
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
      <h1 className="buyer_profile_title">Hóa đơn thanh toán</h1>
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
        <div className="paymentRow" style={{ justifyContent: "center" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenPayment}
          >
            Thanh toán
          </Button>
        </div>
        <div className="paymentRow" style={{ justifyContent: "center" }}>
          {error !== "" && <Alert severity="error">{error}</Alert>}
          {successfull !== "" && (
            <Alert severity="success">{successfull}</Alert>
          )}
        </div>
        <Dialog
          fullWidth="true"
          maxWidth="sm"
          open={openPayment}
          onClose={handleClosePayment}
          aria-labelledby="max-width-dialog-title"
        >
          {" "}
          <DialogTitle id="max-width-dialog-title">
            Xác nhận thanh toán
          </DialogTitle>
          <DialogContent>Tiền sẽ được trừ trong ví của bạn</DialogContent>
          <DialogActions>
            <Button onClick={handlePayment} color="primary">
              Xác nhận
            </Button>
            <Button onClick={handleClosePayment} color="primary">
              Đóng
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
      <div className="sections_profile">
        <Contact />
      </div>
    </div>
  );
}
