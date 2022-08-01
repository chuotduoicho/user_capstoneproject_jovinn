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
import Alert from "@material-ui/lab/Alert";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import { Divider, Avatar, Grid, Paper } from "@material-ui/core";
import BuyerHeader from "../../../components/buyer/buyerHeader/BuyerHeader";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectServiceById } from "../../../redux/serviceSlice";
import { addContract } from "../../../redux/contractSlice";
import { fetchCurrentUser, selectWallet } from "../../../redux/userSlice";
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
  const navigate = useNavigate();
  const [amount, setAmount] = useState(1);
  const [requirement, setRequirement] = useState("");
  const [packageId, setPackageId] = useState("");
  const [pack, setPack] = useState();
  const [error, setError] = useState("");
  const serviceDetail = useSelector((state) =>
    selectServiceById(state, serviceId)
  );
  const wallet = useSelector(selectWallet);
  console.log("service", serviceDetail);
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const dispatch = useDispatch();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
      setError("Mô tả yêu cầu phải từ 30 đến 500 kí tự");
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

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
              <p>
                {serviceDetail.firstName} {serviceDetail.lastName}|{" "}
                {serviceDetail.rankSeller} | Tổng số đơn:{" "}
                {serviceDetail.totalOrder}
              </p>
            </div>
          </Link>
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
              {error !== "" && <Alert severity="error">{error}</Alert>}
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
