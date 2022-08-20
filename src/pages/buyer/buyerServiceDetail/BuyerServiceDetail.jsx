import { React, useState } from "react";
import Contact from "../../../components/guest/contact/Contact";
import "./buyerServiceDetail.scss";
import AppBar from "@material-ui/core/AppBar";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MobileStepper,
  Paper,
  TextField,
} from "@material-ui/core";
import BuyerHeader from "../../../components/buyer/buyerHeader/BuyerHeader";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRating,
  fetchServiceDetail,
  fetchServiceDetailBuyer,
  selectListRating,
  selectServiceDetail,
  selectServiceDetailStatus,
} from "../../../redux/serviceSlice";
import { selectWallet } from "../../../redux/userSlice";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import { autoPlay } from "react-swipeable-views-utils";
import { useEffect } from "react";
import CommentService from "../../../components/guest/commentService/CommentService";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function ChangeFormateDate(oldDate) {
  return oldDate.toString().split("-").reverse().join("/");
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
export default function ServiceDetail() {
  const { serviceId } = useParams();
  const status = useSelector(selectServiceDetailStatus);
  const listRating = useSelector(selectListRating);
  const navigate = useNavigate();
  const [amount, setAmount] = useState(1);
  const [requirement, setRequirement] = useState("");
  const [packageId, setPackageId] = useState("");
  const [pack, setPack] = useState();
  const [check, setCheck] = useState(false);
  // const serviceDetail = useSelector((state) =>
  //   selectServiceById(state, serviceId)
  // );
  const serviceDetail = useSelector(selectServiceDetail);
  const wallet = useSelector(selectWallet);
  console.log("service", serviceDetail);
  console.log("list Ratign", listRating);
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const [listImg, setListImg] = useState([]);
  const [listPack, setListPack] = useState([]);
  const dispatch = useDispatch();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    dispatch(fetchServiceDetailBuyer(serviceId));
    dispatch(fetchRating(serviceId));
  }, []);
  useEffect(() => {
    if (status == "success") {
      if (serviceDetail.gallery.imageGallery1) {
        setListImg((current) => [
          ...current,
          serviceDetail.gallery.imageGallery1,
        ]);
      }
      if (serviceDetail.gallery.imageGallery2) {
        setListImg((current) => [
          ...current,
          serviceDetail.gallery.imageGallery2,
        ]);
      }
      if (serviceDetail.gallery.imageGallery3) {
        setListImg((current) => [
          ...current,
          serviceDetail.gallery.imageGallery3,
        ]);
      }
      setListPack(serviceDetail.packages);
    } else {
      setListImg([]);
    }
  }, [status]);
  const handleChangeIndex = (index) => {
    setValue(index);
  };

  //dialog
  const [open, setOpen] = useState(false);

  const handleOpenPayment = () => {
    const order = {
      packageId,
      requirement,
      quantity: amount,
    };
    console.log("order", order);

    if (requirement.length >= 30 && requirement.length <= 500) {
      navigate("/buyerHome/payment", { state: { order, pack } });
    } else {
      setCheck(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setCheck(false);
  };
  console.log(listImg);
  // img
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = listImg.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <div className="buyer_service_detail">
      <BuyerHeader />
      <div className="service_detail2">
        <div className="detail_left">
          <Box sx={{ maxWidth: 600, flexGrow: 1 }}>
            <Paper
              square
              elevation={0}
              sx={{
                display: "flex",
                alignItems: "center",
                height: 50,
                pl: 2,
                bgcolor: "background.default",
              }}
            >
              <h2>{serviceDetail.title}</h2>
              <Link to={"/seller/" + serviceDetail.sellerId}>
                <div className="seller_header">
                  <img
                    src={
                      serviceDetail.avatar
                        ? serviceDetail.avatar
                        : "https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png"
                    }
                    className="avatar"
                  />
                  <div className="seller_headerRight">
                    {serviceDetail.brandName} | Cấp độ người bán:{" "}
                    {serviceDetail.rankSeller}
                    <p>
                      Điểm đánh giá - {serviceDetail.ratingPoint} | Đã hoàn
                      thành - {serviceDetail.totalFinalContract}
                    </p>
                  </div>
                </div>
              </Link>
            </Paper>
            <AutoPlaySwipeableViews
              axis={theme.direction === "rtl" ? "x-reverse" : "x"}
              index={activeStep}
              onChangeIndex={handleStepChange}
              enableMouseEvents
            >
              {listImg.map((step, index) => (
                <div key={step.label}>
                  {Math.abs(activeStep - index) <= 2 ? (
                    <Box
                      component="img"
                      sx={{
                        height: 255,
                        display: "block",
                        maxWidth: 600,
                        overflow: "hidden",
                        width: "100%",
                      }}
                      src={step}
                      alt="img"
                    />
                  ) : null}
                </div>
              ))}
            </AutoPlaySwipeableViews>
            <MobileStepper
              steps={maxSteps}
              position="static"
              activeStep={activeStep}
              nextButton={
                <Button
                  size="small"
                  onClick={handleNext}
                  disabled={activeStep === maxSteps - 1}
                >
                  Sau
                  {theme.direction === "rtl" ? (
                    <KeyboardArrowLeft />
                  ) : (
                    <KeyboardArrowRight />
                  )}
                </Button>
              }
              backButton={
                <Button
                  size="small"
                  onClick={handleBack}
                  disabled={activeStep === 0}
                >
                  {theme.direction === "rtl" ? (
                    <KeyboardArrowRight />
                  ) : (
                    <KeyboardArrowLeft />
                  )}
                  Trước
                </Button>
              }
            />
          </Box>
          <h2 className="padding-card">Mô tả về hộp dịch vụ</h2>
          <div className="description_box">{serviceDetail.description}</div>
          <div className="seller_info">
            <h2 className="padding-card">Thông tin người bán</h2>
            <div className="seller_header">
              <img
                src={
                  serviceDetail.avatar
                    ? serviceDetail.avatar
                    : "https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png"
                }
                alt="avatar"
                className="avatar_seller"
              />
              <div className="card_seller_info">
                {serviceDetail.lastName} {serviceDetail.firstName} | Cấp độ
                người bán: {serviceDetail.rankSeller}
                <p>
                  Điểm đánh giá - {serviceDetail.ratingPoint} | Tổng số hợp đồng
                  đã hoàn thành - {serviceDetail.totalOrder}
                </p>
                <Link to={"/seller/" + serviceDetail.sellerId}>
                  <button>Xem chi tiết</button>
                </Link>
              </div>
            </div>

            <div className="card_detail_seller_info">
              <div className="info">
                <p>
                  Đến từ - {serviceDetail.city} | Tham gia Jovinn -{" "}
                  {serviceDetail.joinSellingAt}
                </p>
                <p>Hòm thư liên hệ - {serviceDetail.email}</p>
              </div>
              <div className="description_bio">
                <p>{serviceDetail.descriptionBio}</p>
              </div>
            </div>
          </div>
          <div className="rating_box">
            <div className="rating_header">
              <h3>Đánh giá từ người mua</h3>
              <CommentService ratings={listRating} />
            </div>
          </div>
        </div>
        <div className="detail_right">
          <AppBar position="static" color="default">
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
              aria-label="full width tabs example"
            >
              <Tab label="Cơ bản" {...a11yProps(0)} />
              <Tab label="Nâng cao" {...a11yProps(1)} />
              <Tab label="Cao cấp" {...a11yProps(2)} />
            </Tabs>
          </AppBar>
          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={value}
            onChangeIndex={handleChangeIndex}
            style={{ border: "2px groove #d8d0d2" }}
          >
            {listPack.map((item, index) => {
              return (
                <TabPanel value={value} index={index} dir={theme.direction}>
                  <div style={{ display: "flex" }}>
                    <h1>{item.price}$ </h1>
                    <Typography
                      variant="h6"
                      style={{ margin: "10px", marginLeft: "100px" }}
                    >
                      Số lượng:
                    </Typography>

                    <TextField
                      id="outlined-basic"
                      variant="standard"
                      type="number"
                      defaultValue={amount}
                      inputProps={{ min: 1 }}
                      style={{ width: "50px", marginTop: "10px" }}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>
                  <p style={{ marginTop: "15px", marginBottom: "15px" }}>
                    {item.title}
                  </p>
                  <h4>⏲️ {item.deliveryTime} Day Delivery</h4>
                  <p>✔️ {item.shortDescription}</p>

                  <h3>
                    Phí hủy hợp đồng :{item.contractCancelFee}% Tổng chi phí
                  </h3>
                  <h2>Tổng giá :{(item.price * amount).toLocaleString()}$</h2>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{
                      marginTop: "15px",
                      marginBottom: "15px",
                      marginLeft: "180px",
                    }}
                    onClick={(e) => {
                      setPackageId(item.id);
                      setPack(item);
                      if (item.price * amount > wallet.withdraw) {
                        alert("Không đủ tiền mua gói này!");
                      } else {
                        setOpen(true);
                      }
                    }}
                  >
                    Mua
                  </Button>
                </TabPanel>
              );
            })}
            {(listPack.length == 1 || listPack.length == 2) &&
              Array(3 - listPack.length)
                .fill("Không có gói này")
                .map((val, idx) => (
                  <>
                    <h1>{val}</h1>
                  </>
                ))}
            <Dialog
              fullWidth
              maxWidth="sm"
              open={open}
              onClose={handleClose}
              aria-labelledby="max-width-dialog-title"
            >
              <DialogTitle id="max-width-dialog-title">
                Thông tin chi tiết
              </DialogTitle>
              <DialogContent>
                <div className="profession_row">
                  <TextField
                    id="outlined-basic"
                    label="Yêu cầu"
                    variant="outlined"
                    multiline
                    rows={15}
                    style={{ width: "100%" }}
                    onChange={(e) => setRequirement(e.target.value)}
                    error={
                      (requirement.length < 30 || requirement.length > 500) &&
                      check
                    }
                    helperText={
                      (requirement.length < 30 || requirement.length > 500) &&
                      check &&
                      "Mô tả phải từ 30 đến 500 kí tự"
                    }
                  />
                </div>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={handleOpenPayment}
                  color="primary"
                  variant="contained"
                >
                  Tạo đặt hàng
                </Button>
                <Button onClick={handleClose} color="primary">
                  Hủy
                </Button>
              </DialogActions>
            </Dialog>
          </SwipeableViews>
        </div>
      </div>
      <div className="sections">
        <Contact />
      </div>
    </div>
  );
}
