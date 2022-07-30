import React, { useEffect } from "react";
import Contact from "../../../components/guest/contact/Contact";
import "./sellerCreateService.scss";
import SellerHeader from "../../../components/seller/sellerHeader/SellerHeader";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Check from "@material-ui/icons/Check";
import SettingsIcon from "@material-ui/icons/Settings";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import VideoLabelIcon from "@material-ui/icons/VideoLabel";
import StepConnector from "@material-ui/core/StepConnector";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Overview from "../../../components/seller/sellerCreateService/overview/Overview";
import Package from "../../../components/seller/sellerCreateService/package/Package";
import ProductImg from "../../../components/seller/sellerCreateService/productImg/ProductImg";
import Confirm from "../../../components/seller/sellerCreateService/confirm/Confirm";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addService,
  fetchServices,
  selectNewServiceId,
  selectServiceById,
  selectServiceId,
  updateService,
  updateServicePackage,
} from "../../../redux/serviceSlice";
import { selectCurrentUser } from "../../../redux/userSlice";
import Alert from "@material-ui/lab/Alert";
import { selectAllCategories } from "../../../redux/categorySlice";
const QontoConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },
  active: {
    "& $line": {
      borderColor: "#784af4",
    },
  },
  completed: {
    "& $line": {
      borderColor: "#784af4",
    },
  },
  line: {
    borderColor: "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1,
  },
})(StepConnector);

const useQontoStepIconStyles = makeStyles({
  root: {
    color: "#eaeaf0",
    display: "flex",
    height: 22,
    alignItems: "center",
  },
  active: {
    color: "#784af4",
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: "currentColor",
  },
  completed: {
    color: "#784af4",
    zIndex: 1,
    fontSize: 18,
  },
});

function QontoStepIcon(props) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed ? (
        <Check className={classes.completed} />
      ) : (
        <div className={classes.circle} />
      )}
    </div>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
};

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  active: {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  },
  completed: {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
  },
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <SettingsIcon />,
    2: <GroupAddIcon />,
    3: <VideoLabelIcon />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginRight: theme.spacing(1),
    marginBottom: "10px",
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return [
    "Tổng quan",
    "Gói dịch vụ",
    "Sản phẩm thử nghiệm",
    "Xác nhận tạo dịch vụ",
  ];
}

