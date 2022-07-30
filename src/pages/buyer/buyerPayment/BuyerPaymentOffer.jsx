import {
  Button,
  CircularProgress,
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
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addContract,
  selectContractStatus,
} from "../../../redux/contractSlice";
import { fetchCurrentUser } from "../../../redux/userSlice";
import { applyOffer } from "../../../redux/requestSlice";

export default function BuyerPaymentOffer() {
  const { state } = useLocation();
  const { offerDetail } = state || {};
  console.log("offerDetail", offerDetail);
  //dialog
  const [openPayment, setOpenPayment] = useState(false);
  const [error, setError] = useState("");
  const [successfull, setSuccessfull] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const status = useSelector(selectContractStatus);
  const handlePayment = () => {
    const id = offerDetail.id;
    dispatch(applyOffer(id))
      .unwrap()
      .then(() => {
        navigate("/buyerHome/manageContract");
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
          <h4>Mô tả yêu cầu : {offerDetail.descriptionBio} </h4>
        </div>
        <div className="paymentRow">
          <h4>Thời gian bàn giao: {offerDetail.totalDeliveryTime}</h4>
        </div>
        <div className="paymentRow">
          <h4>Giá : {offerDetail.offerPrice}$</h4>
        </div>{" "}
        <div className="paymentRow">
          {" "}
          <h4>Trạng thái: {offerDetail.offerRequestStatus}</h4>
        </div>
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
          {status == "loading" && (
            <CircularProgress style={{ margin: "0 auto" }} />
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
