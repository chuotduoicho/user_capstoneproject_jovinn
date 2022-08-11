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
  addServicePackage,
  deleteServicePackage,
  fetchServiceDetail,
  fetchServices,
  selectServiceById,
  selectServiceDetail,
  updateService,
  updateServicePackage,
} from "../../../redux/serviceSlice";
import Overview from "../../../components/seller/sellerCreateService/overview/Overview";
import { selectAllCategories } from "../../../redux/categorySlice";
import Alert from "@material-ui/lab/Alert";
import { Add, Delete, Edit } from "@material-ui/icons";
import PackageEdit from "../../../components/seller/sellerCreateService/package/PackageEdit";
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
  const serviceDetail = useSelector(selectServiceDetail);
  const [listPack, setListPack] = useState([]);
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const [selected, setSelected] = useState(false);
  useEffect(() => {
    dispatch(fetchServiceDetail(serviceId));
    setListPack(serviceDetail.packages);
  }, []);
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
        dispatch(fetchServiceDetail(serviceId));
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
        dispatch(fetchServiceDetail(serviceId));
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
    serviceId ? serviceDetail.subCategoryId : ""
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
          dispatch(fetchServiceDetail(serviceId));
          setOpenUpdateOverView(false);
          setTimeout(() => {
            setAlert(""); // count is 0 here
          }, 3000);
        })
        .catch(() => {
          setTimeout(() => {
            setAlertError(""); // count is 0 here
          }, 3000);
          setAlertError("Cập nhật thất bại");
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
          setAlert("Thêm gói thành công"); // Update count to be 5 after timeout is scheduled
          dispatch(fetchServiceDetail(serviceId));
          setTimeout(() => {
            setAlert(""); // count is 0 here
          }, 3000);
          setOpenPack(false);
        })
        .catch(() => {
          setTimeout(() => {
            setAlertError(""); // count is 0 here
          }, 3000);
          setAlertError("Thêm gói thất bại");
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
          setAlert("Cập nhật gói thành công"); // Update count to be 5 after timeout is scheduled
          dispatch(fetchServiceDetail(serviceId));
          setTimeout(() => {
            setAlert(""); // count is 0 here
          }, 3000);
          setOpenPack(false);
        })
        .catch(() => {
          setTimeout(() => {
            setAlertError(""); // count is 0 here
          }, 3000);
          setAlertError("Cập nhật gói thất bại");
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
        setAlert("Xoá gói thành công"); // Update count to be 5 after timeout is scheduled
        dispatch(fetchServices());
        setTimeout(() => {
          setAlert(""); // count is 0 here
        }, 3000);
      })
      .catch(() => {
        setTimeout(() => {
          setAlertError(""); // count is 0 here
        }, 3000);
        setAlertError("Xoá gói thất bại");
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
          <h2>Mô tả về dịch vụ</h2>
          <p>{serviceDetail.description}</p>
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
            {listPack.map((item, index) => {
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
                  <Button
                    variant="outlined"
                    color="primary"
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
                  {packages.length == index + 1 && packages.length > 1 && (
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={handleClickOpenDelete}
                    >
                      <Delete />
                      Xóa gói
                      {packages.length == 2 ? " nâng cao" : " cao cấp"}
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
            {(packages.length == 1 || packages.length == 2) &&
              Array(3 - packages.length)
                .fill("Không có gói này")
                .map((val, idx) => (
                  <>
                    <h1>{val}</h1>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => {
                        setOpenPack(true);
                      }}
                    >
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
          </SwipeableViews>
        </div>
      </div>
      <div className="sections">
        <Contact />
      </div>
    </div>
  );
}
