import { React, useState } from "react";
import Contact from "../../../components/guest/contact/Contact";
import "./serviceDetail.scss";
import AppBar from "@material-ui/core/AppBar";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Button, MobileStepper, Paper, TextField } from "@material-ui/core";
import Topbar from "../../../components/guest/topbar/Topbar";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchServiceDetail,
  selectServiceDetail,
  selectServiceDetailStatus,
} from "../../../redux/serviceSlice";
import { useEffect } from "react";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import { autoPlay } from "react-swipeable-views-utils";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
};
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
const ServiceDetail = () => {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const status = useSelector(selectServiceDetailStatus);
  const dispatch = useDispatch();
  const serviceDetail = useSelector(selectServiceDetail);
  const [listImg, setListImg] = useState([]);
  const [listPack, setListPack] = useState([]);
  useEffect(() => {
    dispatch(fetchServiceDetail(serviceId));
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
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  const [amount, setAmount] = useState(1);
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
  console.log("service", serviceDetail);
  return (
    <div className="service_detail">
      <Topbar />
      <div className="sections">
        <div className="service_detail">
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
                      <p>
                        {serviceDetail.brandName} | {serviceDetail.rankSeller}
                      </p>
                      <p>Tổng số đơn: {serviceDetail.totalOrder}</p>
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
            <h2>Mô tả về dịch vụ</h2>{" "}
            <p className="detail_des">{serviceDetail.description}</p>
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
                {/* <Tab label="Tùy chọn" {...a11yProps(3)} /> */}
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
                    {/* <p>✔️ Sản phẩm bàn giao 2</p> */}
                    <h3>
                      Phí hủy hợp đồng :{item.contractCancelFee}% Tổng chi phí
                    </h3>
                    <h2>Tổng giá :{item.price * amount}$</h2>
                  </TabPanel>
                );
              })}
            </SwipeableViews>
          </div>
        </div>
        <Contact />
      </div>
    </div>
  );
};
export default ServiceDetail;
