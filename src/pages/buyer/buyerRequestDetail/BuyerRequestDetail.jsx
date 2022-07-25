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
} from "@material-ui/core";
import { Close, CloudUpload, AddSharp, RemoveSharp } from "@material-ui/icons";
import Alert from "@material-ui/lab/Alert";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import BuyerHeader from "../../../components/buyer/buyerHeader/BuyerHeader";
import Contact from "../../../components/guest/contact/Contact";
import { selectAllCategories } from "../../../redux/categorySlice";
import {
  addRequest,
  fetchRequestsBuyer,
  selectRequestById,
  updateRequest,
} from "../../../redux/requestSlice";

import { selectTopSellers } from "../../../redux/userSlice";
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

export default function BuyerCreateRequest() {
  const { requestId } = useParams();
  const requestDetail = useSelector((state) =>
    selectRequestById(state, requestId)
  );
  console.log("requestDetail", requestDetail);
  const topSeller = useSelector(selectTopSellers);
  const listCategory = useSelector(selectAllCategories);
  const [cateId, setCateId] = useState(requestDetail.categoryId);
  const [subCateId, setSubCateId] = useState(requestDetail.subcategoryId);
  const [recruitLevel, setRecruitLevel] = useState(requestDetail.recruitLevel);
  const [jobTitle, setJobTitle] = useState(requestDetail.jobTitle);
  const [description, setDescription] = useState(
    requestDetail.shortRequirement
  );
  const skillsName = [];
  const addskill = requestDetail.skillsName.map((s) => skillsName.push(s.name));
  const [skills, setSkills] = useState(skillsName);
  console.log("skills", skills);
  const [inviteUsers, setInviteUsers] = useState([]);
  const [stages, setStages] = useState(requestDetail.milestoneContracts);

  const [cancleFee, setCancleFee] = useState(requestDetail.contractCancelFee);
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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log("request", request);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  // ssssssss
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleUpdate = () => {
    setError("");
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
          dispatch(fetchRequestsBuyer());
          setSuccess("Cập nhật yêu cầu thành công!");
        })
        .catch(() => {
          setError("Cập nhật yêu cầu thất bại!");
        });
    }
  };

  const handleClose = (e) => {
    e.preventDefault();
    dispatch(updateRequest(request, requestId))
      .unwrap()
      .then(() => {
        dispatch(fetchRequestsBuyer());
        setSuccess("Tạo yêu cầu thành công!");
      })
      .catch(() => {
        setError("Tạo yêu cầu thất bại!");
      });
    setOpen(false);
  };

  const [fullScreenOpen, setFullScreenOpen] = useState(false);
  const handleFullScreenOpen = () => {
    setFullScreenOpen(true);
  };
  const handleFullScreenClose = (e) => {
    e.preventDefault();
    dispatch(addRequest(request))
      .unwrap()
      .then(() => {
        setSuccess("Tạo yêu cầu thành công!");
      })
      .catch(() => {
        setError("Tạo yêu cầu thất bại!");
      });
    setFullScreenOpen(false);
    setOpen(false);
  };

  const handleStageChange = (e, index) => {
    const { name, value } = e.target;
    console.log(name, value);
    const list = [];
    stages.map((stage) =>
      list.push({
        startDate: stage.startDate,
        endDate: stage.endDate,
        description: stage.description,
        milestoneFee: stage.milestoneFee,
      })
    );
    console.log(list[index][name]);
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

  function handleKeyDown(e) {
    if (e.key !== "Enter") return;
    const value = e.target.value;
    if (!value.trim()) return;
    setSkills([...skills, value]);
    e.target.value = "";
  }

  function removeSkill(index) {
    setSkills(skills.filter((el, i) => i !== index));
  }

  return (
    <div className="buyer_profile">
      <BuyerHeader />
      <h1 className="buyer_profile_title">Chi tiết yêu cầu</h1>
      <Container maxWidth="lg" className="profession_form">
        {" "}
        <div className="profession_row">
          <TextField
            id="outlined-select-currency"
            select
            label="Chọn danh mục"
            value={cateId}
            onChange={(e) => setCateId(e.target.value)}
            style={{ width: "30%", margin: "10px" }}
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
            style={{ width: "30%", margin: "10px" }}
            variant="outlined"
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
        <div className="profession_row">
          <TextField
            id="outlined-select-currency"
            select
            label="Trình độ người bán"
            defaultValue={recruitLevel}
            name="level"
            onChange={(e) => setRecruitLevel(e.target.value)}
            style={{ width: "23%", margin: "10px" }}
            variant="outlined"
          >
            <MenuItem value="BEGINNER">BEGINNER</MenuItem>
            <MenuItem value="ADVANCED">ADVANCED</MenuItem>
            <MenuItem value="COMPETENT">COMPETENT</MenuItem>
            <MenuItem value="PROFICIENT">PROFICIENT</MenuItem>
            <MenuItem value="EXPERT">EXPERT</MenuItem>
          </TextField>
          <div className="tags-input-container">
            {skills.map((skill, index) => (
              <div className="tag-item" key={index}>
                <span className="text">{skill.name}</span>

                <span className="close" onClick={() => removeSkill(index)}>
                  &times;
                </span>
              </div>
            ))}
            <input
              onKeyDown={handleKeyDown}
              type="text"
              className="tags-input"
              placeholder="Nhập kĩ năng"
            />
          </div>
        </div>
        <div className="profession_row">
          <TextField
            id="outlined-basic"
            label="Tiêu đề"
            variant="outlined"
            defaultValue={jobTitle}
            style={{ width: "62%" }}
            onChange={(e) => setJobTitle(e.target.value)}
          />
        </div>
        <div className="profession_row">
          <TextField
            id="outlined-basic"
            label="Mô tả"
            variant="outlined"
            multiline
            rows={6}
            style={{ width: "62%" }}
            defaultValue={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="profession_row">
          {" "}
          <FormControl className="request_form_control">
            <input
              accept="image/*,.doc,.docx,.xlsx,.xls,.csv,.pdf,text/plain"
              className="request_form_input"
              id="request-input-file"
              multiple
              type="file"
              hidden
            />
            <label htmlFor="request-input-file">
              <Button
                variant="contained"
                color="primary"
                component="span"
                startIcon={<CloudUpload />}
              >
                FILE ĐÍNH KÈM
              </Button>
            </label>{" "}
          </FormControl>
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
            style={{ width: "8%", margin: "10px" }}
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
                style={{ width: "30%", margin: "10px" }}
                name="startDate"
                defaultValue={stage.startDate}
                onChange={(e) => handleStageChange(e, index)}
              />
              <TextField
                id="outlined-basic"
                label="Ngày kết thúc"
                variant="outlined"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                style={{ width: "30%", margin: "10px" }}
                name="endDate"
                defaultValue={stage.endDate}
                onChange={(e) => handleStageChange(e, index)}
              />
            </div>
            <div className="profession_row">
              {" "}
              <TextField
                id="outlined-basic"
                label="Sản phẩm bàn giao"
                variant="outlined"
                multiline
                rows={3}
                style={{ width: "62%" }}
                name="description"
                defaultValue={stage.description}
                onChange={(e) => handleStageChange(e, index)}
              />
            </div>
            <div className="profession_row">
              {" "}
              <TextField
                id="outlined-basic"
                label="Chi phí"
                variant="outlined"
                type="number"
                style={{ width: "30%", margin: "10px" }}
                inputProps={{ min: 0 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">$</InputAdornment>
                  ),
                }}
                name="milestoneFee"
                defaultValue={stage.milestoneFee}
                onChange={(e) => handleStageChange(e, index)}
              />
            </div>
          </div>
        ))}
        <div className="profession_row">
          <Typography variant="h4">
            Tổng chi phí :{" "}
            {stages.reduce(
              (total, item) => total + parseInt(item.milestoneFee),
              0
            )}{" "}
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
                  {(stages.reduce(
                    (total, item) => total + parseInt(item.milestoneFee),
                    0
                  ) *
                    cancleFee) /
                    100}
                  $)
                </InputAdornment>
              ),
            }}
            defaultValue={requestDetail.contractCancelFee}
            onChange={(e) => setCancleFee(e.target.value)}
          />
        </div>
        <div className="profession_row">
          {" "}
          <Button
            variant="contained"
            color="primary"
            className="form_right_row_btn"
            onClick={handleUpdate}
          >
            Cập nhật
          </Button>
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
        {error !== "" && <Alert severity="error">{error}</Alert>}
        {success !== "" && <Alert severity="success">{success}</Alert>}
        {/* <Dialog open={open} onClose={handleClose}>
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
              fullScreen
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
                {topSeller.map((item, index) => {
                  return (
                    <ListItem button key={index}>
                      <ListItemAvatar>
                        <Avatar alt="buyer image" src={item.user.avatar} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={item.user.firstName + " " + item.user.lastName}
                        secondary={item.skills.map((skill) => skill.name)}
                      />

                      {inviteUsers.find((i) => i.id === item.user.id) ? (
                        <Button
                          variant="outlined"
                          color="default"
                          onClick={() =>
                            setInviteUsers(
                              inviteUsers.filter((el) => el.id !== item.user.id)
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
                              { id: item.user.id },
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
        </Dialog> */}
      </Container>
      <div className="sections_profile">
        <Contact />
      </div>
    </div>
  );
}
