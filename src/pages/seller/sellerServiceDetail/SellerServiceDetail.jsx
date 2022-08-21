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
  MobileStepper,
  Paper,
} from "@material-ui/core";
import SellerHeader from "../../../components/seller/sellerHeader/SellerHeader";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addServicePackage,
  deleteService,
  deleteServicePackage,
  fetchServiceDetail,
  fetchServiceDetailBuyer,
  fetchServices,
  pauseService,
  selectServiceDetail,
  selectServiceDetailStatus,
  updateService,
  updateServicePackage,
  fetchRating,
  selectListRating,
} from "../../../redux/serviceSlice";
import Overview from "../../../components/seller/sellerCreateService/overview/Overview";
import { selectAllCategories } from "../../../redux/categorySlice";
import Alert from "@material-ui/lab/Alert";
import { Add, Delete, Edit } from "@material-ui/icons";
import PackageEdit from "../../../components/seller/sellerCreateService/package/PackageEdit";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import { autoPlay } from "react-swipeable-views-utils";
import { toast, ToastContainer } from "react-toastify";
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
export default function SellerServiceDetail() {
  const { serviceId } = useParams();
  const status = useSelector(selectServiceDetailStatus);
  const serviceDetail = useSelector(selectServiceDetail);
  const [listImg, setListImg] = useState([]);
  const [listPack, setListPack] = useState([]);
  const listRating = useSelector(selectListRating);
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [check, setCheck] = useState(false);
  const [selected, setSelected] = useState(false);
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
      setTitle(serviceDetail.title);
      setDescription(serviceDetail.description);
      setCateId(serviceDetail.categoryId);
      setSubCateId(serviceDetail.subCategoryId);
      setCategory(
        listCategory.find((cate) => cate.id === serviceDetail.categoryId)
      );
    } else {
      setListImg([]);
    }
  }, [status]);
  console.log(selected);
  const dispatch = useDispatch();
  const handlePauseService = () => {
    dispatch(pauseService(serviceId))
      .unwrap()
      .then(() => {
        dispatch(fetchServiceDetail(serviceId));
        toast.success("Dịch vụ đã được tạm dừng!");
      })
      .catch(() => {
        toast.error("Tạm dừng thất bại!");
      });
  };
  const handleOpenService = () => {
    dispatch(pauseService(serviceId))
      .unwrap()
      .then(() => {
        dispatch(fetchServiceDetail(serviceId));
        toast.success("Dịch vụ đã được mở!");
      })
      .catch(() => {
        toast.success("Mở dịch vụ thất bại");
      });
  };
  const handleDeleteService = () => {
    setOpenDeleteService(false);
    dispatch(deleteService(serviceId))
      .unwrap()
      .then(() => {
        toast.success("Dịch vụ đã được xóa!");
      })
      .catch(() => {
        toast.error("Xóa dịch vụ thất bại");
      });
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  const navigate = useNavigate();

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
    serviceId ? serviceDetail.subCategoryId : ""
  );
  const [cateId, setCateId] = useState(
    serviceId ? serviceDetail.categoryId : ""
  );
  const listCategory = useSelector(selectAllCategories);
  const [category, setCategory] = useState(
    cateId ? listCategory.find((cate) => cate.id === cateId) : listCategory[0]
  );
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
    if (title && errorTitle) {
      setErrorTitle("");
    }
  }, [title, errorTitle]);
  useEffect(() => {
    if (description && errorDescription) {
      setErrorDescription("");
    }
  }, [description, errorDescription]);
  useEffect(() => {
    if (subCateId && errorSubcate) {
      setErrorSubcate("");
    }
  }, [subCateId, errorSubcate]);
  useEffect(() => {
    if (!title) {
      setErrorTitle("Không được để trống");
    }
  }, [title]);
  useEffect(() => {
    if (!description) {
      setErrorDescription("Không được để trống");
    }
  }, [description]);
  useEffect(() => {
    if (!subCateId) {
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
      subCategoryId: subCateId,
    };
    const obj = { service: newService, serviceId };
    if (!(errorTitle != "" || (errorDescription != "" && subCateId != "")))
      dispatch(updateService(obj))
        .unwrap()
        .then(() => {
          dispatch(fetchServiceDetail(serviceId));
          setOpenUpdateOverView(false);
          toast.success("Cập nhật thành công");
        })
        .catch(() => {
          toast.error("Cập nhật thất bại");
          setOpenUpdateOverView(false);
        });
  };

  //add Package
  //dialog add Package
  const [openPack, setOpenPack] = useState(false);
  const handleClosePack = () => {
    setPackId("");
    setTitlePackage("");
    setShortDescription("");
    setDeliveryTime("");
    setPrice("");
    setContractCancelFee("");
    setOpenPack(false);
  };
  const [packId, setPackId] = useState("");
  const [titlePackage, setTitlePackage] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  const [price, setPrice] = useState("");
  const [contractCancelFee, setContractCancelFee] = useState("");
  const [titlePackageE, setTitlePackageE] = useState("");
  const [shortDescriptionE, setShortDescriptionE] = useState("");
  const [deliveryTimeE, setDeliveryTimeE] = useState();
  const [priceE, setPriceE] = useState();
  const [contractCancelFeeE, setContractCancelFeeE] = useState();
  const handleChangeTitlePackage = (e) => {
    setTitlePackage(e.target.value);
  };
  const handleChangeShortDescription = (e) => {
    setShortDescription(e.target.value);
  };
  const handleChangeDeliveryTime = (e) => {
    setDeliveryTime(e.target.value);
  };
  const handleChangePrice = (e) => {
    setPrice(e.target.value);
  };
  const handleChangeContractCancelFee = (e) => {
    setContractCancelFee(e.target.value);
  };
  useEffect(() => {
    if (titlePackage.length > 0 && titlePackageE) {
      setTitlePackageE("");
    }
  }, [titlePackage, titlePackageE]);
  useEffect(() => {
    if (shortDescription.length > 30 && shortDescriptionE) {
      setShortDescriptionE("");
    }
  }, [shortDescription, shortDescriptionE]);
  useEffect(() => {
    if (deliveryTime && deliveryTimeE) {
      setDeliveryTimeE("");
    }
  }, [deliveryTime, deliveryTimeE]);
  useEffect(() => {
    if (price && priceE) {
      setPriceE("");
    }
  }, [price, priceE]);
  useEffect(() => {
    if (contractCancelFee && contractCancelFeeE) {
      setContractCancelFeeE("");
    }
  }, [contractCancelFee, contractCancelFeeE]);
  useEffect(() => {
    if (titlePackage.length == 0) {
      setTitlePackageE("Không được để trống");
    }
  }, [titlePackage]);
  useEffect(() => {
    if (shortDescription.length == 0) {
      setShortDescriptionE("Không được để trống");
    } else if (shortDescription.length < 30) {
      setShortDescriptionE("Mô tả phải lớn hơn 30 kí tự");
    }
  }, [shortDescription]);
  useEffect(() => {
    if (!deliveryTime) {
      setDeliveryTimeE("Không được để trống");
    }
  }, [deliveryTime]);
  useEffect(() => {
    if (!price) {
      setPriceE("Không được để trống");
    }
  }, [price]);
  useEffect(() => {
    if (!contractCancelFee) {
      setContractCancelFeeE("Không được để trống");
    }
  }, [contractCancelFee]);

  const handleAddPackage = () => {
    const pack = {
      title: titlePackage,
      shortDescription,
      deliveryTime,
      price,
      contractCancelFee,
    };
    if (
      titlePackageE.length == 0 &&
      shortDescriptionE.length == 0 &&
      deliveryTimeE.length == 0 &&
      priceE.length == 0 &&
      contractCancelFeeE.length == 0
    )
      dispatch(addServicePackage({ serviceId, pack }))
        .unwrap()
        .then(() => {
          toast.success("Tạo gói dịch vụ thành công");
          dispatch(fetchServiceDetail(serviceId));
          setOpenPack(false);
        })
        .catch(() => {
          toast.error("Tạo gói dịch vụ thất bại");
          setOpenPack(false);
        });
  };
  const handleUpdaytePackage = () => {
    const pack = {
      title: titlePackage,
      shortDescription,
      deliveryTime,
      price,
      contractCancelFee,
    };
    if (
      titlePackageE.length == 0 &&
      shortDescriptionE.length == 0 &&
      deliveryTimeE.length == 0 &&
      priceE.length == 0 &&
      contractCancelFeeE.length == 0
    )
      dispatch(updateServicePackage({ packId, pack }))
        .unwrap()
        .then(() => {
          toast.success("Cập nhật gói thành công");
          dispatch(fetchServiceDetail(serviceId));
          setTimeout(() => {
            setAlert(""); // count is 0 here
          }, 3000);
          setOpenPack(false);
        })
        .catch(() => {
          toast.error("Cập nhật gói thất bại");
          setOpenPack(false);
        });
  };
  //delete Package
  const [openDelete, setOpenDelete] = useState(false);
  const handleClickOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };
  const handleDeletePackage = (id) => {
    setOpenDelete(false);
    dispatch(deleteServicePackage(id))
      .unwrap()
      .then(() => {
        toast.success("Xóa gói thành công!");
        dispatch(fetchServiceDetail(serviceId));
      })
      .catch(() => {
        toast.error("Xóa gói thất bại");
      });
  };
  //delete service
  const [openDeleteService, setOpenDeleteService] = useState(false);
  const handleClickOpenDeleteService = () => {
    setOpenDeleteService(true);
  };

  const handleCloseDeleteService = () => {
    setOpenDeleteService(false);
  };

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
  const packages = [...listPack].sort((a, b) => a.price - b.price);
  return (
    <div className="service_detail">
      <SellerHeader />
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
          {/* <div className="seller_info">
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
                    Điểm đánh giá - {serviceDetail.ratingPoint} | Tổng số hợp
                    đồng đã hoàn thành - {serviceDetail.totalOrder}
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
                    {format(serviceDetail.joinSellingAt)}
                  </p>
                  <p>Hòm thư liên hệ - {serviceDetail.email}</p>
                </div>
                <div className="description_bio">
                  <p>{serviceDetail.descriptionBio}</p>
                </div>
              </div>
            </div> */}
          <div className="rating_box">
            <div className="rating_header">
              <h3>Đánh giá từ người mua</h3>
              <CommentService ratings={listRating} />
            </div>
          </div>
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
            <Button
              onClick={handleClickOpenDeleteService}
              style={{ backgroundColor: "red" }}
            >
              Xóa
            </Button>
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
                    <h1>{item.price.toLocaleString()}$ </h1>
                  </div>
                  <p style={{ marginTop: "15px", marginBottom: "15px" }}>
                    {item.title}
                  </p>
                  <h4>⏲️ {item.deliveryTime} Ngày để bàn giao</h4>
                  <p>✔️ {item.shortDescription}</p>
                  {/* <p>✔️ Sản phẩm bàn giao 2</p> */}
                  <h3>
                    Phí hủy hợp đồng: {item.contractCancelFee}% Tổng chi phí
                  </h3>
                  <Button
                    variant="outlined"
                    color="primary"
                    style={{ margin: "20px 0px 10px 0px" }}
                    onClick={() => {
                      setOpenPack(true);
                      setPackId(item.id);
                      setTitlePackage(item.title);
                      setShortDescription(item.shortDescription);
                      setDeliveryTime(item.deliveryTime);
                      setPrice(item.price);
                      setContractCancelFee(item.contractCancelFee);
                    }}
                  >
                    <Edit />
                    Chỉnh sửa
                  </Button>
                  {listPack.length == index + 1 && listPack.length > 1 && (
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={handleClickOpenDelete}
                    >
                      <Delete />
                      Xóa gói
                      {listPack.length == 2 ? " nâng cao" : " cao cấp"}
                    </Button>
                  )}
                  <Dialog
                    open={openDelete}
                    onClose={handleCloseDelete}
                    aria-labelledby="responsive-dialog-title"
                  >
                    <DialogTitle id="responsive-dialog-title">
                      {"Bạn có muốn xóa gói này?"}
                    </DialogTitle>
                    <DialogActions>
                      <Button
                        onClick={() => handleDeletePackage(item.id)}
                        color="secondary"
                        variant="outlined"
                      >
                        Xóa
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
                </TabPanel>
              );
            })}
            {(listPack.length == 1 || listPack.length == 2) &&
              Array(3 - listPack.length)
                .fill("Không có gói này")
                .map((val, idx) => (
                  <>
                    <h1 style={{ textAlign: "center", marginTop: "20px" }}>
                      {val}
                    </h1>
                    <Button
                      variant="outlined"
                      color="primary"
                      className="button_add_package"
                      onClick={() => {
                        setOpenPack(true);
                        setPackId("");
                        setTitlePackage("");
                        setShortDescription("");
                        setDeliveryTime("");
                        setPrice("");
                        setContractCancelFee("");
                      }}
                    >
                      <Add />
                      {listPack.length == 1 && " Tạo gói nâng cao"}
                      {listPack.length == 2 && " Tạo gói cao cấp"}
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
                  cateIdDf={cateId}
                  listCategory={listCategory}
                  category={category}
                  setCategory={handleChangeCategory}
                  errorTitle={errorTitle}
                  errorDescription={errorDescription}
                  errorSubcate={errorSubcate}
                  check={check}
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
            </Dialog>{" "}
            <Dialog
              fullWidth
              maxWidth="sm"
              open={openPack}
              onClose={handleClosePack}
              aria-labelledby="max-width-dialog-title"
            >
              <DialogTitle id="max-width-dialog-title">
                {packId ? "Cập nhật" : "Tạo"} gói dịch vụ
              </DialogTitle>
              <DialogContent>
                <PackageEdit
                  titlePack={handleChangeTitlePackage}
                  shortDescription={handleChangeShortDescription}
                  deliveryTime={handleChangeDeliveryTime}
                  price={handleChangePrice}
                  contractCancelFee={handleChangeContractCancelFee}
                  titlePackV={titlePackage}
                  shortDescriptionV={shortDescription}
                  deliveryTimeV={deliveryTime}
                  priceV={price}
                  contractCancelFeeV={contractCancelFee}
                  titlePackE={titlePackageE}
                  shortDescriptionE={shortDescriptionE}
                  deliveryTimeE={deliveryTimeE}
                  priceE={priceE}
                  contractCancelFeeE={contractCancelFeeE}
                  check={check}
                />
              </DialogContent>
              <DialogActions>
                {packId ? (
                  <Button
                    onClick={handleUpdaytePackage}
                    color="primary"
                    variant="contained"
                  >
                    Cập nhật{" "}
                  </Button>
                ) : (
                  <Button
                    onClick={handleAddPackage}
                    color="primary"
                    variant="contained"
                  >
                    Tạo
                  </Button>
                )}

                <Button onClick={handleClosePack} color="primary">
                  Hủy
                </Button>
              </DialogActions>
            </Dialog>
            <Dialog
              open={openDeleteService}
              onClose={handleCloseDeleteService}
              aria-labelledby="responsive-dialog-title"
            >
              <DialogTitle id="responsive-dialog-title">
                {"Bạn có muốn xóa dịch vụ này?"}
              </DialogTitle>
              <DialogActions>
                <Button
                  onClick={handleDeleteService}
                  color="secondary"
                  variant="outlined"
                >
                  Xóa
                </Button>
                <Button
                  onClick={handleCloseDeleteService}
                  color="default"
                  variant="outlined"
                >
                  Hủy
                </Button>
              </DialogActions>
            </Dialog>
          </SwipeableViews>
        </div>
      </div>
      <ToastContainer limit={2000} position="bottom-right" />
      <div className="sections">
        <Contact />
      </div>
    </div>
  );
}
