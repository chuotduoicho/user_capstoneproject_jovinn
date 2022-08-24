import {
  AppBar,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  MenuItem,
  TextField,
  makeStyles,
  Toolbar,
  Typography,
  List,
  ListItem,
  InputAdornment,
  ListItemText,
  ListItemAvatar,
  Avatar,
  FormControl,
  LinearProgress,
  useTheme,
  InputLabel,
  Select,
  OutlinedInput,
  Box,
  Chip,
} from "@material-ui/core";
import { Close, CloudUpload, AddSharp, RemoveSharp } from "@material-ui/icons";
import Alert from "@material-ui/lab/Alert";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BuyerHeader from "../../../components/buyer/buyerHeader/BuyerHeader";
import Contact from "../../../components/guest/contact/Contact";
import {
  fetchSkills,
  selectAllCategories,
  selectAllSkills,
} from "../../../redux/categorySlice";
import {
  addRequest,
  fetchRequestsBuyer,
  fetchTargetSeller,
  selectAllSellersInvite,
} from "../../../redux/requestSlice";
import { selectCurrentUser, uploadFile } from "../../../redux/userSlice";
import "./buyerCreateRequest.scss";
import { useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

export default function BuyerCreateRequest() {
  const listSkills = useSelector(selectAllSkills);
  const topSeller = useSelector(selectAllSellersInvite);
  const listCategory = useSelector(selectAllCategories);
  const [cateId, setCateId] = useState(listCategory[0].id);
  const [subCateId, setSubCateId] = useState("");
  const [recruitLevel, setRecruitLevel] = useState("BEGINNER");
  const [jobTitle, setJobTitle] = useState("");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState([]);
  const [personName, setPersonName] = useState([]);
  const [inviteUsers, setInviteUsers] = useState([]);
  const [stages, setStages] = useState([
    { startDate: "", endDate: "", description: "", milestoneFee: "" },
  ]);
  const [cancleFee, setCancleFee] = useState(0);

  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [check, setCheck] = useState(false);
  const maxDate = new Date();
  maxDate.setHours(0, 0, 0, 0);
  maxDate.setDate(maxDate.getDate());
  const [file, setFile] = useState();
  const [loading, setLoading] = useState(false);
  const currentUser = useSelector(selectCurrentUser);
  const { url } = useSelector((state) => state.url);
  const request = {
    categoryId: cateId,
    subCategoryId: subCateId,
    recruitLevel: recruitLevel,
    skillsName: skills,
    jobTitle: jobTitle,
    shortRequirement: description,
    milestoneContracts: stages,
    contractCancelFee: cancleFee,
    invitedUsers: inviteUsers,
    attachFile: url,
    status: "OPEN",
  };

  const handleUploadFile = async (e) => {
    setLoading(true);
    setFile(e.target.files[0]);
    console.log(e.target.files[0].name);
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    formData.append("id", currentUser.id);
    formData.append("type", "BOX");

    dispatch(uploadFile(formData))
      .unwrap()
      .then(() => {
        setLoading(false);
        // toast.success("Ảnh 1 tải lên thành công");
      })
      .catch(() => {
        setLoading(false);
      });
  };
  // ssssssss
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setError("");
    let check1 = false;
    let check3 = true;
    setCheck(true);
    stages.map((stage, index) => {
      if (
        new Date(stage.startDate) < maxDate ||
        stage.startDate > stage.endDate ||
        !stage.startDate
      ) {
        check3 = false;
        // setError("Chưa nhập ngày bắt đầu của giai đoạn " + parseInt(index + 1));
      } else if (
        new Date(stage.endDate) < maxDate ||
        stage.startDate > stage.endDate ||
        !stage.endDate
      ) {
        check3 = false;
        // setError(
        //   "Chưa nhập ngày kết thúc của giai đoạn " + parseInt(index + 1)
        // );
      } else if (
        !/^[a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_\s]{1,500}$/.test(
          stage.description
        )
      ) {
        check3 = false;
        // setError(
        //   "Chưa nhập sản phẩm bàn giao của giai đoạn " + parseInt(index + 1)
        // );
      } else if (
        stage.milestoneFee < 1 ||
        stage.milestoneFee.length > 10 ||
        stage.milestoneFee == ""
      ) {
        check3 = false;
        // setError("Chưa nhập chi phí của giai đoạn " + parseInt(index + 1));
      }
    });
    if (
      subCateId == "" ||
      !/^[a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_\s]{1,50}$/.test(
        jobTitle
      ) ||
      !/^[a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_\s]{1,500}$/.test(
        description
      ) ||
      cancleFee < 0 ||
      cancleFee > 100 ||
      !cancleFee ||
      skills.length == 0
    ) {
      // setError("Chưa nhập kĩ năng!");
    } else {
      check1 = true;
    }

    if (check1 && check3) {
      setOpen(true);
      setCheck(false);
    }
  };

  const handleClose = (e) => {
    e.preventDefault();
    dispatch(addRequest(request))
      .unwrap()
      .then(() => {
        dispatch(fetchRequestsBuyer());
        setSuccess("Tạo yêu cầu thành công!");
        navigate("/buyerHome/manageRequest", {
          state: {
            alert: "Tạo yêu cầu thành công",
          },
        });
      })
      .catch(() => {
        setError("Tạo yêu cầu thất bại!");
      });
    setOpen(false);
  };

  const [fullScreenOpen, setFullScreenOpen] = useState(false);
  const handleFullScreenOpen = () => {
    const filterSeller = {
      subCategoryId: subCateId,
      rankSeller: recruitLevel,
      skillName: skills,
    };
    dispatch(fetchTargetSeller(filterSeller));
    setFullScreenOpen(true);
  };
  const navigate = useNavigate();
  const handleFullScreenClose = (e) => {
    e.preventDefault();
    dispatch(addRequest(request))
      .unwrap()
      .then(() => {
        dispatch(fetchRequestsBuyer());
        setSuccess("Tạo yêu cầu thành công!");
        navigate("/buyerHome/manageRequest", {
          state: {
            alert: "Tạo yêu cầu thành công",
          },
        });
      })
      .catch(() => {
        setError("Tạo yêu cầu thất bại!");
      });
    setFullScreenOpen(false);
    setOpen(false);
  };

  const handleStageChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...stages];
    // if (name == "milestoneFee") {
    //   list[index][name] = parseFloat(value).toFixed(2);
    // } else {
    //   list[index][name] = value;
    // }
    list[index][name] = value;
    setStages(list);
  };

  const handleStageAdd = () => {
    setStages([
      ...stages,
      { startDate: "", endDate: "", description: "", milestoneFee: "" },
    ]);
  };

  const handleStageRemove = () => {
    if (stages.length > 1) {
      const list = [...stages];
      list.pop();
      setStages(list);
    }
  };

  function handleKeyDown(e) {
    if (e.key !== "Enter") return;
    const value = e.target.value;
    if (!value.trim()) return;
    setSkills([...skills, value]);
    e.target.value = "";
  }
  function handleChooseSkill(value) {
    if (!value.trim()) return;
    setSkills([...skills, value]);
    value = "";
  }

  function removeSkill(index) {
    setSkills(skills.filter((el, i) => i !== index));
  }

  //skill
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }
  const theme = useTheme();

  console.log("list skill ", personName);
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    console.log(value);
    if (value.length <= 5) {
      setSkills(
        // On autofill we get a stringified value.
        typeof value === "string" ? value.split(",") : value
      );
    }
  };
  useEffect(() => {
    dispatch(fetchSkills());
  }, []);
  console.log(listSkills);

  //new skill
  const options = [
    { label: "Grapes 🍇", value: "grapes" },
    { label: "Mango 🥭", value: "mango" },
    { label: "Strawberry 🍓", value: "strawberry" },
  ];

  const [selecte, setSelecte] = useState([]);
  // console.log(selected);
  return (
    <div className="buyer_profile">
      <BuyerHeader />
      <h1 className="buyer_profile_title">Tạo yêu cầu</h1>
      <Container maxWidth="lg" className="profession_form">
        {" "}
        <div className="profession_row">
          <TextField
            id="outlined-basic"
            label="Tiêu đề"
            variant="outlined"
            style={{ width: "96%" }}
            onChange={(e) => setJobTitle(e.target.value)}
            error={
              !/^[a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_\s]{1,50}$/.test(
                jobTitle
              ) && check
            }
            helperText={
              !/^[a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_\s]{1,50}$/.test(
                jobTitle
              ) &&
              check &&
              "Không được để trống và tối đa 50 kí tự!"
            }
          />
        </div>
        <div className="profession_row">
          <TextField
            id="outlined-basic"
            label="Mô tả"
            variant="outlined"
            multiline
            rows={6}
            style={{ width: "96%" }}
            onChange={(e) => setDescription(e.target.value)}
            error={
              !/^[a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_\s]{1,500}$/.test(
                description
              ) && check
            }
            helperText={
              !/^[a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_\s]{1,500}$/.test(
                description
              ) &&
              check &&
              "Không được để trống và tối đa 500 kí tự !"
            }
          />
        </div>
        <div className="profession_row">
          <TextField
            id="outlined-select-currency"
            select
            label="Chọn danh mục"
            value={cateId}
            onChange={(e) => setCateId(e.target.value)}
            style={{ width: "47%", margin: "10px" }}
            variant="outlined"
          >
            {listCategory.map((category, index) => (
              <MenuItem key={index} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="outlined-select-currency"
            select
            label="Chọn danh mục con"
            value={subCateId}
            onChange={(e) => setSubCateId(e.target.value)}
            style={{ width: "47%", margin: "10px" }}
            variant="outlined"
            error={!subCateId && check}
            helperText={!subCateId && check && "Chưa chọn danh mục con!"}
          >
            {listCategory
              .find((val) => {
                return val.id == cateId;
              })
              .subCategories.map((subCategory, index) => (
                <MenuItem key={index} value={subCategory.id}>
                  {subCategory.name}
                </MenuItem>
              ))}
          </TextField>
        </div>
        {/* <div className="profession_row">
          <pre>{JSON.stringify(selecte)}</pre>
          <MultiSelect
            options={options}
            selected={selecte}
            onChange={setSelecte}
            labelledBy={"Chọn kĩ năng"}
          />
        </div> */}
        <div className="profession_row">
          <FormControl style={{ width: "96%" }}>
            <InputLabel id="demo-multiple-chip-label">
              Kỹ năng (Tối đa là 5)
            </InputLabel>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              value={skills}
              multiple
              error={skills.length == 0 && check}
              helperText={skills.length == 0 && check && "Chưa chọn kỹ năng!"}
              onChange={handleChange}
              input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {listSkills.map((skill, index) => (
                <MenuItem
                  key={index}
                  value={skill.name}
                  style={getStyles(skill.name, skills, theme)}
                >
                  {skill.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* </div> */}
        </div>
        <div className="profession_row">
          {" "}
          <TextField
            id="outlined-select-currency"
            select
            label="Trình độ người bán"
            defaultValue="BEGINNER"
            name="level"
            onChange={(e) => setRecruitLevel(e.target.value)}
            style={{ width: "47%", margin: "10px" }}
            variant="outlined"
          >
            <MenuItem value="BEGINNER">Sơ cấp</MenuItem>
            <MenuItem value="ADVANCED">Có kinh nghiệm</MenuItem>
            <MenuItem value="PROFESSIONAL">Chuyên nghiệp</MenuItem>
          </TextField>
          {/* <FormControl
            className="request_form_control"
            style={{ width: "30%", margin: "10px" }}
          > */}
          <input
            accept="image/*,.doc,.docx,.xlsx,.xls,.csv,.pdf,text/plain"
            className="request_form_input"
            id="request-input-file"
            multiple
            type="file"
            onChange={handleUploadFile}
            hidden
          />
          <label
            htmlFor="request-input-file"
            // style={{ width: "30%", margin: "10px" }}
          >
            <Button
              variant="contained"
              color="primary"
              component="span"
              style={{ width: "47%", margin: "10px", height: "55px" }}
              startIcon={<CloudUpload />}
            >
              {file ? file.name : "FILE ĐÍNH KÈM"}
            </Button>
          </label>{" "}
          {loading && <LinearProgress />}
          {/* </FormControl> */}
        </div>
        <div className="profession_row">
          {" "}
          <Button style={{ height: "70px" }} onClick={handleStageRemove}>
            <RemoveSharp />
          </Button>
          <TextField
            id="outlined-basic"
            label="Số giai đoạn"
            variant="outlined"
            type="number"
            value={stages.length}
            style={{ width: "13%", margin: "10px" }}
            disabled
          />
          <Button style={{ height: "70px" }} onClick={handleStageAdd}>
            <AddSharp />
          </Button>
        </div>
        {stages.map((stage, index) => (
          <div className="profession_itemStage" key={index}>
            <div className="profession_row">
              {stages.length > 1 && <h3>Giai đoạn {index + 1}</h3>}
            </div>
            <div className="profession_row">
              <TextField
                id="outlined-basic"
                label="Ngày bắt đầu"
                variant="outlined"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                style={{ width: "47%", margin: "10px" }}
                name="startDate"
                onChange={(e) => handleStageChange(e, index)}
                error={
                  (new Date(stage.startDate) < maxDate ||
                    stage.startDate > stage.endDate ||
                    !stage.startDate) &&
                  check
                }
                helperText={
                  (new Date(stage.startDate) < maxDate ||
                    stage.startDate > stage.endDate ||
                    !stage.startDate) &&
                  check &&
                  "Phải từ ngày hiện tại trở đi và trước ngày kết thúc"
                }
              />
              <TextField
                id="outlined-basic"
                label="Ngày kết thúc"
                variant="outlined"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                style={{ width: "47%", margin: "10px" }}
                name="endDate"
                onChange={(e) => handleStageChange(e, index)}
                error={
                  (new Date(stage.endDate) < maxDate ||
                    stage.startDate > stage.endDate ||
                    !stage.endDate) &&
                  check
                }
                helperText={
                  (new Date(stage.endDate) < maxDate ||
                    stage.startDate > stage.endDate ||
                    !stage.endDate) &&
                  check &&
                  "Phải từ ngày hiện tại trở đi và sau ngày bắt đàu"
                }
              />
            </div>
            <div className="profession_row">
              {" "}
              <TextField
                id="outlined-basic"
                label="Sản phẩm bàn giao"
                variant="outlined"
                multiline
                rows={4}
                style={{ width: "96%" }}
                name="description"
                onChange={(e) => handleStageChange(e, index)}
                error={
                  !/^[a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_\s]{1,500}$/.test(
                    stage.description
                  ) && check
                }
                helperText={
                  !/^[a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_\s]{1,500}$/.test(
                    stage.description
                  ) &&
                  check &&
                  "Không được để trống và tối đa 500 kí tự !"
                }
              />
            </div>
            <div className="profession_row">
              {" "}
              <TextField
                id="outlined-basic"
                label="Chi phí"
                variant="outlined"
                type="number"
                value={stage.milestoneFee.toLocaleString()}
                style={{ width: "30%", margin: "10px" }}
                name="milestoneFee"
                onChange={(e) => handleStageChange(e, index)}
                error={
                  (stage.milestoneFee < 1 ||
                    stage.milestoneFee.length > 10 ||
                    stage.milestoneFee == "") &&
                  check
                }
                helperText={
                  (stage.milestoneFee < 1 ||
                    stage.milestoneFee.length > 10 ||
                    stage.milestoneFee == "") &&
                  check &&
                  "Tối thiểu là 1$ ,độ dài tối đa 10"
                }
              />
            </div>
          </div>
        ))}
        <div className="profession_row">
          <Typography variant="h4">
            Tổng chi phí :{" "}
            {stages
              .reduce((total, item) => total + parseFloat(item.milestoneFee), 0)
              .toLocaleString()}{" "}
            $
          </Typography>
          <TextField
            id="outlined-basic"
            label="Phí hủy hợp đồng"
            variant="outlined"
            type="number"
            style={{ width: "30%", margin: "10px" }}
            inputProps={{ min: 0 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  % Tổng chi phí (={" "}
                  {(
                    (stages.reduce(
                      (total, item) => total + parseFloat(item.milestoneFee),
                      0
                    ) *
                      cancleFee) /
                    100
                  ).toLocaleString()}
                  $)
                </InputAdornment>
              ),
            }}
            onChange={(e) => setCancleFee(e.target.value)}
            error={(cancleFee < 0 || cancleFee > 100 || !cancleFee) && check}
            helperText={
              (cancleFee < 0 || cancleFee > 100 || !cancleFee) &&
              check &&
              "Tối thiểu là 0% , tối đa là 100%"
            }
          />
        </div>
        <div className="profession_row">
          {" "}
          <Button
            variant="contained"
            color="primary"
            className="form_right_row_btn"
            onClick={handleOpen}
          >
            Gửi yêu cầu
          </Button>
        </div>
        {error !== "" && <Alert severity="error">{error}</Alert>}
        {success !== "" && <Alert severity="success">{success}</Alert>}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle id="dialod-title">
            {"Bạn có muốn gửi lời đến người bán không?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Yêu cầu đã được tạo thành công!Hãy gửi lời mời đến những người bán
              tiềm năng chúng tôi tìm được.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Không</Button>
            <Button onClick={handleFullScreenOpen} color="primary">
              Có
            </Button>
            <Dialog
              fullWidth
              maxWidth="sm"
              open={fullScreenOpen}
              onClose={handleFullScreenClose}
            >
              <AppBar className={classes.appBar}>
                <Toolbar>
                  <IconButton
                    edge="start"
                    color="inherit"
                    onClick={handleFullScreenClose}
                    aria-label="close"
                  >
                    <Close />
                  </IconButton>
                  <Typography variant="h6" className={classes.title}>
                    Người bán tiềm năng
                  </Typography>
                  <Button color="inherit" onClick={handleFullScreenClose}>
                    Hoàn thành
                  </Button>
                </Toolbar>
              </AppBar>
              <List
                style={{
                  width: "50%",
                  margin: "0 auto",
                  border: " 2px solid rgb(238, 225, 225)",
                }}
              >
                {topSeller.length == 0 &&
                  "Không tìm thấy người bán phù hợp với yêu cầu của bạn!"}
                {topSeller.map((item, index) => {
                  return (
                    <ListItem button key={index}>
                      <ListItemAvatar>
                        <Avatar alt="buyer image" src={item.avatar} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={item.fullName}
                        secondary={item.skillName}

                        // secondary={item.skills.map((skill) => skill.name)}
                      />

                      {inviteUsers.find((i) => i.id === item.userId) ? (
                        <Button
                          variant="outlined"
                          color="default"
                          onClick={() =>
                            setInviteUsers(
                              inviteUsers.filter((el) => el.id !== item.userId)
                            )
                          }
                        >
                          Hoàn tác
                        </Button>
                      ) : (
                        <Button
                          variant="outlined"
                          color="secondary"
                          onClick={() =>
                            setInviteUsers([
                              ...inviteUsers,
                              { id: item.userId },
                            ])
                          }
                        >
                          Mời
                        </Button>
                      )}
                    </ListItem>
                  );
                })}
              </List>
            </Dialog>
          </DialogActions>
        </Dialog>
      </Container>
      <div className="sections_profile">
        <Contact />
      </div>
    </div>
  );
}
