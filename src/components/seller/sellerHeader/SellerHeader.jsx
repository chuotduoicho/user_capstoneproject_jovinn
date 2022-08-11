import "./sellerHeader.scss";
import {
  NotificationImportantOutlined,
  ChatBubbleOutline,
  AddSharp,
  Delete,
} from "@material-ui/icons";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef, useCallback } from "react";
import { Button, List, ListItem, ListItemSecondaryAction, ListItemText, Popover } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { deleteNotification, fetchNotifications, readNotification, selectNotifications } from "../../../redux/notificationSlice";
export default function SellerHeader({ listNotification }) {

  const [open, setOpen] = useState(false);
  //const listNotification = useSelector(selectNotifications);
  const [notifications, setNotifications] = useState(listNotification.list);
  const [unread, setUnread] = useState(listNotification.unread);
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
  const id = open ? 'simple-popover' : undefined;

  const logOut = useCallback(() => {
    dispatch(logOut());
  }, [dispatch]);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

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

//  const prevOpen = useRef(open);

  // useEffect(() => {
  //   // let eventSource = new EventSource('http://localhost:8080/api/v1/users/recieve-notify');
  //   // eventSource.onmessage = () => {
  //   //   dispatch(fetchNotifications());
  //   //   const updatedNoti = localStorage.getItem("notifications");
  //   //   setNotifications(updatedNoti.list);
  //   //   setUnread(updatedNoti.unread);
  //   // }
  //     dispatch(fetchNotifications());
  //   // setNotifications(listNotification.list);
  //   // setUnread(listNotification.unread);
  //   // console.log("notifications", listNotification);

  //   if (prevOpen.current === true && open === false) {
  //     anchorRef.current.focus();
  //   }

  //   prevOpen.current = open;
  // }, [open]);
  return (
    <div className="sellerHeader ">
      <div className="wrapper">
        <div className="left">
          <a href="/sellerHome" className="logo">
            Jovinn.
          </a>
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
          {/* <div className="item">
            {" "}
            <Link to="/sellerHome/createService">
              <Button variant="contained" color="primary">
                <AddSharp />
                Tạo dịch vụ{" "}
              </Button>{" "}
            </Link>
          </div> */}
          <div className="item">
            <NotificationImportantOutlined className="icon" onClick={handleIconClick} />
            <div className="counter" >{unread}</div>
            <Popover
              id={id}
              open={iconOpen}
              anchorEl={anchorEl}
              onClose={handleIconClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
            >
              <List>
                {
                  notifications.map((item) => (
                    <ListItem
                      button
                      style={item.unread ? { background: '#B9D5E3' } : {}}
                      onClick={() => {
                        dispatch(readNotification(item.id))
                          .unwrap()
                          .then(() => {
                            //dispatch(fetchNotifications());
                            setNotifications(listNotification.list);
                            setUnread(listNotification.unread);
                            navigate(item.link);
                          });
                      }}
                    >
                      <ListItemText
                        primary={item.shortContent}
                        secondary={item.createAt}
                      />
                      <ListItemSecondaryAction>
                        <Delete
                          style={{ color: 'gray' }}
                          onClick={() => {
                            dispatch(deleteNotification(item.id))
                              .unwrap()
                              .then(() => {
                                //dispatch(fetchNotifications());
                                setNotifications(listNotification.list);
                                setUnread(listNotification.unread);
                                setNotifications(
                                  notifications.filter((el) => el.id !== item.id));
                              });
                          }}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))
                }
              </List>
            </Popover>
          </div>
          {/* <div className="item">
            <ChatBubbleOutline className="icon" />
            <div className="counter">2</div>
          </div> */}
          <Button
            ref={anchorRef}
            aria-controls={open ? "menu-list-grow" : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
            className="item"
          >
            <img
              src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="avatar"
            />
          </Button>

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
                      <Link to="/buyerHome" style={{ textDecoration: "none" }}>
                        <MenuItem style={{ color: "black" }}>
                          Trở thành người mua
                        </MenuItem>
                      </Link>

                      <Link
                        to="/buyerhome/wallet"
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
