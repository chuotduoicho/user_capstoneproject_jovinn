import {
  Button,
  Chip,
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
import Comment from "../../../components/buyer/buyerComment/Comment";

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
        <div className="paymentRow_Title">
          <h2>Mã hợp đồng : {contractDetail.contractCode} </h2>
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
          {contractDetail.deliveryStatus !== "SENDING" && (
            <Button variant="contained" color="primary" onClick={handleOpen}>
              Xác nhận bàn giao
            </Button>
          )}
        </div>
        <div className="paymentRow">
          <Comment comments={contractDetail.comments} contractId={contractId} />
        </div>{" "}
        {/* <div className="paymentRow">
          <h2>Bình luận: {contractDetail.comments}</h2>
        </div>{" "} */}
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
