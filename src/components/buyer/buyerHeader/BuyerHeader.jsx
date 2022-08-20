import "./buyerHeader.scss";
import {
  Delete,
  NotificationImportant,
  NotificationImportantOutlined,
  SearchOutlined,
} from "@material-ui/icons";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef, useCallback } from "react";
import { logout } from "../../../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Popover,
  TextField,
} from "@material-ui/core";
import { fetchCurrentUser, selectCurrentUser } from "../../../redux/userSlice";
import moment from "moment";
import {
  deleteNotification,
  fetchNotifications,
  readNotification,
  selectNotifications,
  selectNumber,
} from "../../../redux/notificationSlice";
export default function BuyerHeader({ search, handleSearch }) {
  const listNotification = useSelector(selectNotifications);
  const list = [...listNotification].sort(
    (a, b) => new Date(b.createAt).getTime() - new Date(a.createAt).getTime()
  );

  const number = useSelector(selectNumber);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleIconClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleIconClose = () => {
    setAnchorEl(null);
  };
  const iconOpen = Boolean(anchorEl);

  const currentUser = useSelector(selectCurrentUser);
  const [open, setOpen] = useState(false);
  const id = open ? "simple-popover" : undefined;
  const [text, setText] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const anchorRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  useEffect(() => {
    dispatch(fetchCurrentUser());
    // setInterval(() => {
    //   dispatch(fetchNotifications());
    // }, 3000);
  }, []);
  const handleJoinSeller = () => {
    if (
      currentUser.phoneNumber == null ||
      currentUser.gender == null ||
      currentUser.birthDate == null ||
      currentUser.city == null ||
      currentUser.country == null
    ) {
      setText("Bạn cần cập nhật đủ thông tin cơ bản để trở thành người bán");
      setOpenDialog(true);
    } else if (currentUser.joinSellingAt) {
      navigate("/sellerHome");
    } else {
      navigate("/sellerHome/sellerTerms");
    }
  };
  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  //  Process UI
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);
  return (
    <div className="buyerHeader ">
      <div className="buyerHeader_wrapper">
        <div className="left">
          <p className="logo" onClick={() => navigate("/buyerHome")}>
            Jovinn.
          </p>
          <TextField
            placeholder="Tìm kiếm dịch vụ ..."
            variant="outlined"
            InputProps={{
              endAdornment: (
                <a>
                  <SearchOutlined
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={handleSearch}
                  />
                </a>
              ),
            }}
            style={{
              width: "500px",
              borderRadius: "4px",
            }}
            onChange={(e) => search(e.target.value)}
            size="small"
          />
        </div>
        <div className="right">
          <div className="item">
            <NotificationImportantOutlined
              className="icon"
              onClick={handleIconClick}
            />
            <div className="counter">{number}</div>
            <Popover
              id={id}
              open={iconOpen}
              anchorEl={anchorEl}
              onClose={handleIconClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
            >
              <List>
                {list.map((item) => (
                  <ListItem
                    button
                    style={item.unread ? { background: "#B9D5E3" } : {}}
                    onClick={() => {
                      dispatch(readNotification(item.id))
                        .unwrap()
                        .then(() => {
                          dispatch(fetchNotifications());
                        });
                      navigate("/sellerHome/" + item.link);
                    }}
                  >
                    <ListItemText
                      primary={item.shortContent}
                      secondary={moment(item.createAt).fromNow()}
                    />
                    <ListItemSecondaryAction>
                      <Delete
                        style={{ color: "gray", cursor: "pointer" }}
                        onClick={() => {
                          dispatch(deleteNotification(item.id))
                            .unwrap()
                            .then(() => {
                              dispatch(fetchNotifications());
                            });
                        }}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </Popover>
          </div>
          <Button
            ref={anchorRef}
            aria-controls={open ? "menu-list-grow" : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
            className="item"
          >
            Xin chào, {currentUser.firstName} {currentUser.lastName}
            <img
              src={
                currentUser.avatar
                  ? currentUser.avatar
                  : "https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              }
              alt=""
              className="avatar"
            />
          </Button>

          {currentUser.joinSellingAt && (
            <button
              className="button_case"
              style={{ color: "black" }}
              onClick={handleJoinSeller}
            >
              <span className="button_switch">Chuyển người bán</span>
            </button>
          )}

          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === "bottom" ? "center top" : "center bottom",
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                      autoFocusItem={open}
                      id="menu-list-grow"
                      onKeyDown={handleListKeyDown}
                    >
                      <Link
                        to="/buyerhome/profile"
                        style={{ textDecoration: "none" }}
                      >
                        <MenuItem style={{ color: "black" }}>
                          Thông tin cá nhân
                        </MenuItem>
                      </Link>

                      {!currentUser.joinSellingAt && (
                        <MenuItem
                          style={{ color: "black" }}
                          onClick={handleJoinSeller}
                        >
                          Trở thành người bán
                        </MenuItem>
                      )}

                      <Link
                        to="/buyerhome/createRequest"
                        style={{ textDecoration: "none" }}
                      >
                        <MenuItem style={{ color: "black" }}>
                          Tạo yêu cầu
                        </MenuItem>
                      </Link>
                      <Link
                        to="/buyerhome/manageRequest"
                        style={{ textDecoration: "none" }}
                      >
                        <MenuItem style={{ color: "black" }}>
                          Quản lí yêu cầu
                        </MenuItem>
                      </Link>
                      <Link
                        to="/buyerhome/manageOrder"
                        style={{ textDecoration: "none" }}
                      >
                        <MenuItem style={{ color: "black" }}>
                          Quản lí đặt hàng
                        </MenuItem>
                      </Link>
                      <Link
                        to="/buyerhome/manageContract"
                        style={{ textDecoration: "none" }}
                      >
                        <MenuItem style={{ color: "black" }}>
                          Quản lí hợp đồng
                        </MenuItem>
                      </Link>

                      <Link
                        to="/buyerhome/manageWallet"
                        style={{ textDecoration: "none" }}
                      >
                        <MenuItem style={{ color: "black" }}>
                          Quản lí ví
                        </MenuItem>
                      </Link>
                      <Link
                        to="/auth/login"
                        style={{ textDecoration: "none" }}
                        onClick={logOut}
                      >
                        <MenuItem style={{ color: "black" }}>
                          Đăng xuất
                        </MenuItem>
                      </Link>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      </div>
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle id="dialod-title">{text}</DialogTitle>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Không</Button>
          <Button
            onClick={() => navigate("/buyerhome/profile")}
            color="primary"
          >
            Đến cập nhật thông tin cơ bản
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
