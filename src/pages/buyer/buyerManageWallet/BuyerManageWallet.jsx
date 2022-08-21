import React, { useEffect, useState } from "react";
import Contact from "../../../components/guest/contact/Contact";
import "./buyerManageWallet.scss";
import BuyerHeader from "../../../components/buyer/buyerHeader/BuyerHeader";
import PropTypes from "prop-types";
import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  TextField,
} from "@material-ui/core";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AccountBalanceWallet, ArrowUpward } from "@material-ui/icons";
import Checkout from "../../../components/payment/Checkout";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchWallet,
  selectWallet,
  selectWalletTransactions,
  topup,
  topupSuccess,
  withdraw,
  withdrawAddress,
} from "../../../redux/userSlice";
import { clearMessage } from "../../../redux/message";
import SellerHeader from "../../../components/seller/sellerHeader/SellerHeader";
import { toast, ToastContainer } from "react-toastify";
import { green } from "@material-ui/core/colors";
function createData(description, subCate, skills, price, cancleFee) {
  return { description, subCate, skills, price, cancleFee };
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "paymentCode",
    numeric: false,
    disablePadding: false,
    label: "Mã giao dịch",
  },
  {
    id: "amount",
    numeric: true,
    disablePadding: false,
    label: "Số tiền giao dịch",
  },
  {
    id: "type",
    numeric: true,
    disablePadding: false,
    label: "Hình thức",
  },
  {
    id: "createAt",
    numeric: true,
    disablePadding: false,
    label: "Thời gian",
  },
];

function EnhancedTableHead(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;
  const { handleOpenPayment } = props;
  const { handleOpenWithDraw } = props;
  const { handleOpenWithDraw2 } = props;
  const { price } = props;
  const { income } = props;
  const { address } = props;
  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <>
          <Typography
            className={classes.title}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Danh sách giao dịch
          </Typography>
          <Typography
            className={classes.title}
            variant="h4"
            id="tableTitle"
            component="div"
          >
            <AccountBalanceWallet />
            &nbsp; {price} $ <ArrowUpward /> {income} $
          </Typography>
        </>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Thực hiện với Paypal">
          <IconButton aria-label="filter list">
            <ButtonGroup variant="outlined" aria-label="outlined button group">
              <Button onClick={handleOpenPayment}>Nạp tiền</Button>
              <Button onClick={handleOpenWithDraw}>Rút tiền</Button>
              {address && (
                <Button onClick={handleOpenWithDraw2}>Địa chỉ rút tiền</Button>
              )}
            </ButtonGroup>
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "95%",
    margin: "0 auto",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));
