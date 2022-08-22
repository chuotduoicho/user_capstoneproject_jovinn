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
import "./buyerPayment.scss";
import Checkout from "../../../components/payment/Checkout";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addContract,
  selectContractStatus,
} from "../../../redux/contractSlice";

export default function BuyerPayment() {
  const { state } = useLocation();
  const { order } = state || {};
  const { pack } = state || {};
  console.log("order", order);
  console.log("pack", pack);
  const { message } = useSelector((state) => state.message);
  //dialog
  const [openPayment, setOpenPayment] = useState(false);
  const [error, setError] = useState("");
  const [successfull, setSuccessfull] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const status = useSelector(selectContractStatus);
  const handlePayment = () => {
    dispatch(addContract(order))
      .unwrap()
      .then(() => {
        navigate("/buyerHome/manageOrder", {
          state: {
            alert: "Thanh toán thành công",
          },
        });
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
        <div className="paymentRow_Title">
          <h2>Mã gói hàng : {order.packageId} </h2>
        </div>
        <div className="paymentRow_Content">
          <h3>Tiêu đề:</h3>
          <p>{pack.title}</p>
        </div>
        <div className="paymentRow_Content">
          <h3>Mô tả gói dịch vụ:</h3>
          <p>{pack.shortDescription}</p>
        </div>
        <div className="paymentRow_Content">
          <h3>Yêu cầu:</h3>
          <p>{order.requirement}</p>
        </div>
        <div className="paymentRow_ContentLast">
          <h3>Thời gian bàn giao:</h3>
          <p>{pack.deliveryTime} ngày</p>
        </div>
        <div className="paymentRow_payment">
          <h4>Giá : </h4>
          <p> {pack.price}$</p>
        </div>
        <div className="paymentRow_payment">
          <h4>Số lượng : </h4>
          <p>{order.quantity}</p>
        </div>
        <div className="paymentRow_payment">
          <h4>Tổng giá:</h4>
          <p>{order.quantity * pack.price} $</p>
        </div>
        <div className="paymentRow_paymentLast">
          <h4>Phí hủy hợp đồng:</h4>
          <p>
            {" "}
            {pack.contractCancelFee}% ( =
            {(pack.contractCancelFee * order.quantity * pack.price) / 100} $ )
          </p>
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
          {message !== "" && <Alert severity="error">{message}</Alert>}
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
