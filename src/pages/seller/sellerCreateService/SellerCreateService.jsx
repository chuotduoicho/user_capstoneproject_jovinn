import React, { useEffect } from "react";
import Contact from "../../../components/guest/contact/Contact";
import { ToastContainer, toast } from "react-toastify";
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
import { useLocation, useNavigate, useParams } from "react-router-dom";
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
  const newServiceId = useSelector(selectNewServiceId);
  console.log("new service id", newServiceId);
  // const sellerId = currentUser.seller.id;
  // const packages = [...serviceDetail.packages].sort(
  //   (a, b) => a.price - b.price
  // );
  const { state } = useLocation();
  const { mess } = state || {};
  useEffect(() => {
    if (mess) {
      toast.success(mess);
    }
  }, []);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subCateId, setSubCateId] = useState("");
  const listCategory = useSelector(selectAllCategories);
  const [category, setCategory] = useState(listCategory[0]);
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);
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
  const [packages, setPackages] = useState([
    {
      title: "",
      shortDescription: "",
      deliveryTime: "",
      price: "",
      contractCancelFee: "",
    },
  ]);
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

    list2[index][name] = "";

    // console.log(list);
    setPackages(list);
    setPackagesError(list2);
  }
  console.log("packages", packages);
  const [galley1, setGallery1] = useState(null);
  const [galley2, setGallery2] = useState(null);
  const [galley3, setGallery3] = useState(null);
  const [document, setDocument] = useState(null);
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
            check1={check1}
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
            check2={check2}
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
      if (
        !/^[a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_\s]{5,50}$/.test(
          title
        ) ||
        !/^[a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_\s]{30,500}$/.test(
          description
        ) ||
        subCateId == ""
      ) {
        setCheck1(true);
      } else {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    }

    if (activeStep == 1) {
      setCheck2(true);
      const list2 = [...packagesError];
      packages.map((p, index) => {
        console.log(index);
        if (
          !/^[a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_\s]{5,50}$/.test(
            p.title
          )
        ) {
          list2[index].title = "Không được để trống";
        }
        if (
          !/^[a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_\s]{30,500}$/.test(
            p.shortDescription
          )
        ) {
          list2[index].shortDescription = "Không được để trống và hơn 20 kí tự";
        }
        if (p.deliveryTime == "" || p.deliveryTime < 1) {
          list2[index].deliveryTime = "Không được để trống";
        }
        if (p.price == "") {
          list2[index].price = "Không được để trống";
        }
        if (
          p.contractCancelFee == "" ||
          p.contractCancelFee < 0 ||
          p.contractCancelFee > 100
        ) {
          list2[index].contractCancelFee = "Không được để trống";
        }
        if (p.price < 1) {
          list2[index].price = "Giá tối thiểu là 1$";
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
      if (galley1 == null && galley2 == null && galley3 == null) {
        toast.warning("Chọn ít nhất 1 ảnh");
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
        toast.success("Tạo dịch vụ thành công !");
        dispath(fetchServices());
      })
      .catch(() => {
        setError("Tạo dịch vụ thất bại !");
        toast.error("Tạo dịch vụ thất bại !");
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
        toast.success("Tạo dịch vụ thành công !");
        dispath(fetchServices());
      })
      .catch(() => {
        setError("Tạo dịch vụ thất bại !");
        toast.error("Tạo dịch vụ thất bại !");
      });
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  // const handleUpdateService = (e) => {
  //   e.preventDefault();
  //   const newService = {
  //     title: title,
  //     description: description,
  //     impression: 2,
  //     interesting: 2,
  //     subCategory: {
  //       id: subCateId,
  //     },
  //   };
  //   const obj = { service: newService, serviceId };
  //   dispath(updateService(obj))
  //     .unwrap()
  //     .then(() => {
  //       console.log("update service successfull");
  //       dispath(fetchServices());
  //     })
  //     .catch(() => {
  //       console.log("add service fail");
  //     });

  //   packages.map((p) => {
  //     dispath(updateServicePackage(p))
  //       .unwrap()
  //       .then(() => {
  //         console.log("update service package successfull");
  //         dispath(fetchServices());
  //       })
  //       .catch(() => {
  //         console.log("add service fail");
  //       });
  //   });
  //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
  // };
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
            {/* {error !== "" && <Alert severity="error">{error}</Alert>}
            {success !== "" && <Alert severity="success">{success}</Alert>} */}
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
                  </Button>
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
              {/* {success !== "" && (
                <Alert severity="success" style={{ justifyContent: "center" }}>
                  {success}
                </Alert>
              )} */}
            </div>
          </div>
        )}
      </div>
      <ToastContainer position="bottom-right" autoClose={5000} />
      <div className="sections">
        <Contact />
      </div>
    </div>
  );
}
