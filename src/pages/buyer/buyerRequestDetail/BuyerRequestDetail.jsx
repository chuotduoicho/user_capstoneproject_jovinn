import {
  AppBar,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  IconButton,
  MenuItem,
  Radio,
  RadioGroup,
  Slide,
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
import {
  Close,
  CloudUpload,
  AddSharp,
  RemoveSharp,
  RemoveCircle,
  DeleteForever,
  RemoveRounded,
  DeleteOutlineSharp,
} from "@material-ui/icons";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import BuyerHeader from "../../../components/buyer/buyerHeader/BuyerHeader";
import Contact from "../../../components/guest/contact/Contact";
import { selectAllCategories } from "../../../redux/categorySlice";
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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function BuyerRequestDetail() {
  const listCategory = useSelector(selectAllCategories);
  const [cateId, setCateId] = useState(listCategory[0].id);
  const [subCateId, setSubCateId] = useState(
    listCategory[0].subCategories[0].id
  );
  // ssssssss
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [fullScreenOpen, setFullScreenOpen] = React.useState(false);
  const handleFullScreenOpen = () => {
    setFullScreenOpen(true);
  };
  const handleFullScreenClose = () => {
    setFullScreenOpen(false);
    setOpen(false);
  };

  const [chooseStage, setChooseStage] = useState("one");
  const [description, setDescription] = useState("");
  const [stages, setStages] = useState([
    { dateFrom: "", dateTo: "", product: "", price: "" },

    { dateFrom: "", dateTo: "", product: "", price: "" },
  ]);
  const handleStageChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...stages];
    list[index][name] = value;
    setStages(list);
  };

  const handleStageAdd = () => {
    setStages([
      ...stages,
      { dateFrom: "", dateTo: "", product: "", price: "" },
    ]);
  };

  const handleStageRemove = () => {
    if (stages.length > 2) {
      const list = [...stages];
      list.pop();
      setStages(list);
    }
  };

  const [skills, setSkills] = useState([{ name: "", level: "" }]);
  const handleSkillChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...skills];
    list[index][name] = value;
    setSkills(list);
  };

  const handleSkillAdd = () => {
    setSkills([...skills, { name: "", level: "" }]);
  };

  const handleSkillRemove = () => {
    if (skills.length > 1) {
      const list = [...skills];
      list.pop();
      setSkills(list);
    }
  };
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
        <div
          className="profession_row"
          // style={{ border: "2px solid rgb(238, 225, 225)" }}
        >
          {skills.map((stage, index) => (
            <div className="profession_rowLeft">
              <TextField
                id="outlined-basic"
                label="Kĩ Năng"
                variant="outlined"
                style={{ width: "30%", margin: "10px" }}
                name="name"
                defaultValue="HTML"
                onChange={(e) => handleSkillChange(e, index)}
              />
              <TextField
                id="outlined-select-currency"
                select
                label="Trình độ"
                defaultValue="BEGINNER"
                name="level"
                onChange={(e) => handleSkillChange(e, index)}
                style={{ width: "23%", margin: "10px" }}
                variant="outlined"
              >
                <MenuItem value="BEGINNER">BEGINNER</MenuItem>
                <MenuItem value="ADVANCED">ADVANCED</MenuItem>
                <MenuItem value="COMPETENT">COMPETENT</MenuItem>
                <MenuItem value="PROFICIENT">PROFICIENT</MenuItem>
                <MenuItem value="EXPERT">EXPERT</MenuItem>
              </TextField>
              {skills.length > 1 && (
                <Button
                  variant="outlined"
                  color="primary"
                  style={{ height: "55px", margin: "10px" }}
                  onClick={handleSkillRemove}
                >
                  <DeleteOutlineSharp />
                </Button>
              )}
            </div>
          ))}
          <Button
            variant="outlined"
            color="primary"
            // style={{ width: "10%", margin: "10px" }}
            onClick={handleSkillAdd}
          >
            <AddSharp />
            Thêm kĩ năng
          </Button>
        </div>
        <div className="profession_row">
          <TextField
            id="outlined-basic"
            label="Mô tả"
            variant="outlined"
            multiline
            rows={3}
            style={{ width: "62%" }}
            defaultValue="Tôi muốn thật nhiều tiền"
            InputLabelProps={{
              shrink: true,
            }}
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
          <p>Tùy chọn giai đoạn :</p>
          <RadioGroup
            aria-label="gender"
            name="role"
            value={chooseStage}
            onChange={(e) => setChooseStage(e.target.value)}
            className="input_radio"
          >
            <FormControlLabel
              value="one"
              control={<Radio />}
              label="Bàn giao 1 lần "
            />
            <FormControlLabel
              value="many"
              control={<Radio />}
              label="Bàn giao nhiều lần"
            />
          </RadioGroup>
        </div>
        {chooseStage == "one" ? (
          <>
            <div className="profession_row">
              <TextField
                id="outlined-basic"
                label="Ngày bắt đầu"
                variant="outlined"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                defaultValue="2022-07-07"
                style={{ width: "30%", margin: "10px" }}
                // onChange={(e) => setDescriptionBio(e.target.value)}
              />
              <TextField
                id="outlined-basic"
                label="Ngày kết thúc"
                variant="outlined"
                type="date"
                defaultValue="2022-08-07"
                InputLabelProps={{
                  shrink: true,
                }}
                style={{ width: "30%", margin: "10px" }}
                // onChange={(e) => setDescriptionBio(e.target.value)}
              />
            </div>
            <div className="profession_row">
              {" "}
              <TextField
                id="outlined-basic"
                label="Sản phẩm bàn giao"
                multiline
                rows={3}
                defaultValue="Sản phẩm bàn giao abcdef"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                style={{ width: "62%" }}
                // onChange={(e) => setDescriptionBio(e.target.value)}
              />
            </div>
            <div className="profession_row">
              {" "}
              <TextField
                id="outlined-basic"
                label="Tổng chi phí"
                variant="outlined"
                type="number"
                defaultValue="100"
                InputLabelProps={{
                  shrink: true,
                }}
                style={{ width: "30%", margin: "10px" }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">$</InputAdornment>
                  ),
                }}
                // onChange={(e) => setDescriptionBio(e.target.value)}
              />
              <TextField
                id="outlined-basic"
                label="Phí hủy hợp đồng"
                variant="outlined"
                type="number"
                defaultValue="10"
                InputLabelProps={{
                  shrink: true,
                }}
                style={{ width: "30%", margin: "10px" }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      % Tổng chi phí
                    </InputAdornment>
                  ),
                }}
                // onChange={(e) => setDescriptionBio(e.target.value)}
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
                Cập nhật
              </Button>
            </div>
          </>
        ) : (
          <>
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
              <div className="profession_itemStage">
                <div className="profession_row">
                  <h3>Giai đoạn {index + 1}</h3>
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
                    name="dateFrom"
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
                    name="dateTo"
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
                    name="product"
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
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">$</InputAdornment>
                      ),
                    }}
                    name="price"
                    onChange={(e) => handleStageChange(e, index)}
                  />
                </div>
              </div>
            ))}
            <div className="profession_row">
              {" "}
              <TextField
                id="outlined-basic"
                label="Tổng chi phí"
                variant="outlined"
                type="number"
                style={{ width: "30%", margin: "10px" }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">$</InputAdornment>
                  ),
                }}
                // onChange={(e) => setDescriptionBio(e.target.value)}
              />
              <TextField
                id="outlined-basic"
                label="Phí hủy hợp đồng"
                variant="outlined"
                type="number"
                style={{ width: "30%", margin: "10px" }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      % Tổng chi phí
                    </InputAdornment>
                  ),
                }}
                // onChange={(e) => setDescriptionBio(e.target.value)}
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
                Cập nhật
              </Button>
            </div>
          </>
        )}
        <div
          className="profession_row"
          style={{ border: "2px solid rgb(238, 225, 225)" }}
        >
          Có lời đề nghị cho yêu cầu này!
          <Link to="/buyerHome/offerDetail/abc">
            <Button
              variant="outlined"
              color="primary"
              style={{ marginLeft: "20px" }}
              // onClick={handleOpen}.
            >
              Xem đề nghị
            </Button>
          </Link>
        </div>
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
                <ListItem button>
                  <ListItemAvatar>
                    <Avatar alt="buyer image" src="assets/tai.jpg" />
                  </ListItemAvatar>
                  <ListItemText
                    primary="Seller 1"
                    secondary="Java, .Net, PHP"
                  />
                  <Button variant="outlined" color="secondary">
                    Mời
                  </Button>
                </ListItem>
                <ListItem button>
                  <ListItemAvatar>
                    <Avatar alt="buyer image" src="assets/tai.jpg" />
                  </ListItemAvatar>
                  <ListItemText
                    primary="Seller 2"
                    secondary="Java, .Net, PHP"
                  />
                  <Button variant="outlined" color="secondary">
                    Mời
                  </Button>
                </ListItem>
                <ListItem button>
                  <ListItemAvatar>
                    <Avatar alt="buyer image" src="assets/tai.jpg" />
                  </ListItemAvatar>
                  <ListItemText
                    primary="Seller 3"
                    secondary="Java, .Net, PHP"
                  />
                  <Button variant="outlined" color="secondary">
                    Mời
                  </Button>
                </ListItem>
                <ListItem button>
                  <ListItemAvatar>
                    <Avatar alt="buyer image" src="assets/tai.jpg" />
                  </ListItemAvatar>
                  <ListItemText
                    primary="Seller 4"
                    secondary="Java, .Net, PHP"
                  />
                  <Button variant="outlined" color="secondary">
                    Mời
                  </Button>
                </ListItem>
                <ListItem button>
                  <ListItemAvatar>
                    <Avatar alt="buyer image" src="assets/tai.jpg" />
                  </ListItemAvatar>
                  <ListItemText
                    primary="Seller 5"
                    secondary="Java, .Net, PHP"
                  />
                  <Button variant="outlined" color="secondary">
                    Mời
                  </Button>
                </ListItem>
                <ListItem button>
                  <ListItemAvatar>
                    <Avatar alt="buyer image" src="assets/tai.jpg" />
                  </ListItemAvatar>
                  <ListItemText
                    primary="Seller 6"
                    secondary="Java, .Net, PHP"
                  />
                  <Button variant="outlined" color="secondary">
                    Mời
                  </Button>
                </ListItem>
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
