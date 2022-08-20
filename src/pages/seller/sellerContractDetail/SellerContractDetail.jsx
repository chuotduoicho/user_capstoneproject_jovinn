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
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress,
} from "@material-ui/core";
import React, { useState } from "react";
import BuyerHeader from "../../../components/buyer/buyerHeader/BuyerHeader";
import Contact from "../../../components/guest/contact/Contact";
import "./sellerContractDetail.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  selectContractSellerById,
  selectCurrentUser,
  uploadFile,
} from "../../../redux/userSlice";
import { useNavigate, useParams } from "react-router-dom";
import { CloudUpload, EditRounded, StarBorder } from "@material-ui/icons";
import {
  acceptExtra,
  cancleExtra,
  deleveryMilestone,
  deleveryMilestoneUpdate,
  fetchContractDetail,
  selectContractBuyerById,
  selectContractDetail,
  selectContractDetailStatus,
  selectContractStatus,
  uploadDeleveryContract,
} from "../../../redux/contractSlice";
import SellerHeader from "../../../components/seller/sellerHeader/SellerHeader";
import Alert from "@material-ui/lab/Alert";
import Comment from "../../../components/buyer/buyerComment/Comment";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
function format(date) {
  date = new Date(date);

  var day = ("0" + date.getDate()).slice(-2);
  var month = ("0" + (date.getMonth() + 1)).slice(-2);
  var year = date.getFullYear();

  return day + "-" + month + "-" + year;
}
export default function SellerContractDetail() {
  const { contractId } = useParams();
  const currentUser = useSelector(selectCurrentUser);
  const contractDetail = useSelector(selectContractDetail);
  const contractDetailStatus = useSelector(selectContractDetailStatus);
  const status = useSelector(selectContractStatus);
  const { url } = useSelector((state) => state.url);
  console.log("contractDetail", contractDetail);
  const [open, setOpen] = useState(false);
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState("sm");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [file, setFile] = useState(null);
  const [descriptionDelevery, setDescriptionDelevery] = useState("");
  const [milstoneId, setMilestoneId] = useState("");
  const [listComment, setListComment] = useState([]);
  const [listStage, setListStage] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleRating = () => {};
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
  const handleUploadFile = async (e) => {
    setLoading(true);
    setFile(e.target.files[0]);
    console.log(e.target.files[0].name);
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    formData.append("id", currentUser.id);
    formData.append("type", "DELIVERY");

    dispatch(uploadFile(formData))
      .unwrap()
      .then(() => {
        setLoading(false);
        toast.success("Ảnh 1 tải lên thành công");
      })
      .catch(() => {
        setLoading(false);
      });
  };
  const handleDelevery = () => {
    const delevery = {
      milestoneId: milstoneId,
      file: url,
      description: descriptionDelevery,
    };
    dispatch(deleveryMilestone({ contractId, delevery }))
      .unwrap()
      .then(() => {
        toast.success("Bàn giao thành công!");
        setOpenDelevery(false);
        dispatch(fetchContractDetail(contractId));
      })
      .catch(() => {
        toast.error("Bàn giao thất bại!");
        setOpenDelevery(false);
      });
  };
  const handleDeleveryUpdate = () => {
    const delevery = {
      milestoneId: milstoneId,
      file: url,
      description: descriptionDelevery,
    };
    dispatch(deleveryMilestoneUpdate({ contractId, delevery }))
      .unwrap()
      .then(() => {
        toast.success("Sửa thành công!");
        setOpenDeleveryUpdate(false);
        dispatch(fetchContractDetail(contractId));
      })
      .catch(() => {
        toast.error("Sửa thất bại!");
        setOpenDeleveryUpdate(false);
      });
  };
  const handleDeleveryNotMileStone = () => {
    const delevery = {
      milestoneId: milstoneId,
      file: url,
      description: descriptionDelevery,
    };
    dispatch(uploadDeleveryContract({ contractId, delevery }))
      .unwrap()
      .then(() => {
        toast.success("Bàn giao thành công!");
        setOpenDeleveryNotMileStone(false);
        dispatch(fetchContractDetail(contractId));
      })
      .catch(() => {
        toast.error("Bàn giao thất bại!");
        setOpenDeleveryNotMileStone(false);
      });
  };
  const handleAcceptOffer = (value) => {
    const extraOfferId = value;
    dispatch(acceptExtra({ contractId, extraOfferId }))
      .unwrap()
      .then(() => {
        toast.success("Chấp nhận đề nghị thành công!");
        dispatch(fetchContractDetail(contractId));
      })
      .catch(() => {
        toast.error("Chấp nhận đề nghị thất bại!");
      });
  };

  const [openDelevery, setOpenDelevery] = useState(false);

  const handleCloseDelevery = () => {
    setOpenDelevery(false);
  };
  const [openDeleveryUpdate, setOpenDeleveryUpdate] = useState(false);

  const handleCloseDeleveryUpdate = () => {
    setOpenDeleveryUpdate(false);
  };
  const [openDeleveryNotMileStone, setOpenDeleveryNotMileStone] =
    useState(false);

  const handleCloseDeleveryNotMileStone = () => {
    setOpenDeleveryNotMileStone(false);
  };
  const deliveryNotMilstone = contractDetail.delivery
    ? contractDetail.delivery.find((val) => val.milestoneId == null)
    : null;
  return (
    <div className="buyer_profile">
      <SellerHeader />
      <h1 className="buyer_profile_title">Chi tiết hợp đồng</h1>
      <Container maxWidth="lg" className="profession_form">
        <div className="paymentRow_Title">
          <h2>Mã hợp đồng : {contractDetail.contractCode} </h2>
          <Chip
            label={
              contractDetail.contractStatus == "COMPLETE"
                ? "Đã hoàn thành"
                : "Đang xử lí"
            }
            className="chip_pending"
          />
        </div>
        <div className="paymentRow_Content">
          <h3>Yêu cầu:</h3>
          <p>{contractDetail.requirement}</p>
        </div>
        <div className="paymentRow_Content">
          <h3>Chi tiết bàn giao:</h3>
          {deliveryNotMilstone ? (
            <div>
              <p>{deliveryNotMilstone.description}</p>
              <Button
                variant="contained"
                color="primary"
                onClick={() =>
                  navigate(`//${deliveryNotMilstone.file.slice(8)}`)
                }
              >
                Xem file bàn giao
              </Button>
              <EditRounded
                style={{
                  cursor: "pointer",
                }}
                onClick={(e) => {
                  setOpenDeleveryUpdate(true);
                  setDescriptionDelevery(deliveryNotMilstone.description);
                }}
              />
            </div>
          ) : (
            <p>Đang chờ tải lên bàn giao </p>
          )}
        </div>
        <div className="paymentRow_Content">
          <h3>Tổng thời gian bàn giao:</h3>
          <p>{contractDetail.totalDeliveryTime} ngày</p>
        </div>
        <div className="paymentRow_ContentLast">
          <h3>Ngày hoàn thành dự kiến:</h3>
          <p>{format(contractDetail.expectCompleteDate)}</p>
        </div>
        <div className="paymentRow_payment">
          <h4>Số lượng : </h4>
          <p>{contractDetail.quantity}</p>
        </div>
        <div className="paymentRow_payment">
          <h4>Tổng chi phí : </h4>
          <p>{contractDetail.totalPrice.toLocaleString()} $</p>
        </div>
        <div className="paymentRow_paymentLast">
          <h4>Phí hủy hợp đồng : </h4>
          <p>
            {contractDetail.quantity}% ( =
            {(
              (contractDetail.totalPrice * contractDetail.quantity) /
              100
            ).toLocaleString()}{" "}
            $ )
          </p>
        </div>
        {contractDetail.postRequest && (
          <>
            <div className="paymentRow_Content">
              <h2>Nội dung yêu cầu</h2>
            </div>
            <div className="paymentRow_Content">
              {" "}
              <h3>Tiêu đề:</h3>
              <p>{contractDetail.postRequest.jobTitle} </p>
            </div>
            <div className="paymentRow_Content">
              {" "}
              <h3>Mô tả:</h3>
              <p>{contractDetail.postRequest.shortRequirement} </p>
            </div>
            <div className="paymentRow_Content">
              {" "}
              <h3>File đính kèm:</h3>
              <p>
                {contractDetail.postRequest.attachFile ? (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() =>
                      navigate(`//${deliveryNotMilstone.file.slice(8)}`)
                    }
                  >
                    Xem file
                  </Button>
                ) : (
                  "Không có"
                )}{" "}
              </p>
            </div>
            <div className="paymentRow_Content">
              {" "}
              <h3>Cấp độ người bán yêu cầu:</h3>
              <p>{contractDetail.postRequest.recruitLevel} </p>
            </div>
            <div className="paymentRow_Content">
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
                      <TableCell align="right">Ngày bắt đầu</TableCell>
                      <TableCell align="right">Ngày kết thúc</TableCell>
                      <TableCell align="right">Chi phí</TableCell>
                      <TableCell align="right">Trạng thái</TableCell>
                      <TableCell align="right">File</TableCell>
                      <TableCell align="right">Chi tiết bàn giao</TableCell>
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
                          <TableCell
                            align="right"
                            // style={{ maxWidth: "200px" }}
                          >
                            {" "}
                            {item.description}
                          </TableCell>
                          <TableCell align="right">{item.startDate}</TableCell>
                          <TableCell align="right">{item.endDate}</TableCell>
                          <TableCell align="right">
                            {item.milestoneFee.toLocaleString()}$
                          </TableCell>
                          <TableCell align="right">
                            {" "}
                            {item.status == "COMPLETE" ? (
                              <Chip label="Đã hoàn thành" />
                            ) : (
                              <Button
                                color="primary"
                                variant="outlined"
                                onClick={() => {
                                  setOpenDelevery(true);
                                  setMilestoneId(item.id);
                                }}
                              >
                                Bàn giao
                              </Button>
                            )}
                          </TableCell>
                          <TableCell align="right">
                            {" "}
                            {contractDetail.delivery.find(
                              (val) => val.milestoneId === item.id
                            ) ? (
                              contractDetail.delivery.find(
                                (val) => val.milestoneId === item.id
                              ).file ? (
                                <Button
                                  variant="contained"
                                  color="primary"
                                  onClick={() =>
                                    navigate(
                                      `//${contractDetail.delivery
                                        .find(
                                          (val) => val.milestoneId === item.id
                                        )
                                        .file.slice(8)}`
                                    )
                                  }
                                >
                                  Xem file
                                </Button>
                              ) : (
                                "Không có"
                              )
                            ) : (
                              "đang chờ"
                            )}
                          </TableCell>
                          <TableCell align="right">
                            {contractDetail.delivery.find(
                              (val) => val.milestoneId === item.id
                            ) ? (
                              <>
                                {
                                  contractDetail.delivery.find(
                                    (val) => val.milestoneId === item.id
                                  ).description
                                }{" "}
                              </>
                            ) : (
                              "đang chờ"
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
                <Dialog
                  fullWidth
                  maxWidth="sm"
                  open={openDelevery}
                  onClose={handleCloseDelevery}
                  aria-labelledby="responsive-dialog-title"
                >
                  <DialogTitle id="responsive-dialog-title">
                    {"Nhập mô tả bàn giao"}
                  </DialogTitle>
                  <DialogContent>
                    <input
                      accept="image/*,.doc,.docx,.xlsx,.xls,.csv,.pdf,text/plain"
                      className="request_form_input"
                      id="request-input-file"
                      multiple
                      type="file"
                      onChange={handleUploadFile}
                      hidden
                    />
                    <label
                      htmlFor="request-input-file"
                      // style={{ width: "30%", margin: "10px" }}
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        component="span"
                        style={{
                          width: "100%",
                          marginBottom: "10px",
                          height: "55px",
                        }}
                        startIcon={<CloudUpload />}
                      >
                        {file ? file.name : "FILE ĐÍNH KÈM"}
                      </Button>
                    </label>{" "}
                    {loading && <LinearProgress />}
                    <TextField
                      id="outlined-basic"
                      label="Mô tả bàn giao"
                      variant="outlined"
                      multiline
                      rows={5}
                      style={{ width: "100%" }}
                      error={
                        descriptionDelevery.length < 1 ||
                        descriptionDelevery.length > 255
                      }
                      helperText={
                        (descriptionDelevery.length < 1 ||
                          descriptionDelevery.length > 255) &&
                        "Không được để trống và tối đa 255 kí tự "
                      }
                      onChange={(e) => setDescriptionDelevery(e.target.value)}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={handleDelevery}
                      color="primary"
                      variant="outlined"
                    >
                      Xác nhận
                    </Button>
                    <Button
                      onClick={handleCloseDelevery}
                      color="default"
                      variant="outlined"
                    >
                      Hủy
                    </Button>
                  </DialogActions>
                </Dialog>
                <Dialog
                  fullWidth
                  maxWidth="sm"
                  open={openDeleveryUpdate}
                  onClose={handleCloseDeleveryUpdate}
                  aria-labelledby="responsive-dialog-title"
                >
                  <DialogTitle id="responsive-dialog-title">
                    {"Cập nhật bàn giao"}
                  </DialogTitle>
                  <DialogContent>
                    <input
                      accept="image/*,.doc,.docx,.xlsx,.xls,.csv,.pdf,text/plain"
                      className="request_form_input"
                      id="request-input-file"
                      multiple
                      type="file"
                      onChange={handleUploadFile}
                      hidden
                    />
                    <label
                      htmlFor="request-input-file"
                      // style={{ width: "30%", margin: "10px" }}
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        component="span"
                        style={{
                          width: "100%",
                          marginBottom: "10px",
                          height: "55px",
                        }}
                        startIcon={<CloudUpload />}
                      >
                        {file ? file.name : "FILE ĐÍNH KÈM"}
                      </Button>
                    </label>{" "}
                    {loading && <LinearProgress />}
                    <TextField
                      id="outlined-basic"
                      label="Mô tả bàn giao"
                      variant="outlined"
                      multiline
                      rows={5}
                      value={descriptionDelevery}
                      style={{ width: "100%" }}
                      error={
                        descriptionDelevery.length < 1 ||
                        descriptionDelevery.length > 255
                      }
                      helperText={
                        (descriptionDelevery.length < 1 ||
                          descriptionDelevery.length > 255) &&
                        "Không được để trống và tối đa 255 kí tự "
                      }
                      onChange={(e) => setDescriptionDelevery(e.target.value)}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={handleDeleveryUpdate}
                      color="primary"
                      variant="outlined"
                    >
                      Cập nhật
                    </Button>
                    <Button
                      onClick={handleCloseDeleveryUpdate}
                      color="default"
                      variant="outlined"
                    >
                      Hủy
                    </Button>
                  </DialogActions>
                </Dialog>
              </TableContainer>{" "}
            </div>
          </>
        )}
        {contractDetail.extraOffers && (
          <div className="paymentRow_ContentLast">
            <h3>Đề nghị bổ sung:</h3>
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
                  {contractDetail.extraOffers.map((item, index) => {
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
                        <TableCell align="right">{item.additionTime}</TableCell>
                        <TableCell align="right">
                          {item.extraPrice.toLocaleString()}$
                        </TableCell>
                        <TableCell align="right">
                          {item.opened ? (
                            <Button
                              variant="outlined"
                              color="primary"
                              onClick={() => handleAcceptOffer(item.id)}
                            >
                              Chấp nhận
                            </Button>
                          ) : (
                            <Chip label="Đã xác nhận" />
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
        <div className="paymentRow">
          <Button
            variant="contained"
            onClick={() => navigate(-1)}
            style={{ marginRight: "10px" }}
          >
            Quay lại
          </Button>
          {contractDetail.contractStatus == "COMPLETE" ? (
            <Button
              variant="outlined"
              disabled
              style={{ color: "green", borderColor: "green" }}
            >
              Đã tải lên bàn giao
            </Button>
          ) : (
            <>
              {deliveryNotMilstone ? (
                <Button
                  variant="outlined"
                  disabled
                  style={{ color: "gray", borderColor: "gray" }}
                >
                  Đang chờ xác nhận bàn giao
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setOpenDeleveryNotMileStone(true)}
                >
                  Tải lên bàn giao
                </Button>
              )}
            </>
          )}
        </div>
        <Dialog
          fullWidth
          maxWidth="sm"
          open={openDeleveryNotMileStone}
          onClose={handleCloseDeleveryNotMileStone}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {"Nhập mô tả bàn giao"}
          </DialogTitle>
          <DialogContent>
            <input
              accept="image/*,.doc,.docx,.xlsx,.xls,.csv,.pdf,text/plain"
              className="request_form_input"
              id="request-input-file"
              multiple
              type="file"
              onChange={handleUploadFile}
              hidden
            />
            <label
              htmlFor="request-input-file"
              // style={{ width: "30%", margin: "10px" }}
            >
              <Button
                variant="contained"
                color="primary"
                component="span"
                style={{
                  width: "100%",
                  marginBottom: "10px",
                  height: "55px",
                }}
                startIcon={<CloudUpload />}
              >
                {file ? file.name : "FILE ĐÍNH KÈM"}
              </Button>
            </label>{" "}
            {loading && <LinearProgress />}
            <TextField
              id="outlined-basic"
              label="Mô tả bàn giao"
              variant="outlined"
              multiline
              rows={5}
              style={{ width: "100%" }}
              error={
                descriptionDelevery.length < 1 ||
                descriptionDelevery.length > 255
              }
              helperText={
                (descriptionDelevery.length < 1 ||
                  descriptionDelevery.length > 255) &&
                "Không được để trống và tối đa 255 kí tự "
              }
              onChange={(e) => setDescriptionDelevery(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleDeleveryNotMileStone}
              color="primary"
              variant="outlined"
            >
              Xác nhận
            </Button>
            <Button
              onClick={handleCloseDeleveryNotMileStone}
              color="default"
              variant="outlined"
            >
              Hủy
            </Button>
          </DialogActions>
        </Dialog>
        {status == "loading" && (
          <CircularProgress style={{ margin: "0 auto" }} />
        )}
        {error !== "" && <Alert severity="error">{error}</Alert>}
        {success !== "" && <Alert severity="success">{success}</Alert>}
        <div className="paymentRow">
          <Comment comments={listComment} contractId={contractId} />
        </div>{" "}
      </Container>
      <ToastContainer limit={3000} position="bottom-right" />
      <div className="sections_profile">
        <Contact />
      </div>
    </div>
  );
}
