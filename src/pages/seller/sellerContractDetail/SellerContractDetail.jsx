import {
  Button,
  Chip,
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
import {
  selectContractSellerById,
  selectCurrentUser,
  uploadFile,
} from "../../../redux/userSlice";
import { useNavigate, useParams } from "react-router-dom";
import Rating from "@material-ui/lab/Rating";
import { CloudUpload, StarBorder } from "@material-ui/icons";
import {
  selectContractBuyerById,
  selectContractStatus,
  uploadDeleveryContract,
} from "../../../redux/contractSlice";
import SellerHeader from "../../../components/seller/sellerHeader/SellerHeader";
import Alert from "@material-ui/lab/Alert";
import Comment from "../../../components/buyer/buyerComment/Comment";

export default function SellerContractDetail() {
  const { contractId } = useParams();
  const currentUser = useSelector(selectCurrentUser);
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
  const [file, setFile] = useState(null);
  const handleRating = () => {};
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleOpen = (e) => {
    setFile(e.target.files[0]);
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    formData.append("id", currentUser.id);
    formData.append("type", "DELIVERY");
    dispatch(uploadFile(formData))
      .unwrap()
      .then(() => {
        dispatch(uploadDeleveryContract(contractId))
          .unwrap()
          .then(() => {
            setSuccess("Tải lên bàn giao thành công!");
            setOpen(true);
          })
          .catch(() => {
            setError("Tải lên bàn giao thất bại!");
          });
      })
      .catch(() => {});
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className="buyer_profile">
      <SellerHeader />
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
        {/* <div className="paymentRow">
          <h4>
            Phí hủy hợp đồng: {contractDetail.contractCancelFee}% (= 100$)
          </h4>
        </div>
        <div className="paymentRow">
          <h2>Tổng chi phí: {contractDetail.totalPrice}$</h2>
        </div>{" "}
        <div className="paymentRow">
          <h2>Các đề nghị phát sinh: {contractDetail.extraOffers}</h2>
        </div>{" "}
        <div className="paymentRow">
          <h2>Trạng thái bàn giao: {contractDetail.deliveryStatus}</h2>
        </div>{" "} */}
        <div className="paymentRow">
          <Button
            variant="contained"
            onClick={() => navigate(-1)}
            style={{ marginRight: "10px" }}
          >
            Quay lại
          </Button>
          <label htmlFor="file1">
            <Button
              variant="contained"
              color="primary"
              component="span"
              startIcon={<CloudUpload />}
            >
              Tải lên bàn giao
            </Button>
          </label>
          <input
            type="file"
            id="file1"
            onChange={handleOpen}
            style={{ display: "none" }}
          />
          <img
            src={file ? URL.createObjectURL(file) : ""}
            alt=""
            style={{ width: "100px" }}
          />
        </div>
        {status == "loading" && (
          <CircularProgress style={{ margin: "0 auto" }} />
        )}
        {error !== "" && <Alert severity="error">{error}</Alert>}
        {success !== "" && <Alert severity="success">{success}</Alert>}
        <div className="paymentRow">
          <Comment comments={contractDetail.comments} contractId={contractId} />
        </div>{" "}
      </Container>
      <div className="sections_profile">
        <Contact />
      </div>
    </div>
  );
}
