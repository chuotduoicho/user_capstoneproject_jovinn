import React from "react";
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
} from "../../../redux/serviceSlice";
import { useEffect } from "react";
import { selectCurrentUser } from "../../../redux/userSlice";
import Alert from "@material-ui/lab/Alert";
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
  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleChangeDes = (e) => {
    setDescription(e.target.value);
  };
  const handleChangeSubcateId = (e) => {
    setSubCateId(e.target.value);
  };
  const [packages, setPackages] = useState(
    serviceId
      ? serviceDetail.packages
      : [
          {
            title: "",
            shortDescription: "",
            deliveryTime: 0,
            price: 0,
            contractCancelFee: 0,
          },
        ]
  );
  const [checked, setChecked] = useState(false);
  const handleChange = () => {
    if (!checked) {
      setPackages([
        ...packages,
        {
          title: "",
          shortDescription: "",
          deliveryTime: 0,
          price: 0,
          contractCancelFee: 0,
        },
        {
          title: "",
          shortDescription: "",
          deliveryTime: 0,
          price: 0,
          contractCancelFee: 0,
        },
      ]);
      setChecked((prev) => !prev);
    } else if (checked && packages.length > 1) {
      const list = [...packages];
      list.pop();
      list.pop();
      setPackages(list);
      setChecked((prev) => !prev);
    }
  };
  function handlePackageChange(e, index) {
    const { name, value } = e.target;
    const list = [...packages];
    list[index][name] = value;
    setPackages(list);
  }
  console.log("packages", packages);
  const [status, setStatus] = useState("ACTIVE");
  const [title1, setTitle1] = useState(
    serviceId ? serviceDetail.packages[0].title : ""
  );
  const [title2, setTitle2] = useState(
    serviceId ? serviceDetail.packages[1].title : ""
  );
  const [title3, setTitle3] = useState(
    serviceId ? serviceDetail.packages[2].title : ""
  );
  const [description1, setDescription1] = useState(
    serviceId ? serviceDetail.packages[0].shortDescription : ""
  );
  const [description2, setDescription2] = useState(
    serviceId ? serviceDetail.packages[1].shortDescription : ""
  );
  const [description3, setDescription3] = useState(
    serviceId ? serviceDetail.packages[2].shortDescription : ""
  );
  const [deliveryTime1, setDeliveryTime1] = useState(
    serviceId ? serviceDetail.packages[0].deliveryTime : "0"
  );
  const [deliveryTime2, setDeliveryTime2] = useState(
    serviceId ? serviceDetail.packages[1].deliveryTime : "0"
  );
  const [deliveryTime3, setDeliveryTime3] = useState(
    serviceId ? serviceDetail.packages[2].deliveryTime : "0"
  );
  const [price1, setPrice1] = useState(
    serviceId ? serviceDetail.packages[0].price : "0"
  );
  const [price2, setPrice2] = useState(
    serviceId ? serviceDetail.packages[1].price : "99999"
  );
  const [price3, setPrice3] = useState(
    serviceId ? serviceDetail.packages[2].price : "99999"
  );
  const [contractCancelFee1, setContractCancelFee1] = useState(
    serviceId ? serviceDetail.packages[0].contractCancelFee : ""
  );
  const [contractCancelFee2, setContractCancelFee2] = useState(
    serviceId ? serviceDetail.packages[1].contractCancelFee : ""
  );
  const [contractCancelFee3, setContractCancelFee3] = useState(
    serviceId ? serviceDetail.packages[2].contractCancelFee : ""
  );
  const handleChangeTitle1 = (e) => {
    setTitle1(e.target.value);
  };
  const handleChangeTitle2 = (e) => {
    setTitle2(e.target.value);
  };
  const handleChangeTitle3 = (e) => {
    setTitle3(e.target.value);
  };
  const handleChangeDescription1 = (e) => {
    setDescription1(e.target.value);
  };
  const handleChangeDescription2 = (e) => {
    setDescription2(e.target.value);
  };
  const handleChangeDescription3 = (e) => {
    setDescription3(e.target.value);
  };
  const handleChangeDeliveryTime1 = (e) => {
    setDeliveryTime1(e.target.value);
  };
  const handleChangeDeliveryTime2 = (e) => {
    setDeliveryTime2(e.target.value);
  };
  const handleChangeDeliveryTime3 = (e) => {
    setDeliveryTime3(e.target.value);
  };
  const handleChangePrice1 = (e) => {
    setPrice1(e.target.value);
  };
  const handleChangePrice2 = (e) => {
    setPrice2(e.target.value);
  };
  const handleChangePrice3 = (e) => {
    setPrice3(e.target.value);
  };
  const handleContractCancelFee1 = (e) => {
    setContractCancelFee1(e.target.value);
  };
  const handleContractCancelFee2 = (e) => {
    setContractCancelFee2(e.target.value);
  };
  const handleContractCancelFee3 = (e) => {
    setContractCancelFee3(e.target.value);
  };
  const [galley1, setGallery1] = useState(
    "https://i1-dulich.vnecdn.net/2021/07/16/1-1626437591.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=BWzFqMmUWVFC1OfpPSUqMA"
  );
  const [galley2, setGallery2] = useState(null);
  const [galley3, setGallery3] = useState(null);
  const [document, setDocument] = useState(null);
  const handleChangeGallery1 = (e) => {
    setGallery1(e.target.value);
  };
  const handleChangeGallery2 = (e) => {
    setGallery2(e.target.value);
  };
  const handleChangeGallery3 = (e) => {
    setGallery3(e.target.value);
  };
  const handleChangeDocument = (e) => {
    setDocument(e.target.value);
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
          />
        );
      case 1:
        return (
          <Package
            // title1={handleChangeTitle1}
            // title2={handleChangeTitle2}
            // title3={handleChangeTitle3}
            // description1={handleChangeDescription1}
            // description2={handleChangeDescription2}
            // description3={handleChangeDescription3}
            // deliveryTime1={handleChangeDeliveryTime1}
            // deliveryTime2={handleChangeDeliveryTime2}
            // deliveryTime3={handleChangeDeliveryTime3}
            // price1={handleChangePrice1}
            // price2={handleChangePrice2}
            // price3={handleChangePrice3}
            // contractCancelFee1={handleContractCancelFee1}
            // contractCancelFee2={handleContractCancelFee2}
            // contractCancelFee3={handleContractCancelFee3}
            // title1V={title1}
            // title2V={title2}
            // title3V={title3}
            // description1V={description1}
            // description2V={description2}
            // description3V={description3}
            // deliveryTime1V={deliveryTime1}
            // deliveryTime2V={deliveryTime2}
            // deliveryTime3V={deliveryTime3}
            // price1V={price1}
            // price2V={price2}
            // price3V={price3}
            // contractCancelFee1V={contractCancelFee1}
            // contractCancelFee2V={contractCancelFee2}
            // contractCancelFee3V={contractCancelFee3}
            packages={packages}
            checked={checked}
            handleChange={handleChange}
            handlePackageChange={handlePackageChange}
          />
        );

      case 2:
        return (
          <ProductImg
            galley1={handleChangeGallery1}
            galley2={handleChangeGallery2}
            galley3={handleChangeGallery3}
            document={handleChangeDocument}
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
        setError("Chưa nhập tiêu đề!");
      } else if (description == "") {
        setError("Chưa nhập mô tả!");
      } else if (subCateId == "") {
        setError("Chưa chọn danh mục!");
      } else {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setError("");
      }
    }

    // if (activeStep == 1) {
    //   if (title1 == "") {
    //     setError("Chưa nhập tiêu đề gói cơ bản!");
    //   } else if (description1 == "") {
    //     setError("Chưa nhập sản phẩm bàn giao gói cơ bản!");
    //   } else if (subCateId == "") {
    //     setError("Chưa chọn danh mục!");
    //   } else {
    //     setActiveStep((prevActiveStep) => prevActiveStep + 1);
    //     setError("");
    //   }
    // }

    // if (activeStep == 2) {
    //   if (title1 == "") {
    //     setError("Chưa nhập tiêu đề!");
    //   } else if (description1 == "") {
    //     setError("Chưa nhập sản phẩm bàn giao!");
    //   } else if (subCateId == "") {
    //     setError("Chưa chọn danh mục!");
    //   } else {
    //     setActiveStep((prevActiveStep) => prevActiveStep + 1);
    //     setError("");
    //   }
    // }
    // setActiveStep((prevActiveStep) => prevActiveStep + 1);
    // console.log("sellerId", sellerId);
    console.log("title", title);
    console.log("description", description);
    console.log("subCateId", subCateId);
    // console.log("description1", description1);
    // console.log("description2", description2);
    // console.log("description3", description3);
    // console.log("deliveryTime1", deliveryTime1);
    // console.log("deliveryTime2", deliveryTime2);
    // console.log("deliveryTime3", deliveryTime3);
    // console.log("price1", price1);
    // console.log("price2", price2);
    // console.log("price3", price3);
    // console.log("contractCancelFee1", contractCancelFee1);
    // console.log("contractCancelFee2", contractCancelFee2);
    // console.log("contractCancelFee3", contractCancelFee3);
    console.log("galley1", galley1);
    console.log("galley2", galley2);
    console.log("galley3", galley3);
    console.log("document", document);
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
      },
      packages: packages,
    };
    console.log("new service ", newService);
    dispath(addService(newService))
      .unwrap()
      .then(() => {
        setSuccess("add service successfull");
        console.log("add service successfull");
        dispath(fetchServices());
      })
      .catch(() => {
        setError("add service fail");
        console.log("add service fail");
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
      status: "DEACTIVE",
      subCategory: {
        id: subCateId,
      },
      gallery: {
        imageGallery1: galley1,
      },
      packages: packages,
    };
    console.log("new service ", newService);
    dispath(addService(newService))
      .unwrap()
      .then(() => {
        console.log("add service successfull");
        dispath(fetchServices());
      })
      .catch(() => {
        console.log("add service fail");
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
      gallery: {
        imageGallery1: galley1,
      },
      // packages: [
      //   {
      //     title: "Noi Dung 1",
      //     shortDescription: description1,
      //     deliveryTime: deliveryTime1,
      //     price: price1,
      //   },
      //   {
      //     title: "Noi Dung 2",
      //     shortDescription: description2,
      //     deliveryTime: deliveryTime2,
      //     price: price2,
      //   },
      //   {
      //     title: "Noi Dung 3",
      //     shortDescription: description3,
      //     deliveryTime: deliveryTime3,
      //     price: price3,
      //   },
      // ],
    };
    const obj = { service: newService, serviceId };
    dispath(updateService(obj))
      .unwrap()
      .then(() => {
        console.log("add service successfull");
        dispath(fetchServices());
      })
      .catch(() => {
        console.log("add service fail");
      });
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleView = () => {
    navigate("/sellerHome/serviceDetail/" + newServiceId);
  };

  return (
    <div className="sellerHome">
      <SellerHeader />
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
              {error !== "" && <Alert severity="error">{error}</Alert>}
              {success !== "" && <Alert severity="success">{success}</Alert>}
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