export default function SellerCreateService() {
  const { serviceId } = useParams();
  const serviceDetail = useSelector((state) =>
    selectServiceById(state, serviceId)
  );
  console.log("service", serviceDetail);
  const currentUser = useSelector(selectCurrentUser);
  const newServiceId = useSelector(selectNewServiceId);
  console.log("new service id", newServiceId);
  // const sellerId = currentUser.seller.id;
  // const packages = [...serviceDetail.packages].sort(
  //   (a, b) => a.price - b.price
  // );
  const [title, setTitle] = useState(serviceId ? serviceDetail.title : "");
  const [description, setDescription] = useState(
    serviceId ? serviceDetail.description : ""
  );
  const [subCateId, setSubCateId] = useState(
    serviceId ? serviceDetail.subcategory.id : ""
  );
  const listCategory = useSelector(selectAllCategories);
  const [category, setCategory] = useState(listCategory[0]);
  const [errorTitle, setErrorTitle] = React.useState("");
  const [errorDescription, setErrorDescription] = React.useState("");
  const [errorSubcate, setErrorSubcate] = React.useState("");
  const handleChangeCategory = (e) => {
    setCategory(e.target.value);
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
  // useEffect(() => {
  //   if (title.length == 0) {
  //     setErrorTitle("Chưa nhập tiêu đề!");
  //   }
  // }, [title]);
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
  const [packages, setPackages] = useState(
    serviceId
      ? serviceDetail.packages
      : [
          {
            title: "",
            shortDescription: "",
            deliveryTime: "",
            price: "",
            contractCancelFee: "",
          },
        ]
  );
  const [packagesError, setPackagesError] = useState([
    {
      title: "",
      shortDescription: "",
      deliveryTime: "",
      price: "",
      contractCancelFee: "",
    },
  ]);

  const [checked, setChecked] = useState(false);
  const handleChange = () => {
    setPackages([
      ...packages,
      {
        title: "",
        shortDescription: "",
        deliveryTime: "",
        price: "",
        contractCancelFee: "",
      },
    ]);
    setPackagesError([
      ...packagesError,
      {
        title: "",
        shortDescription: "",
        deliveryTime: "",
        price: "",
        contractCancelFee: "",
      },
    ]);
  };
  const handleChange2 = () => {
    const list = [...packages];
    list.pop();
    setPackages(list);
    const list2 = [...packagesError];
    list2.pop();
    setPackagesError(list2);
  };
  function handlePackageChange(e, index) {
    const { name, value } = e.target;
    const list = [...packages];
    const list2 = [...packagesError];
    // console.log(list);
    list[index][name] = value;
    if (value != "") {
      if (
        name != "shortDescription" ||
        (name == "shortDescription" && value.length > 20)
      ) {
        list2[index][name] = "";
      }
    }
    // console.log(list);
    setPackages(list);
    setPackagesError(list2);
  }
  console.log("packages", packages);
  const [galley1, setGallery1] = useState(
    serviceId ? serviceDetail.gallery.imageGallery1 : null
  );
  const [galley2, setGallery2] = useState(
    serviceId ? serviceDetail.gallery.imageGallery2 : null
  );
  const [galley3, setGallery3] = useState(
    serviceId ? serviceDetail.gallery.imageGallery3 : null
  );
  const [document, setDocument] = useState(
    serviceId ? serviceDetail.gallery.documentGallery : null
  );
  const handleChangeGallery1 = (value) => {
    setGallery1(value);
  };
  const handleChangeGallery2 = (value) => {
    setGallery2(value);
  };
  const handleChangeGallery3 = (value) => {
    setGallery3(value);
  };
  const handleChangeDocument = (value) => {
    setDocument(value);
  };
  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
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
        );
      case 1:
        return (
          <Package
            packages={packages}
            checked={checked}
            handleChange={handleChange}
            handleChange2={handleChange2}
            handlePackageChange={handlePackageChange}
            packagesError={packagesError}
          />
        );

      case 2:
        return (
          <ProductImg
            galley1={handleChangeGallery1}
            galley2={handleChangeGallery2}
            galley3={handleChangeGallery3}
            document={handleChangeDocument}
            galley1V={galley1}
            galley2V={galley2}
            galley3V={galley3}
            documentV={document}
          />
        );
      case 3:
        return <Confirm />;
      default:
        return "Unknown step";
    }
  }
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const steps = getSteps();
  const navigate = useNavigate();
  const handleNext = () => {
    setError("");
    if (activeStep == 0) {
      if (title == "") {
        setErrorTitle("Tiêu đề không được trống!");
      }
      if (description == "") {
        setErrorDescription("Mô tả không được trống!");
      }
      if (subCateId == "") {
        setErrorSubcate("Danh mục không được trống!");
      }
      if (title != "" && description != "" && subCateId != "") {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setError("");
      }
    }

    if (activeStep == 1) {
      const list2 = [...packagesError];
      let temp = packages[0].price;
      packages.map((p, index) => {
        console.log(index);
        if (p.title == "") {
          list2[index].title = "Không được để trống";
        }
        if (
          p.shortDescription == "" ||
          p.shortDescription.length < 20 ||
          p.shortDescription.length > 500
        ) {
          list2[index].shortDescription = "Không được để trống và hơn 20 kí tự";
        }
        if (p.deliveryTime == "") {
          list2[index].deliveryTime = "Không được để trống";
        }
        if (p.price == "") {
          list2[index].price = "Không được để trống";
        }
        if (p.contractCancelFee == "") {
          list2[index].contractCancelFee = "Không được để trống";
        }
        if (index > 0 && p.price <= temp) {
          list2[index].price = "Giá phải cao hơn giá gói trước";
        } else {
          temp = p.price;
        }
      });
      setPackagesError(list2);

      const check = packagesError.map((item, index) => {
        if (
          item.title == "" &&
          item.shortDescription == "" &&
          item.deliveryTime == "" &&
          item.price == "" &&
          item.contractCancelFee == "" &&
          packagesError.length - 1 == index
        ) {
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
        console.log("abc");
      });
    }

    if (activeStep == 2) {
      if (galley1 == null) {
        setError("Chưa chọn đủ ảnh!");
      } else if (galley2 == null) {
        setError("Chưa chọn đủ ảnh!");
      } else if (galley3 == null) {
        setError("Chưa chọn đủ ảnh!");
      } else if (document == null) {
        setError("Chưa chọn tài liệu!");
      } else {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setError("");
      }
    }
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const dispath = useDispatch();

  const handleCreateActive = (e) => {
    e.preventDefault();
    const newService = {
      title: title,
      description: description,
      impression: 2,
      interesting: 2,
      status: "ACTIVE",
      subCategory: {
        id: subCateId,
      },
      gallery: {
        imageGallery1: galley1,
        imageGallery2: galley2,
        imageGallery3: galley3,
        documentGallery: document,
      },
      packages: packages,
    };
    console.log("new service ", newService);
    dispath(addService(newService))
      .unwrap()
      .then(() => {
        setSuccess("Tạo dịch vụ thành công!");
        dispath(fetchServices());
      })
      .catch(() => {
        setError("Tạo dịch vụ thất bại !");
      });
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleCreateDeactive = (e) => {
    e.preventDefault();
    const newService = {
      title: title,
      description: description,
      impression: 2,
      interesting: 2,
      status: "ACTIVE",
      subCategory: {
        id: subCateId,
      },
      gallery: {
        imageGallery1: galley1,
        imageGallery2: galley2,
        imageGallery3: galley3,
        documentGallery: document,
      },
      packages: packages,
    };
    console.log("new service ", newService);
    dispath(addService(newService))
      .unwrap()
      .then(() => {
        setSuccess("Tạo dịch vụ thành công!");
        dispath(fetchServices());
      })
      .catch(() => {
        setError("Tạo dịch vụ thất bại !");
      });
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleUpdateService = (e) => {
    e.preventDefault();
    const newService = {
      title: title,
      description: description,
      impression: 2,
      interesting: 2,
      subCategory: {
        id: subCateId,
      },
    };
    const obj = { service: newService, serviceId };
    dispath(updateService(obj))
      .unwrap()
      .then(() => {
        console.log("update service successfull");
        dispath(fetchServices());
      })
      .catch(() => {
        console.log("add service fail");
      });

    packages.map((p) => {
      dispath(updateServicePackage(p))
        .unwrap()
        .then(() => {
          console.log("update service package successfull");
          dispath(fetchServices());
        })
        .catch(() => {
          console.log("add service fail");
        });
    });
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleView = () => {
    navigate("/sellerHome/serviceDetail/" + newServiceId);
  };

  return (
    <div className="sellerHome">
      <SellerHeader />
      <h1 className="sellerCreateService_title">Tạo dịch vụ</h1>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<QontoConnector />}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div style={{ textAlign: "center" }}>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              Tất cả các bước đã hoàn thành
            </Typography>
            <Button onClick={handleView} className={classes.button}>
              Xem chi tiết dịch vụ
            </Button>
            {error !== "" && <Alert severity="error">{error}</Alert>}
            {success !== "" && <Alert severity="success">{success}</Alert>}
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>
              {getStepContent(activeStep)}
            </Typography>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.button}
              >
                Trở lại
              </Button>
              {activeStep === steps.length - 1 ? (
                <>
                  {serviceId ? (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleUpdateService}
                      className={classes.button}
                    >
                      Cập nhật
                    </Button>
                  ) : (
                    <>
                      {" "}
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleCreateDeactive}
                        className={classes.button}
                      >
                        Tạo mới và tạm dừng
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleCreateActive}
                        className={classes.button}
                      >
                        Tạo mới và mở
                      </Button>{" "}
                    </>
                  )}
                </>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  className={classes.button}
                >
                  Tiếp tục
                </Button>
              )}
              {error !== "" && (
                <Alert severity="error" style={{ justifyContent: "center" }}>
                  {error}
                </Alert>
              )}
              {success !== "" && (
                <Alert severity="success" style={{ justifyContent: "center" }}>
                  {success}
                </Alert>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="sections">
        <Contact />
      </div>
    </div>
  );
}
