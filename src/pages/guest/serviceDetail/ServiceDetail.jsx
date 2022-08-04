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
import {
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Modal,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@material-ui/core";
import { Divider, Avatar, Grid, Paper } from "@material-ui/core";
import Topbar from "../../../components/guest/topbar/Topbar";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectServiceById } from "../../../redux/serviceSlice";
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

const ServiceDetail = () => {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const serviceDetail = useSelector((state) =>
    selectServiceById(state, serviceId)
  );

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  const [amount, setAmount] = useState(1);
  //modal
  const packages = [...serviceDetail.packages].sort(
    (a, b) => a.price - b.price
  );
  console.log("service", serviceDetail);
  return (
    <div className="service_detail">
      <Topbar />

      <div className="sections">
        <div className="service_detail">
          <div className="detail_left">
            <h2>{serviceDetail.title}</h2>
            <div className="seller_header">
              <img
                src={
                  serviceDetail.avatar
                    ? serviceDetail.avatar
                    : "https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png"
                }
                alt="avatar"
                className="avatar"
              />
              <p>
                {serviceDetail.firstName}&nbsp;
                {serviceDetail.lastName} | {serviceDetail.rankSeller} | Tổng số
                đơn: {serviceDetail.totalOrder}
              </p>
            </div>
            <img
              src={
                serviceDetail.gallery.imageGallery1
                  ? serviceDetail.gallery.imageGallery1
                  : "https://elements-video-cover-images-0.imgix.net/files/127924249/previewimg.jpg?auto=compress&crop=edges&fit=crop&fm=jpeg&h=800&w=1200&s=13978d17ddbcd5bafe3a492797e90465"
              }
              alt=""
            ></img>
            <h2>Mô tả</h2>
            <p>{serviceDetail.description}</p>
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
              {packages.map((item, index) => {
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
                    {/* <Button
                      variant="contained"
                      color="primary"
                      style={{
                        marginTop: "15px",
                        marginBottom: "15px",
                        marginLeft: "180px",
                      }}
                      onClick={(e) => {
                        navigate("/auth/login");
                      }}
                    >
                      Mua
                    </Button> */}
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
