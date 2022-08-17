import {
  Button,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import React, { useState } from "react";
import BuyerHeader from "../../../components/buyer/buyerHeader/BuyerHeader";
import Contact from "../../../components/guest/contact/Contact";
import "./buyerContractDetail.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  acceptDeleveryContract,
  addComment,
  addExtraOffer,
  addRating,
  cancleExtra,
  deleveryMilestone,
  deleveryMilestoneAccept,
  fetchContractDetail,
  flagContract,
  selectContractBuyerById,
  selectContractDetail,
  selectContractDetailStatus,
} from "../../../redux/contractSlice";
import { useNavigate, useParams } from "react-router-dom";
import Rating from "@material-ui/lab/Rating";
import { Flag, FlagOutlined, StarBorder } from "@material-ui/icons";
import Alert from "@material-ui/lab/Alert";
import Comment from "../../../components/buyer/buyerComment/Comment";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function BuyerContractDetail() {
  const { contractId } = useParams();
  const contractDetail = useSelector(selectContractDetail);
  const contractDetailStatus = useSelector(selectContractDetailStatus);
  const [open, setOpen] = useState(false);
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState("sm");
  const [text, setText] = useState("");
  const [descriptionDelevery, setDescriptionDelevery] = useState("");
  const [milstoneId, setMilestoneId] = useState("");
  const [ratingPoint, setRatingPoint] = useState(0);
  const [listComment, setListComment] = useState([]);
  const [listStage, setListStage] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchContractDetail(contractId));
  }, []);
  useEffect(() => {
    if (contractDetailStatus == "success") {
      setListComment(contractDetail.comments);
      if (contractDetail.postRequest)
        setListStage(contractDetail.postRequest.milestoneContracts);
    }
  }, [contractDetailStatus]);

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

  const handleFlag = () => {
    dispatch(flagContract(contractId))
      .unwrap()
      .then(() => {
        toast.success("Gắn cờ thành công!");
        // setOpenDelevery(false);
      })
      .catch(() => {
        toast.error("Gắn cờ thất bại!");
        // setOpenDelevery(false);
      });
  };
  const handleOpen = () => {
    dispatch(acceptDeleveryContract(contractId))
      .unwrap()
      .then(() => {
        toast.success("Xác nhận bàn giao thành công!");
        setOpen(true);
      })
      .catch(() => {
        toast.error("Xác nhận bàn giao thất bại");
      });
  };
  const handleClose = () => {
    setOpen(false);
  };
  //extraoffer
  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [extraPrice, setExtraPrice] = useState("");
  const [additionTime, setAdditionTime] = useState("");
  const [openExtra, setOpenExtra] = useState(false);
  const [check, setCheck] = useState(false);
  const handleClickOpenExtra = () => {
    setOpenExtra(true);
  };

  const handleExtra = () => {
    setCheck(true);
    const offer = { title, shortDescription, extraPrice, additionTime };
    if (
      !/^[a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_\s]{5,30}$/.test(
        title
      ) ||
      !/^[a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_\s]{30,255}$/.test(
        shortDescription
      ) ||
      additionTime < 1 ||
      extraPrice < 1 ||
      extraPrice.length > 10 ||
      extraPrice == ""
    ) {
    } else {
      dispatch(addExtraOffer({ contractId, offer }))
        .unwrap()
        .then(() => {
          toast.success("Thêm đề nghị thành công!");
          dispatch(fetchContractDetail(contractId));
          setOpenExtra(false);
        })
        .catch(() => {
          toast.error("Thêm đề nghị thất bại!");
          setOpenExtra(false);
        });
    }
  };
  const handleCloseExtra = () => {
    setOpenExtra(false);
  };
  const handleCancleOffer = (value) => {
    const extraOfferId = value;
    dispatch(cancleExtra({ contractId, extraOfferId }))
      .unwrap()
      .then(() => {
        dispatch(fetchContractDetail(contractId));
        toast.success("Hủy bỏ đề nghị thành công!");
      })
      .catch(() => {
        toast.error("Hủy bỏ đề nghị thất bại!");
      });
  };
  //delevery
  const handleAcceptDeleveryMilestone = (value) => {
    const milestoneId = value;
    dispatch(deleveryMilestoneAccept({ contractId, milestoneId }))
      .unwrap()
      .then(() => {
        toast.success("Xác nhận bàn giao thành công!");
        dispatch(fetchContractDetail(contractId));
      })
      .catch(() => {
        toast.error("Xác nhận bàn thất bại!");
      });
  };
  return (
    <div className="buyer_profile">
      <BuyerHeader />
      <h1 className="buyer_profile_title">Chi tiết hợp đồng</h1>
      <Container maxWidth="lg" className="profession_form">
        <div className="paymentRow_Title">
          <h2>Mã hợp đồng : {contractDetail.contractCode} </h2>
          {!contractDetail.flag ? (
            <FlagOutlined onClick={handleFlag} style={{ cursor: "pointer" }} />
          ) : (
            <Flag onClick={handleFlag} style={{ cursor: "pointer" }} />
          )}
          <Chip
            label={contractDetail.contractStatus}
            className="chip_pending"
          />
        </div>
        <div className="paymentRow_Content">
          <h3>Yêu cầu:</h3>
          <p>{contractDetail.requirement}</p>
        </div>
        <div className="paymentRow_Content">
          <h3>Trạng thái bàn giao:</h3>
          <p>{contractDetail.deliveryStatus}</p>
        </div>
        <div className="paymentRow_Content">
          <h3>Tổng thời gian bàn giao:</h3>
          <p>{contractDetail.totalDeliveryTime} ngày</p>
        </div>
        <div className="paymentRow_ContentLast">
          <h3>Ngày hoàn thành dự kiến:</h3>
          <p>{contractDetail.expectCompleteDate}</p>
        </div>
        {contractDetail.postRequest && (
          <div className="paymentRow_ContentLast">
            <h3>Giai đoạn bàn giao:</h3>
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 850 }}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Số thứ tự</TableCell>
                    <TableCell align="right">Mô tả</TableCell>
                    <TableCell align="right">Chi phí</TableCell>
                    <TableCell align="right">Trạng thái</TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {listStage.map((item, index) => {
                    return (
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          Giai đoạn {index + 1}
                        </TableCell>
                        <TableCell align="right"> {item.description}</TableCell>
                        <TableCell align="right">{item.milestoneFee}</TableCell>
                        <TableCell align="right">{item.status}</TableCell>
                        <TableCell align="right">
                          {item.status == "COMPLETE" ? (
                            <Chip label="Đã bàn giao" />
                          ) : (
                            <Button
                              color="primary"
                              variant="outlined"
                              onClick={() => {
                                handleAcceptDeleveryMilestone(item.id);
                              }}
                            >
                              Xác nhận bàn giao
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}
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
        {contractDetail.extraOffers && (
          <div className="paymentRow_ContentLast">
            <h3>Đề nghị:</h3>
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 850 }}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Tiêu đề</TableCell>
                    <TableCell align="right">Mô tả</TableCell>
                    <TableCell align="right">Số ngày</TableCell>
                    <TableCell align="right">Chi phí</TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {contractDetail.extraOffers
                    .filter((val) => val.opened)
                    .map((item, index) => {
                      return (
                        <TableRow
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {item.title}
                          </TableCell>
                          <TableCell align="right">
                            {" "}
                            {item.shortDescription}
                          </TableCell>
                          <TableCell align="right">
                            {item.additionTime}
                          </TableCell>
                          <TableCell align="right">{item.extraPrice}</TableCell>
                          <TableCell align="right">
                            {" "}
                            <Button
                              variant="outlined"
                              color="secondary"
                              onClick={() => handleCancleOffer(item.id)}
                            >
                              Hủy bỏ
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}
        <div className="paymentRow">
          {contractDetail.contractStatus !== "COMPLETE" && (
            <Button variant="contained" color="primary" onClick={handleOpen}>
              Xác nhận bàn giao
            </Button>
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenExtra(true)}
          >
            Thêm đề nghị
          </Button>
        </div>
        {error !== "" && <Alert severity="error">{error}</Alert>}
        {success !== "" && <Alert severity="success">{success}</Alert>}
        <div className="paymentRow">
          <Comment comments={listComment} contractId={contractId} />
        </div>{" "}
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
        <Dialog
          fullWidth={fullWidth}
          maxWidth={maxWidth}
          open={openExtra}
          onClose={handleCloseExtra}
          aria-labelledby="max-width-dialog-title"
        >
          <DialogTitle id="max-width-dialog-title">Tạo đề nghị</DialogTitle>
          <DialogContent>
            <TextField
              id="outlined-basic"
              label="Tiêu đề"
              variant="outlined"
              // multiline
              // rows={2}
              style={{ width: "100%", marginBottom: "10px" }}
              onChange={(e) => setTitle(e.target.value)}
              error={
                !/^[a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_\s]{5,30}$/.test(
                  title
                ) && check
              }
              helperText={
                !/^[a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_\s]{5,30}$/.test(
                  title
                ) &&
                check &&
                "Từ 5 đến 30 kí tự"
              }
            />
            <TextField
              id="outlined-basic"
              label="Mô tả"
              variant="outlined"
              multiline
              rows={6}
              style={{ width: "100%", marginBottom: "10px" }}
              onChange={(e) => setShortDescription(e.target.value)}
              error={
                !/^[a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_\s]{30,255}$/.test(
                  shortDescription
                ) && check
              }
              helperText={
                !/^[a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_\s]{30,255}$/.test(
                  shortDescription
                ) &&
                check &&
                "Từ 30 đến 255 kí tự không được bắt đầu với khoảng trắng"
              }
            />
            <TextField
              style={{
                marginRight: "4%",
                width: "48%",
              }}
              variant="outlined"
              label="Số ngày giao"
              type="number"
              InputProps={{ inputProps: { min: 0 } }}
              onChange={(e) => setAdditionTime(e.target.value)}
              error={additionTime < 1 && check}
              helperText={additionTime < 1 && check && "Tối thiểu là 1 ngày"}
            />
            <TextField
              variant="outlined"
              label="Chi phí ($)"
              type="number"
              style={{
                width: "48%",
              }}
              InputProps={{ inputProps: { min: 0 } }}
              onChange={(e) => setExtraPrice(e.target.value)}
              error={
                (extraPrice < 1 ||
                  extraPrice.length > 10 ||
                  extraPrice == "") &&
                check
              }
              helperText={
                (extraPrice < 1 ||
                  extraPrice.length > 10 ||
                  extraPrice == "") &&
                check &&
                "Tối thiểu là 1$ , tối đa 10 chữ số"
              }
            />
          </DialogContent>
          <DialogActions>
            <Button color="primary" variant="contained" onClick={handleExtra}>
              Tạo
            </Button>
            <Button onClick={handleCloseExtra} color="primary">
              Đóng
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
      <ToastContainer limit={3000} position="bottom-right" />
      <div className="sections_profile">
        <Contact />
      </div>
    </div>
  );
}