export default function BuyerManageWallet() {
  const wallet = useSelector(selectWallet);
  const list = useSelector(selectWalletTransactions);
  const [search, setSearch] = useState("");
  const rows = list.filter((val) => val.description.includes(search));
  const param = useLocation().search;
  console.log(wallet);
  const { message } = useSelector((state) => state.message);

  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [openPayment, setOpenPayment] = useState(false);
  const [openPayment2, setOpenPayment2] = useState(false);
  const [openWithDraw, setOpenWithDraw] = useState(false);
  const [openWithDraw2, setOpenWithDraw2] = useState(false);
  const [addressWithdraw, setAddresswithdraw] = useState(
    wallet.withdrawAddress ? wallet.withdrawAddress : ""
  );
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [price, setPrice] = useState(wallet.withdraw);

  console.log(rows);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.pathname);
  const handleOpenPayment2 = (e) => {
    // e.preventDefault();
    const obj = { charge: price, currency: "USD" };
    dispatch(topup(obj))
      .unwrap()
      .then(() => {
        setOpenPayment(false);
      })
      .catch(() => {
        setError("thất bại!");
      });
  };
  const addWithdrawAdress = (e) => {
    // e.preventDefault();
    const obj = { withdrawAddress: addressWithdraw };
    dispatch(withdrawAddress(obj))
      .unwrap()
      .then(() => {
        setOpenWithDraw(false);
        setOpenWithDraw2(false);
        dispatch(fetchWallet());
        toast.success("Thêm địa chỉ rút tiền thành công !");
      })
      .catch(() => {
        setOpenWithDraw(false);
        setOpenWithDraw2(false);
        toast.error("Thêm địa chỉ rút tiền thất bại !");
      });
  };
  const withdrawMoney = (e) => {
    // e.preventDefault();
    const obj = { charge: price, currency: "USD" };
    dispatch(withdraw(obj))
      .unwrap()
      .then(() => {
        setOpenWithDraw(false);
        setOpenWithDraw2(false);
        dispatch(fetchWallet());
        toast.success("Rút tiền thành công !");
      })
      .catch(() => {
        setOpenWithDraw(false);
        setOpenWithDraw2(false);
        toast.error("Rút tiền thất bại !");
      });
  };
  const handleOpenPayment = () => {
    setOpenPayment(true);
  };
  const handleOpenWithDraw = () => {
    setOpenWithDraw(true);
  };
  const handleOpenWithDraw2 = () => {
    setOpenWithDraw2(true);
  };
  const handleClosePayment = () => {
    setOpenPayment(false);
  };
  const handleClosePayment2 = () => {
    setOpenPayment2(false);
  };
  const handleCloseWithDraw2 = () => {
    setOpenWithDraw2(false);
  };
  const handleCloseWithDraw = () => {
    setOpenWithDraw(false);
  };
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  // const handleClick = (event, name) => {
  //   const selectedIndex = selected.indexOf(name);
  //   let newSelected = [];

  //   if (selectedIndex === -1) {
  //     newSelected = newSelected.concat(selected, name);
  //   } else if (selectedIndex === 0) {
  //     newSelected = newSelected.concat(selected.slice(1));
  //   } else if (selectedIndex === selected.length - 1) {
  //     newSelected = newSelected.concat(selected.slice(0, -1));
  //   } else if (selectedIndex > 0) {
  //     newSelected = newSelected.concat(
  //       selected.slice(0, selectedIndex),
  //       selected.slice(selectedIndex + 1)
  //     );
  //   }

  //   setSelected(newSelected);
  // };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  useEffect(() => {
    dispatch(clearMessage());
    if (message) navigate(`//${message.slice(8)}`);
  }, [dispatch, message]);
  // useEffect(() => {
  //   if (message) navigate(`//${message.slice(8)}`);
  // }, [message]);
  useEffect(() => {
    dispatch(fetchWallet());
    if (param) {
      dispatch(topupSuccess(param))
        .unwrap()
        .then(() => {
          dispatch(fetchWallet());
          toast.success("Nạp tiền thành công!");
        })
        .catch(() => {
          toast.error("Nạp tiền thất bại!");
        });
    }
  }, []);
  return (
    <div className="buyer_profile">
      {location.pathname == "/buyerhome/manageWallet" ? (
        <BuyerHeader search={setSearch} />
      ) : (
        <SellerHeader search={setSearch} />
      )}

      <h1 className="wallet_title">Quản lý ví</h1>
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <EnhancedTableToolbar
            numSelected={selected.length}
            handleOpenPayment={handleOpenPayment}
            handleOpenWithDraw={handleOpenWithDraw}
            handleOpenWithDraw2={handleOpenWithDraw2}
            price={wallet.withdraw}
            income={wallet.income}
            address={wallet.withdrawAddress}
          />
          <TableContainer>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
              aria-label="enhanced table"
            >
              <EnhancedTableHead
                classes={classes}
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.name);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.name}
                        selected={isItemSelected}
                      >
                        <TableCell component="th" id={labelId} scope="row">
                          {row.paymentCode}
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{
                            color:
                              row.type == "WITHDRAW" ? "#ff0000" : "#50dc35",
                          }}
                        >
                          {row.type == "CHARGE" ? "+" : "-"} {row.amount}$
                        </TableCell>
                        <TableCell align="right">
                          {row.method == "paypal" ? "Paypal" : "Other"}
                        </TableCell>
                        <TableCell align="right">{row.createAt}</TableCell>{" "}
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="Dày đặc"
        />
      </div>
      <Dialog
        fullWidth="true"
        maxWidth="sm"
        open={openPayment2}
        onClose={handleClosePayment2}
        aria-labelledby="max-width-dialog-title"
      >
        {" "}
        <DialogTitle id="max-width-dialog-title">
          Hình thức nạp tiền
        </DialogTitle>
        <DialogContent>
          <Checkout description={"Nạp tiền vào ví"} price={price} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePayment2} color="primary">
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        fullWidth="true"
        maxWidth="xs"
        open={openPayment}
        onClose={handleClosePayment}
        aria-labelledby="max-width-dialog-title"
      >
        {" "}
        <DialogTitle id="max-width-dialog-title">Nhập số tiền</DialogTitle>
        <DialogContent>
          <TextField
            id="outlined-basic"
            variant="outlined"
            type="number"
            label="Số tiền"
            InputProps={{
              inputProps: { min: 0 },
              endAdornment: <InputAdornment position="end">$</InputAdornment>,
            }}
            style={{ width: "100%" }}
            onChange={(e) => setPrice(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleOpenPayment2}
            color="primary"
            variant="contained"
          >
            Nạp
          </Button>
          <Button onClick={handleClosePayment} color="primary">
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        fullWidth="true"
        maxWidth="sm"
        open={openPayment2}
        onClose={handleClosePayment2}
        aria-labelledby="max-width-dialog-title"
      >
        {" "}
        <DialogTitle id="max-width-dialog-title">
          Hình thức nạp tiền
        </DialogTitle>
        <DialogContent>
          <Checkout description={"Nạp tiền vào ví"} price={price} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePayment2} color="primary">
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        fullWidth="true"
        maxWidth="xs"
        open={openWithDraw}
        onClose={handleCloseWithDraw}
        aria-labelledby="max-width-dialog-title"
      >
        {" "}
        <DialogTitle id="max-width-dialog-title">
          {wallet.withdrawAddress ? "Nhập số tiền rút" : "Tạo địa chỉ rút tiền"}
        </DialogTitle>
        <ul className="rules-withdraw">
          <li>Số tiền rút cần nhỏ hơn số tiền hiện tại và phải lớn hơn 0</li>
          <li>
            Hệ thống sẽ chi trả vào ngày cuối tháng vào tài khoản:{" "}
            {addressWithdraw}
          </li>
          <li>
            Hãy chắc chắn rằng địa chỉ rút của bạn là chính xác, vì nó có thể
            ảnh hưởng tới số tiền mà bạn nhận được
          </li>
        </ul>
        <DialogContent>
          {!wallet.withdrawAddress ? (
            <TextField
              id="outlined-basic"
              variant="outlined"
              type="text"
              label="Nhập địa chỉ"
              style={{ width: "100%" }}
              onChange={(e) => setAddresswithdraw(e.target.value)}
            />
          ) : (
            <TextField
              id="outlined-basic"
              variant="outlined"
              type="number"
              label="Số tiền"
              InputProps={{
                inputProps: { min: 0 },
                endAdornment: <InputAdornment position="end">$</InputAdornment>,
              }}
              style={{ width: "100%" }}
              onChange={(e) => setPrice(e.target.value)}
            />
          )}
        </DialogContent>
        <DialogActions>
          {wallet.withdrawAddress ? (
            <Button onClick={withdrawMoney} color="primary" variant="contained">
              Rút
            </Button>
          ) : (
            <Button
              onClick={addWithdrawAdress}
              color="primary"
              variant="contained"
            >
              Tạo
            </Button>
          )}

          <Button onClick={handleCloseWithDraw} color="default">
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        fullWidth="true"
        maxWidth="xs"
        open={openWithDraw2}
        onClose={handleCloseWithDraw2}
        aria-labelledby="max-width-dialog-title"
      >
        {" "}
        <DialogTitle id="max-width-dialog-title">
          Sửa thông tin rút tiền
        </DialogTitle>
        <DialogContent>
          <ul className="rules-add">
            <li>Hãy chắc chắn thông tin địa chỉ rút tiền của bạn là đúng</li>
            <li>
              Địa chỉ rút tiền là account mà bạn dùng để đăng nhập vào hệ thống
              của Paypal
            </li>
            <li>
              Chúng tôi sẽ duyệt số tiền của bạn thông qua địa chỉ ví Paypal của
              bạn vào ngày cuối tháng
            </li>
          </ul>
          <TextField
            id="outlined-basic"
            variant="outlined"
            type="text"
            label="Địa chỉ rút tiền"
            value={addressWithdraw}
            style={{ width: "100%" }}
            onChange={(e) => setAddresswithdraw(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={addWithdrawAdress}
            color="primary"
            variant="contained"
          >
            Cập nhật
          </Button>
          <Button onClick={handleCloseWithDraw2} color="default">
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer limit={3000} position="bottom-right" />
      <div className="sections_profile">
        <Contact />
      </div>
    </div>
  );
}
