import {
  Button,
  Container,
  MenuItem,
  TextField,
  makeStyles,
  Typography,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  Box,
  Chip,
  useTheme,
  LinearProgress,
} from "@material-ui/core";
import { CloudUpload, AddSharp, RemoveSharp } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import BuyerHeader from "../../../components/buyer/buyerHeader/BuyerHeader";
import Contact from "../../../components/guest/contact/Contact";
import {
  fetchSkills,
  selectAllCategories,
  selectAllSkills,
} from "../../../redux/categorySlice";
import {
  addRequest,
  fetchRequestDetail,
  fetchRequestsBuyer,
  selectRequestById,
  selectRequestDetailStatus,
  updateRequest,
} from "../../../redux/requestSlice";

import {
  selectCurrentUser,
  selectTopSellers,
  uploadFile,
} from "../../../redux/userSlice";
import "./buyerRequestDetail.scss";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));
function format2(date) {
  date = new Date(date);

  var day = ("0" + date.getDate()).slice(-2);
  var month = ("0" + (date.getMonth() + 1)).slice(-2);
  var year = date.getFullYear();

  return year + "-" + month + "-" + day;
}
export default function BuyerCreateRequest() {
  const { requestId } = useParams();
  const requestDetail = useSelector(selectRequestById);
  const requestDetailStatus = useSelector(selectRequestDetailStatus);
  const listSkills = useSelector(selectAllSkills);
  const currentUser = useSelector(selectCurrentUser);
  const topSeller = useSelector(selectTopSellers);
  const listCategory = useSelector(selectAllCategories);
  const [cateId, setCateId] = useState(requestDetail.categoryId);
  const [subCateId, setSubCateId] = useState(requestDetail.subcategoryId);
  const [recruitLevel, setRecruitLevel] = useState(requestDetail.recruitLevel);
  const [jobTitle, setJobTitle] = useState(requestDetail.jobTitle);
  const [description, setDescription] = useState(
    requestDetail.shortRequirement
  );
  // var names = requestDetail.skillsName.map(function (item) {
  //   return item["name"];
  // });
  const [skills, setSkills] = useState([]);
  const [inviteUsers, setInviteUsers] = useState([]);
  const [listSubcate, setListSubcate] = useState([]);
  const [file, setFile] = useState();
  const [loading, setLoading] = useState(false);
  const [stages, setStages] = useState([]);
  const [cancleFee, setCancleFee] = useState(requestDetail.contractCancelFee);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [check, setCheck] = useState(false);
  const maxDate = new Date();
  maxDate.setHours(0, 0, 0, 0);
  maxDate.setDate(maxDate.getDate());
  useEffect(() => {
    dispatch(fetchRequestDetail(requestId));
    dispatch(fetchSkills());
  }, []);
  console.log(requestDetailStatus, "requestDetailStatus");
  useEffect(() => {
    if (requestDetailStatus == "success") {
      setCateId(requestDetail.categoryId);
      setSubCateId(requestDetail.subcategoryId);
      setListSubcate(
        listCategory.find((val) => {
          return val.id == requestDetail.categoryId;
        }).subCategories
      );
      setRecruitLevel(requestDetail.recruitLevel);
      setJobTitle(requestDetail.jobTitle);
      setDescription(requestDetail.description);
      var names = requestDetail.skillsName.map(function (item) {
        return item["name"];
      });
      setSkills(names);
      setStages(requestDetail.milestoneContracts);
      setCancleFee(requestDetail.cancleFee);
    }
  }, [requestDetailStatus]);
  // ssssssss
  const classes = useStyles();
  const [open, setOpen] = useState(false);

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
  const handleUpdate = () => {
    setError("");
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
    };
    console.log(request);
    let check1 = false;
    let check2 = true;
    let check3 = true;
    stages.map((item, index) => {
      if (item.startDate == "") {
        check3 = false;
        setError("Chưa nhập ngày bắt đầu của giai đoạn " + parseInt(index + 1));
      } else if (item.endDate == "") {
        check3 = false;
        setError(
          "Chưa nhập ngày kết thúc của giai đoạn " + parseInt(index + 1)
        );
      } else if (item.description == "") {
        check3 = false;
        setError(
          "Chưa nhập sản phẩm bàn giao của giai đoạn " + parseInt(index + 1)
        );
      } else if (item.milestoneFee == 0) {
        check3 = false;
        setError("Chưa nhập chi phí của giai đoạn " + parseInt(index + 1));
      }
    });
    if (subCateId == "") {
      setError("Chưa chọn danh mục con!");
    } else if (jobTitle == "") {
      setError("Chưa nhập tiêu đề!");
    } else if (description == "") {
      setError("Chưa nhập mô tả!");
    } else if (cancleFee == 0) {
      setError("Chưa nhập phí hủy hợp đồng!");
    } else {
      check1 = true;

      skills.map((item, index) => {
        if (item == "") {
          check2 = false;
          setError("Chưa nhập kĩ năng " + parseInt(index + 1));
        }
      });
    }

    if (check2 && check1 && check3) {
      console.log(request);
      dispatch(updateRequest({ request, requestId }))
        .unwrap()
        .then(() => {
          dispatch(fetchRequestDetail(requestId));
          toast.success("Cập nhật yêu cầu thành công! ");
          setIsEdit(false);
        })
        .catch(() => {
          toast.error("Cập nhật yêu cầu thất bại! ");
        });
    }
  };

  const handleStageChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...stages];
    list[index][name] = value;
    setStages(list);
  };

  const handleStageAdd = () => {
    setStages([
      ...stages,
      { startDate: "", endDate: "", description: "", milestoneFee: 0 },
    ]);
  };

  const handleStageRemove = () => {
    if (stages.length > 1) {
      const list = [...stages];
      list.pop();
      setStages(list);
    }
  };

  console.log("inviteUsers", inviteUsers);

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
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSkills(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  return (
    <div className="buyer_profile">
      <BuyerHeader />
      <h1 className="buyer_profile_title">Chi tiết yêu cầu</h1>
      <Container maxWidth="lg" className="profession_form">
        <div className="profession_row">
          <TextField
            id="outlined-basic"
            label="Tiêu đề"
            variant="outlined"
            style={{ width: "96%" }}
            defaultValue={jobTitle}
            disabled={!isEdit}
            onChange={(e) => setJobTitle(e.target.value)}
            error={
              !/^[a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_\s]{5,50}$/.test(
                jobTitle
              ) && check
            }
            helperText={
              !/^[a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_\s]{5,50}$/.test(
                jobTitle
              ) &&
              check &&
              "Từ 5 đến 50 kí tự không được bắt đầu với khoảng trắng"
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
            defaultValue={description}
            disabled={!isEdit}
            onChange={(e) => setDescription(e.target.value)}
            error={
              !/^[a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_\s]{30,500}$/.test(
                description
              ) && check
            }
            helperText={
              !/^[a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_\s]{30,500}$/.test(
                description
              ) &&
              check &&
              "Từ 30 đến 500 kí tự không được bắt đầu với khoảng trắng"
            }
          />
        </div>{" "}
        <div className="profession_row">
          <TextField
            id="outlined-select-currency"
            select
            label="Chọn danh mục"
            defaultValue={cateId}
            disabled={!isEdit}
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
            defaultValue={subCateId}
            disabled={!isEdit}
            onChange={(e) => setSubCateId(e.target.value)}
            style={{ width: "47%", margin: "10px" }}
            variant="outlined"
            error={!subCateId && check}
            helperText={!subCateId && check && "Chưa chọn danh mục con!"}
          >
            {listSubcate.map((subCategory, index) => (
              <MenuItem key={index} value={subCategory.id}>
                {subCategory.name}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div className="profession_row">
          <FormControl style={{ width: "96%" }}>
            <InputLabel id="demo-multiple-chip-label">Kỹ năng</InputLabel>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              value={skills}
              disabled={!isEdit}
              multiple
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
            defaultValue={recruitLevel}
            disabled={!isEdit}
            name="level"
            onChange={(e) => setRecruitLevel(e.target.value)}
            style={{ width: "47%", margin: "10px" }}
            variant="outlined"
          >
            <MenuItem value="BEGINNER">BEGINNER</MenuItem>
            <MenuItem value="ADVANCED">ADVANCED</MenuItem>
            <MenuItem value="COMPETENT">COMPETENT</MenuItem>
            <MenuItem value="PROFICIENT">PROFICIENT</MenuItem>
            <MenuItem value="EXPERT">EXPERT</MenuItem>
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
          <Button
            style={{ height: "70px" }}
            onClick={handleStageRemove}
            disabled={!isEdit}
          >
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
          <Button
            style={{ height: "70px" }}
            onClick={handleStageAdd}
            disabled={!isEdit}
          >
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
                defaultValue={format2(stage.startDate)}
                disabled={!isEdit}
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
                defaultValue={format2(stage.endDate)}
                disabled={!isEdit}
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
                defaultValue={stage.description}
                disabled={!isEdit}
                onChange={(e) => handleStageChange(e, index)}
                error={
                  !/^[a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_\s]{30,500}$/.test(
                    stage.description
                  ) && check
                }
                helperText={
                  !/^[a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_\s]{30,500}$/.test(
                    stage.description
                  ) &&
                  check &&
                  "Từ 30 đến 500 kí tự không được bắt đầu với khoảng trắng"
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
                defaultValue={stage.milestoneFee}
                disabled={!isEdit}
                style={{ width: "30%", margin: "10px" }}
                inputProps={{
                  maxLength: 10,
                  step: "0.01",
                }}
                // InputProps={{
                //   endAdornment: (
                //     <InputAdornment position="end">$</InputAdornment>
                //   ),
                // }}
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
                  "Tối thiểu là 1$ , tối đa 10 chữ số"
                }
              />
            </div>
          </div>
        ))}
        <div className="profession_row">
          <Typography variant="h4">
            Tổng chi phí :{" "}
            {stages
              .reduce((total, item) => total + parseInt(item.milestoneFee), 0)
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
            defaultValue={cancleFee}
            disabled={!isEdit}
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
          {isEdit ? (
            <>
              {" "}
              <Button
                variant="contained"
                color="primary"
                className="form_right_row_btn"
                onClick={handleUpdate}
              >
                Cập nhật
              </Button>
              <Button
                variant="contained"
                color="default"
                className="form_right_row_btn"
                onClick={() => setIsEdit(false)}
              >
                Hủy
              </Button>
            </>
          ) : (
            <Button
              variant="contained"
              color="primary"
              className="form_right_row_btn"
              onClick={() => setIsEdit(true)}
            >
              Chỉnh sửa
            </Button>
          )}
        </div>
        <div
          className="profession_row"
          style={{ border: "2px solid rgb(238, 225, 225)" }}
        >
          <Button
            variant="outlined"
            color="primary"
            style={{ marginLeft: "20px" }}
            onClick={() => navigate("/buyerHome/listSeller/" + requestId)}
          >
            Xem danh sách ứng tuyển
          </Button>

          <Button
            variant="outlined"
            color="primary"
            style={{ marginLeft: "20px" }}
            onClick={() => navigate("/buyerHome/manageOffer/" + requestId)}
          >
            Xem danh sách đề nghị
          </Button>
        </div>
      </Container>
      <ToastContainer limit={3000} position="bottom-right" />
      <div className="sections_profile">
        <Contact />
      </div>
    </div>
  );
}
