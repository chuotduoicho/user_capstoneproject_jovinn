import { React, useEffect, useState } from "react";
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
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import { Divider, Avatar, Grid, Paper } from "@material-ui/core";
import SellerHeader from "../../../components/seller/sellerHeader/SellerHeader";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchServices,
  selectServiceById,
  updateService,
} from "../../../redux/serviceSlice";
import Overview from "../../../components/seller/sellerCreateService/overview/Overview";
import Package from "../../../components/seller/sellerCreateService/package/Package";
import ProductImg from "../../../components/seller/sellerCreateService/productImg/ProductImg";
import { selectAllCategories } from "../../../redux/categorySlice";
import Alert from "@material-ui/lab/Alert";
import { Add } from "@material-ui/icons";
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
export default function SellerServiceDetail() {
  const { serviceId } = useParams();
  const serviceDetail = useSelector((state) =>
    selectServiceById(state, serviceId)
  );
  console.log("service", serviceDetail);
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const [selected, setSelected] = useState(false);

  console.log(selected);
  const dispatch = useDispatch();
  const handlePauseService = () => {
    const service = {
      title: serviceDetail.title,
      description: serviceDetail.description,
      status: "DEACTIVE",
    };
    const obj = { service, serviceId };
    dispatch(updateService(obj))
      .unwrap()
      .then(() => {
        // console.log("add service successfull");
        dispatch(fetchServices());
      })
      .catch(() => {
        console.log("update service fail");
      });
  };
  const handleOpenService = () => {
    const service = {
      title: serviceDetail.title,
      description: serviceDetail.description,
      status: "ACTIVE",
    };
    const obj = { service, serviceId };
    console.log(obj);
    dispatch(updateService(obj))
      .unwrap()
      .then(() => {
        // console.log("add service successfull");
        dispatch(fetchServices());
      })
      .catch(() => {
        console.log("update service fail");
      });
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  const navigate = useNavigate();
  const packages = [...serviceDetail.packages].sort(
    (a, b) => a.price - b.price
  );
  //dialog update overview
  const [openUpdateOverView, setOpenUpdateOverView] = useState(false);
  const handleCloseUpdateOverView = () => {
    setOpenUpdateOverView(false);
  };
  //update overview
  const [title, setTitle] = useState(serviceId ? serviceDetail.title : "");
  const [description, setDescription] = useState(
    serviceId ? serviceDetail.description : ""
  );
  const [subCateId, setSubCateId] = useState(
    serviceId ? serviceDetail.subcategory.id : ""
  );
  const listCategory = useSelector(selectAllCategories);
  const [category, setCategory] = useState(listCategory[0]);
  const [errorTitle, setErrorTitle] = useState("");
  const [errorDescription, setErrorDescription] = useState("");
  const [errorSubcate, setErrorSubcate] = useState("");
  const handleChangeCategory = (e) => {
    setCategory(e.target.value);
    setSubCateId("");
  };
  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleChangeDes = (e) => {
    setDescription(e.target.value);
  };
  const handleChangeSubcateId = (e) => {
    setSubCateId(e.target.value);
  };
  useEffect(() => {
    if (title.length > 0 && errorTitle) {
      setErrorTitle("");
    }
  }, [title, errorTitle]);
  useEffect(() => {
    if (description.length > 0 && errorDescription) {
      setErrorDescription("");
    }
  }, [description, errorDescription]);
  useEffect(() => {
    if (subCateId.length > 0 && errorSubcate) {
      setErrorSubcate("");
    }
  }, [subCateId, errorSubcate]);
  useEffect(() => {
    if (title.length == 0) {
      setErrorTitle("Không được để trống");
    }
  }, [title]);
  useEffect(() => {
    if (description.length == 0) {
      setErrorDescription("Không được để trống");
    }
  }, [description]);
  useEffect(() => {
    if (subCateId.length == 0) {
      setErrorSubcate("Không được để trống");
    }
  }, [subCateId]);
  const [alert, setAlert] = useState("");
  const [alertError, setAlertError] = useState("");
  const handleUpdateOverView = (e) => {
    e.preventDefault();
    const newService = {
      title: title,
      description: description,
      subCategory: {
        id: subCateId,
      },
    };
    const obj = { service: newService, serviceId };
    if (!(errorTitle != "" || (errorDescription != "" && subCateId != "")))
      dispatch(updateService(obj))
        .unwrap()
        .then(() => {
          setAlert("Cập nhật thành công"); // Update count to be 5 after timeout is scheduled
          dispatch(fetchServices());
          setOpenUpdateOverView(false);
          setTimeout(() => {
            setAlert(""); // count is 0 here
          }, 3000);
          setAlert("Cập nhật thành công");
        })
        .catch(() => {
          setTimeout(() => {
            setAlertError(""); // count is 0 here
          }, 3000);
          setAlertError("Cập nhật thất bại");
          setOpenUpdateOverView(false);
        });
  };
  return (
    <div className="service_detail">
      <SellerHeader />
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
              alt=""
              className="avatar"
            />
            <p>
              {serviceDetail.firstName} {serviceDetail.lastName} |{" "}
              {serviceDetail.rankSeller} | Tổng số đơn:{" "}
              {serviceDetail.totalOrder}
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
          <ButtonGroup
            variant="contained"
            aria-label="outlined primary button group"
            style={{ float: "right", marginBottom: "20px" }}
          >
            <Button onClick={() => setOpenUpdateOverView(true)}>Sửa</Button>
            {serviceDetail.status === "ACTIVE" ? (
              <Button
                onClick={handlePauseService}
                style={{ backgroundColor: "yellow" }}
              >
                Tạm dừng
              </Button>
            ) : (
              <Button
                onClick={handleOpenService}
                style={{ backgroundColor: "yellowgreen" }}
              >
                Mở
              </Button>
            )}
          </ButtonGroup>
          {alert && <Alert severity="success">{alert}</Alert>}
          {alertError && <Alert severity="error">{alertError}</Alert>}
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
            style={{ border: "2px groove #d8d0d2", width: "595px" }}
          >
            {packages.map((item, index) => {
              return (
                <TabPanel value={value} index={index} dir={theme.direction}>
                  <div style={{ display: "flex" }}>
                    <h1>{item.price}$ </h1>
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
                </TabPanel>
              );
            })}
            {(packages.length == 1 || packages.length == 2) &&
              Array(3 - packages.length)
                .fill("Không có gói này")
                .map((val, idx) => (
                  <>
                    <h1>{val}</h1>
                    <Button variant="outlined" color="primary">
                      <Add />
                      {packages.length == 1 && " Tạo gói nâng cao"}
                      {packages.length == 2 && " Tạo gói cao cấp"}
                    </Button>
                  </>
                ))}
            <Dialog
              fullWidth
              maxWidth="sm"
              open={openUpdateOverView}
              onClose={handleCloseUpdateOverView}
              aria-labelledby="max-width-dialog-title"
            >
              <DialogTitle id="max-width-dialog-title">
                Cập nhật dịch vụ
              </DialogTitle>
              <DialogContent>
                <Overview
                  title={handleChangeTitle}
                  description={handleChangeDes}
                  subCateId={handleChangeSubcateId}
                  titleDf={title}
                  descriptionDf={description}
                  subCateIdDf={subCateId}
                  listCategory={listCategory}
                  category={category}
                  setCategory={handleChangeCategory}
                  errorTitle={errorTitle}
                  errorDescription={errorDescription}
                  errorSubcate={errorSubcate}
                />
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={handleUpdateOverView}
                  color="primary"
                  variant="contained"
                >
                  Cập nhật
                </Button>
                <Button onClick={handleCloseUpdateOverView} color="primary">
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
