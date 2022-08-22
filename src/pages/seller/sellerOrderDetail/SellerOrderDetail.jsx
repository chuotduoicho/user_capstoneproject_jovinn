import {
  Button,
  Chip,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogTitle,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Contact from "../../../components/guest/contact/Contact";
import "./sellerOrderDetail.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  acceptOrder,
  fetchContractDetail,
  fetchContracts,
  rejectOrder,
  selectContractDetail,
  selectContractStatus,
} from "../../../redux/contractSlice";
import { useNavigate, useParams } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";
import SellerHeader from "../../../components/seller/sellerHeader/SellerHeader";

export default function SellerOrderDetail() {
  const { orderId } = useParams();
  const contractDetail = useSelector(selectContractDetail);
  useEffect(() => {
    dispatch(fetchContractDetail(orderId));
  }, []);
  const { message } = useSelector((state) => state.message);
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
    setOpenDelete(false);
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
  const [openDelete, setOpenDelete] = React.useState(false);
  const handleClickOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };
  return (
    <div className="contract-details">
      <SellerHeader />
      <h1 className="contract-title">Chi tiết đơn hàng</h1>
      <Container maxWidth="lg" className="contract-form">
        <div className="contract-id">
          <h2>Mã đơn hàng : {contractDetail.contractCode} </h2>
          <Chip label={contractDetail.orderStatus} className="chip_pending" />
        </div>
        <div className="contract-content-require">
          <h3>Yêu cầu:</h3>
          <p id="require">{contractDetail.requirement}</p>
        </div>
        <div className="contract-content-time">
          <h3>Tổng thời gian bàn giao:</h3>
          <p>{contractDetail.totalDeliveryTime} ngày</p>
        </div>
        <div className="contract-expect-date">
          <h3>Ngày hoàn thành dự kiến:</h3>
          <p>{contractDetail.expectCompleteDate}</p>
        </div>
        <div className="contract-quantity">
          <h4>Số lượng : </h4>
          <p>{contractDetail.quantity}</p>
        </div>
        <div className="contract-quantity">
          <h4>Tổng chi phí : </h4>
          <p>{contractDetail.totalPrice} $</p>
        </div>
        <div className="contract-cancel-fee">
          <h4>Phí hủy hợp đồng : </h4>
          <p>
            {contractDetail.contractCancelFee}% ( =
            {(
              (contractDetail.totalPrice *
                contractDetail.quantity *
                contractDetail.contractCancelFee) /
              100
            ).toLocaleString()}{" "}
            $ )
          </p>
        </div>
        <div className="contract-button">
          <Button
            variant="contained"
            color="primary"
            style={{ marginRight: "30px" }}
            onClick={handleAcceptOrder}
          >
            Thực hiện
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleClickOpenDelete}
          >
            Từ chối
          </Button>
        </div>{" "}
        {status == "loading" && (
          <CircularProgress style={{ margin: "0 auto" }} />
        )}
      </Container>
      <Dialog
        open={openDelete}
        onClose={handleCloseDelete}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Bạn có muốn từ chối yêu cầu này?"}
        </DialogTitle>
        <DialogActions>
          <Button
            onClick={handleRejectOrder}
            color="secondary"
            variant="outlined"
          >
            Từ chối
          </Button>
          <Button
            onClick={handleCloseDelete}
            color="default"
            variant="outlined"
          >
            Hủy
          </Button>
        </DialogActions>
      </Dialog>
      {message !== "" && <Alert severity="error">{message}</Alert>}
      {error !== "" && <Alert severity="error">{error}</Alert>}
      {success !== "" && <Alert severity="success">{success}</Alert>}
      <div className="sections_profile">
        <Contact />
      </div>
    </div>
  );
}
