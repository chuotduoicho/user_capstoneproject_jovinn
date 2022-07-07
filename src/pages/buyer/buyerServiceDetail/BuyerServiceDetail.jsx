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
  FormControl,
  FormControlLabel,
  Modal,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import { Divider, Avatar, Grid, Paper } from "@material-ui/core";
import BuyerHeader from "../../../components/buyer/buyerHeader/BuyerHeader";
import FalseStage from "../../../components/buyer/buyerOptionFalseStage/FalseStage";
import TrueStage from "../../../components/buyer/buyerOptionTrueStage/TrueStage";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectServiceById } from "../../../redux/serviceSlice";
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
export default function ServiceDetail() {
  const { serviceId } = useParams();
  const serviceDetail = useSelector((state) =>
    selectServiceById(state, serviceId)
  );
  console.log("service", serviceDetail);
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const [selected, setSelected] = useState("false");
  const handleChangeSelect = (ev) => {
    setSelected(ev.target.value);
  };
  console.log(selected);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  //modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const packages = [...serviceDetail.packages].sort(
    (a, b) => a.price - b.price
  );
  console.log("anh", serviceDetail.gallery.imageGallery1);
  // console.log("nmame ", serviceDetail.seller.user);
  return (
    <div className="buyer_service_detail">
      <BuyerHeader />
      <div className="service_detail2">
        <div className="detail_left">
          <h2>{serviceDetail.title}</h2>
          <div className="seller_header">
            <img
              src={
                serviceDetail.avatar
                  ? serviceDetail.avatar
                  : "https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png"
              }
              className="avatar"
            />
            <p>
              {serviceDetail.firstName} {serviceDetail.lastName}|{" "}
              {serviceDetail.rankSeller} | Tổng số đơn:{" "}
              {serviceDetail.totalOrder}
            </p>
          </div>
          <img src={serviceDetail.gallery.imageGallery1} alt=""></img>
          <h2>Mô tả</h2>
          <p>{serviceDetail.description}</p>
          <h2>Bình luận && đánh giá</h2>
          <Paper style={{ padding: "40px 20px", marginBottom: "30px" }}>
            <Grid container wrap="nowrap" spacing={2}>
              <Grid item>
                <Avatar
                  alt="Remy Sharp"
                  src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                />
              </Grid>
              <Grid justifyContent="left" item xs zeroMinWidth>
                <h4 style={{ margin: 0, textAlign: "left" }}>
                  Michel Michel | 9⭐
                </h4>
                <p style={{ textAlign: "left" }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aenean luctus ut est sed faucibus. Duis bibendum ac ex
                  vehicula laoreet. Suspendisse congue vulputate lobortis.
                  Pellentesque at interdum tortor. Quisque arcu quam, malesuada
                  vel mauris et, posuere sagittis ipsum. Aliquam ultricies a
                  ligula nec faucibus. In elit metus, efficitur lobortis nisi
                  quis, molestie porttitor metus. Pellentesque et neque risus.
                  Aliquam vulputate, mauris vitae tincidunt interdum, mauris mi
                  vehicula urna, nec feugiat quam lectus vitae ex.{" "}
                </p>
                <p style={{ textAlign: "left", color: "gray" }}>
                  posted 1 minute ago
                </p>
              </Grid>
            </Grid>
            <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
            <Grid container wrap="nowrap" spacing={2}>
              <Grid item>
                <Avatar
                  alt="Remy Sharp"
                  src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                />
              </Grid>
              <Grid justifyContent="left" item xs zeroMinWidth>
                <h4 style={{ margin: 0, textAlign: "left" }}>
                  Michel Michel | 3⭐
                </h4>
                <p style={{ textAlign: "left" }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aenean luctus ut est sed faucibus. Duis bibendum ac ex
                  vehicula laoreet. Suspendisse congue vulputate lobortis.
                  Pellentesque at interdum tortor. Quisque arcu quam, malesuada
                  vel mauris et, posuere sagittis ipsum. Aliquam ultricies a
                  ligula nec faucibus. In elit metus, efficitur lobortis nisi
                  quis, molestie porttitor metus. Pellentesque et neque risus.
                  Aliquam vulputate, mauris vitae tincidunt interdum, mauris mi
                  vehicula urna, nec feugiat quam lectus vitae ex.{" "}
                </p>
                <p style={{ textAlign: "left", color: "gray" }}>
                  posted 1 minute ago
                </p>
              </Grid>
            </Grid>
          </Paper>
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
            <TabPanel value={value} index={0} dir={theme.direction}>
              <h1>{packages[0].price}$</h1>
              <p style={{ marginTop: "15px", marginBottom: "15px" }}>
                {packages[0].shortDescription}
              </p>
              <h4>⏲️ {packages[0].deliveryTime} Day Delivery</h4>
              {/* <p>✔️ Theme Installation</p>
              <p>✔️ 2 Plugins/Extensions</p> */}
              <Button
                variant="contained"
                color="primary"
                style={{
                  marginTop: "15px",
                  marginBottom: "15px",
                  marginLeft: "180px",
                }}
              >
                Mua
              </Button>
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              <h1>{packages[1].price}$</h1>
              <p style={{ marginTop: "15px", marginBottom: "15px" }}>
                {packages[1].shortDescription}
              </p>
              <h4>⏲️ {packages[1].deliveryTime} Day Delivery</h4>
              {/* <p>✔️ Theme Installation</p>
              <p>✔️ 2 Plugins/Extensions</p> */}
              <Button
                variant="contained"
                color="primary"
                style={{
                  marginTop: "15px",
                  marginBottom: "15px",
                  marginLeft: "180px",
                }}
              >
                Mua
              </Button>
            </TabPanel>
            <TabPanel value={value} index={2} dir={theme.direction}>
              <h1>{packages[2].price}$</h1>
              <p style={{ marginTop: "15px", marginBottom: "15px" }}>
                {packages[2].shortDescription}
              </p>
              <h4>⏲️ {packages[2].deliveryTime} Day Delivery</h4>
              {/* <p>✔️ Theme Installation</p>
              <p>✔️ 2 Plugins/Extensions</p> */}
              <Button
                variant="contained"
                color="primary"
                style={{
                  marginTop: "15px",
                  marginBottom: "15px",
                  marginLeft: "180px",
                }}
              >
                Mua
              </Button>
            </TabPanel>
            {/* <TabPanel value={value} index={3} dir={theme.direction}>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="false"
                  name="radio-buttons-group"
                  onChange={handleChangeSelect}
                >
                  <FormControlLabel
                    value="false"
                    control={<Radio />}
                    label="Tùy chọn KHÔNG chia giai đoạn bàn giao"
                  />
                  <FormControlLabel
                    value="true"
                    control={<Radio />}
                    label="Tùy chọn CÓ chia giai đoạn bàn giao"
                  />
                </RadioGroup>
                <Button
                  variant="contained"
                  color="primary"
                  style={{
                    marginTop: "15px",
                    marginBottom: "15px",
                    marginLeft: "180px",
                  }}
                  onClick={handleOpen}
                >
                  Tiếp tục
                </Button>
              </FormControl>
              <Modal
                keepMounted
                open={open}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
              >
                {selected === "false" ? <FalseStage /> : <TrueStage />}
              </Modal>
            </TabPanel> */}
          </SwipeableViews>
        </div>
      </div>
      <div className="sections">
        <Contact />
      </div>
    </div>
  );
}
