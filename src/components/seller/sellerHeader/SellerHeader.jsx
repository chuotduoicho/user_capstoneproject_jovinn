import "./sellerHeader.scss";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef, useCallback } from "react";
import { logout } from "../../../redux/authSlice";
import {
  Button,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  List,
  Popover,
  TextField,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser, selectCurrentUser } from "../../../redux/userSlice";
import {
  Delete,
  NotificationImportantOutlined,
  SearchOutlined,
} from "@material-ui/icons";
import {
  deleteNotification,
  fetchNotifications,
  readNotification,
  selectNotifications,
  selectNumber,
} from "../../../redux/notificationSlice";
import moment from "moment";
export default function SellerHeader({ search, handleSearch }) {
  const listNotification = useSelector(selectNotifications);
  const list = [...listNotification].sort(
    (a, b) => new Date(b.createAt).getTime() - new Date(a.createAt).getTime()
  );

  const number = useSelector(selectNumber);
  const currentUser = useSelector(selectCurrentUser);
  const [open, setOpen] = useState(false);
  // const [unread, setUnread] = useState(listNotification.unread);
  const anchorRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const handleIconClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleIconClose = () => {
    setAnchorEl(null);
  };
  const iconOpen = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  useEffect(() => {
    dispatch(fetchCurrentUser());
    setInterval(() => {
      dispatch(fetchNotifications());
    }, 3000);
  }, []);

  // const handleLogout = (event) => {
  //   e.preventDefault();
  //   navigate("/login");
  // };
  // const handleSwitch = (event) => {
  //   e.preventDefault();
  //   navigate("/sellerHome");
  // };
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
    <div className="sellerHeader ">
      <div className="wrapper">
        <div className="left">
          <p className="logo" onClick={() => navigate("/sellerHome")}>
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
              width: "400px",
              borderRadius: "4px",
            }}
            onChange={(e) => search(e.target.value)}
            size="small"
          />
          <ButtonGroup
            variant="text"
            color="primary"
            aria-label="text primary button group"
            className="btn_group"
          >
            <Link to="/sellerHome/manageRequest">
              <Button>Yêu cầu</Button>
            </Link>
            <Link to="/sellerHome/manageOrder">
              <Button>Đơn đặt hàng</Button>
            </Link>
            <Link to="/sellerHome/manageOffer">
              <Button>Đề nghị</Button>
            </Link>

            <Link to="/sellerHome/manageContract">
              <Button>Hợp đồng</Button>
            </Link>

            {/* <Button>Ví</Button> */}
          </ButtonGroup>
          {/* </div> */}
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

          <Link
            className="button_case"
            to="/buyerHome"
            style={{ textDecoration: "none" }}
          >
            <span className="button_switch">Chuyển người mua</span>
          </Link>

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
                        to="/sellerHome/profile"
                        style={{ textDecoration: "none" }}
                      >
                        <MenuItem style={{ color: "black" }}>
                          Thông tin cá nhân
                        </MenuItem>
                      </Link>

                      {/* <Link to="/buyerHome" style={{ textDecoration: "none" }}>
                        <MenuItem style={{ color: "black" }}>
                          Trở thành người mua
                        </MenuItem>
                      </Link> */}

                      <Link
                        to="/sellerHome/manageWallet"
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
    </div>
  );
}
