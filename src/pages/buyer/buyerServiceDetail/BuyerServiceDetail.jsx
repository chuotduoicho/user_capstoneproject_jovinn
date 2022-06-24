import { React, useState } from "react";
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
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Modal,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@material-ui/core";
import { Divider, Avatar, Grid, Paper } from "@material-ui/core";
import Topbar from "../../../components/guest/topbar/Topbar";
import BuyerHeader from "../../../components/buyer/buyerHeader/BuyerHeader";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
};
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
export default function ServiceDetail() {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [numberStage, setNumberStage] = useState(0);
  const [arr, setArr] = useState([]);
  const [selected, setSelected] = useState("false");
  const handleChangeSelect = (ev) => {
    setSelected(ev.target.value);
  };
  console.log(selected);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  //modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div className="service_detail">
      <BuyerHeader />
      <div className="service_detail2">
        <div className="detail_left">
          <h2>
            Title Title Title Title TitleTitleTitle Title TitleTitleTitleTitle
            Title
          </h2>
          <div className="seller_header">
            <img
              src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="avatar"
            />
            <p>Nguyen The Vinh | Level 2 Seller | 9⭐</p>
          </div>
          <img
            src="https://elements-video-cover-images-0.imgix.net/files/127924249/previewimg.jpg?auto=compress&crop=edges&fit=crop&fm=jpeg&h=800&w=1200&s=13978d17ddbcd5bafe3a492797e90465"
            alt=""
          ></img>
          <h2>Mô tả</h2>
          <p>
            Mô tả Mô tả Mô tả Mô tả Mô tả Mô tả Mô tả Mô tả Mô tả Mô tả Mô tả Mô
            tả Mô tả Mô tả Mô tả Mô tả Mô tả Mô tả Mô tả Mô tả Mô tả Mô tả Mô tả
            Mô tả Mô tả Mô tả Mô tả Mô tả Mô tả Mô tả Mô tả Mô tả Mô tả Mô tả Mô
            tả Mô tả Mô tả Mô tả Mô tả Mô tả Mô tả Mô tả Mô tả Mô tả Mô tả Mô tả
            Mô tả Mô tả Mô tả Mô tả Mô tả Mô tả Mô tả Mô tả Mô tả Mô tả Mô tả{" "}
          </p>
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
              <Tab label="Tùy chọn" {...a11yProps(3)} />
            </Tabs>
          </AppBar>
          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={value}
            onChangeIndex={handleChangeIndex}
            style={{ border: "2px groove #d8d0d2" }}
          >
            <TabPanel value={value} index={0} dir={theme.direction}>
              <h1>5$</h1>
              <p style={{ marginTop: "15px", marginBottom: "15px" }}>
                Astra Pro + Elementor Pro ( Licensed 1 Website )
              </p>
              <h4>⏲️ 1 Day Delivery</h4>
              <p>✔️ Theme Installation</p>
              <p>✔️ 2 Plugins/Extensions</p>
              <Button
                variant="contained"
                color="primary"
                style={{
                  marginTop: "15px",
                  marginBottom: "15px",
                  marginLeft: "180px",
                }}
              >
                Mua
              </Button>
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              <h1>10$</h1>
              <p style={{ marginTop: "15px", marginBottom: "15px" }}>
                Astra Pro + Elementor Pro ( Licensed 1 Website )
              </p>
              <h4>⏲️ 1 Day Delivery</h4>
              <p>✔️ Theme Installation</p>
              <p>✔️ 2 Plugins/Extensions</p>
              <Button
                variant="contained"
                color="primary"
                style={{
                  marginTop: "15px",
                  marginBottom: "15px",
                  marginLeft: "180px",
                }}
              >
                Mua
              </Button>
            </TabPanel>
            <TabPanel value={value} index={2} dir={theme.direction}>
              <h1>20$</h1>
              <p style={{ marginTop: "15px", marginBottom: "15px" }}>
                Astra Pro + Elementor Pro ( Licensed 1 Website )
              </p>
              <h4>⏲️ 1 Day Delivery</h4>
              <p>✔️ Theme Installation</p>
              <p>✔️ 2 Plugins/Extensions</p>
              <Button
                variant="contained"
                color="primary"
                style={{
                  marginTop: "15px",
                  marginBottom: "15px",
                  marginLeft: "180px",
                }}
              >
                Mua
              </Button>
            </TabPanel>
            <TabPanel value={value} index={3} dir={theme.direction}>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="false"
                  name="radio-buttons-group"
                  onChange={handleChangeSelect}
                >
                  <FormControlLabel
                    value="false"
                    control={<Radio />}
                    label="Tùy chọn KHÔNG chia giai đoạn bàn giao"
                  />
                  <FormControlLabel
                    value="true"
                    control={<Radio />}
                    label="Tùy chọn CÓ chia giai đoạn bàn giao"
                  />
                </RadioGroup>
                <Button
                  variant="contained"
                  color="primary"
                  style={{
                    marginTop: "15px",
                    marginBottom: "15px",
                    marginLeft: "180px",
                  }}
                  onClick={handleOpen}
                >
                  Tiếp tục
                </Button>
              </FormControl>
              <Modal
                keepMounted
                open={open}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
              >
                <Box sx={style}>
                  {selected === "false" ? (
                    <>
                      {" "}
                      <Typography
                        id="keep-mounted-modal-title"
                        variant="h6"
                        component="h2"
                        style={{ marginBottom: "15px" }}
                      >
                        Tùy chọn gói dịch vụ
                      </Typography>
                      <TextField
                        id="outlined-basic"
                        label="Sản phẩm bàn giao"
                        variant="outlined"
                        style={{ marginBottom: "15px" }}
                      />
                      <TextField
                        id="outlined-basic"
                        label="Ngày Giao"
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                        type="date"
                        style={{ marginBottom: "15px" }}
                      />
                      <TextField
                        id="outlined-basic"
                        label="Giá"
                        variant="outlined"
                        type="number"
                        style={{ marginBottom: "15px" }}
                      />
                      <Button
                        variant="contained"
                        color="primary"
                        style={{
                          marginTop: "15px",
                          marginBottom: "15px",
                        }}
                      >
                        Xác nhận
                      </Button>{" "}
                    </>
                  ) : (
                    <>
                      <Typography
                        id="keep-mounted-modal-title"
                        variant="h6"
                        component="h2"
                        style={{ marginBottom: "15px" }}
                      >
                        Tùy chọn chia giai đoạn
                      </Typography>
                      <FormControl
                        fullWidth
                        style={{
                          marginBottom: "10px",
                        }}
                      >
                        <InputLabel id="demo-simple-select-label">
                          Chọn số giai Đoạn
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={numberStage}
                          label="Chọn số giai đoạn"
                          onChange={(e) => (
                            setNumberStage(e.target.value),
                            (arr.length = e.target.value),
                            arr.fill(0),
                            setArr(arr)
                          )}
                        >
                          <MenuItem value={2}>2 giai đoạn</MenuItem>
                          <MenuItem value={3}>3 giai đoạn</MenuItem>
                          <MenuItem value={4}>4 giai đoạn</MenuItem>
                          <MenuItem value={5}>5 giai đoạn</MenuItem>
                        </Select>
                      </FormControl>
                      {arr.map((value, index) => (
                        <>
                          <label>Giai đoạn {index + 1}</label>
                          <div style={{ display: "flex" }}>
                            <TextField
                              id="outlined-basic"
                              label="Sản phẩm bàn giao"
                              variant="outlined"
                              style={{ marginBottom: "15px" }}
                            />
                            <TextField
                              id="outlined-basic"
                              label="Ngày Giao"
                              variant="outlined"
                              InputLabelProps={{ shrink: true }}
                              type="date"
                              style={{ marginBottom: "15px" }}
                            />
                            <TextField
                              id="outlined-basic"
                              label="Giá"
                              variant="outlined"
                              type="number"
                              style={{ marginBottom: "15px" }}
                            />
                          </div>
                        </>
                      ))}
                      <Button
                        variant="contained"
                        color="primary"
                        style={{
                          marginTop: "15px",
                          marginBottom: "15px",
                        }}
                      >
                        Xác nhận
                      </Button>{" "}
                    </>
                  )}
                </Box>
              </Modal>
            </TabPanel>
          </SwipeableViews>
        </div>
      </div>
      <div className="sections">
        <Contact />
      </div>
    </div>
  );
}
