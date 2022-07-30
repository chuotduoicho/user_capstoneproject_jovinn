import React, { useEffect, useState } from "react";
import Contact from "../../../components/guest/contact/Contact";
import "./sellerManageRequest.scss";
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
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import { Button } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRequestsSeller,
  fetchRequestsSellerByCate,
  selectAllRequests,
} from "../../../redux/requestSlice";
import { selectAllCategories } from "../../../redux/categorySlice";
import SellerHome from "../sellerHome/SellerHome";
import SellerHeader from "../../../components/seller/sellerHeader/SellerHeader";
import CategoryList from "../../../components/guest/categoryList/CategoryList";
import { selectCurrentUser } from "../../../redux/userSlice";

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
    id: "buyerLastname",
    numeric: false,
    disablePadding: false,
    label: "Tên người dùng",
  },
  {
    id: "jobTitle",
    numeric: true,
    disablePadding: false,
    label: "Tiêu đề",
  },
  {
    id: "categoryId",
    numeric: true,
    disablePadding: false,
    label: "Danh mục",
  },
  {
    id: "subcategoryId",
    numeric: true,
    disablePadding: false,
    label: "Danh mục con",
  },
  {
    id: "milestoneContracts",
    numeric: true,
    disablePadding: false,
    label: "Số giai đoạn",
  },
  {
    id: "budget",
    numeric: true,
    disablePadding: false,
    label: "Tổng chi phí (g)",
  },
  {
    id: "contractCancelFee",
    numeric: true,
    disablePadding: false,
    label: "Phí hủy hợp đồng",
  },
  {
    id: "action",
    numeric: true,
    disablePadding: false,
    label: "",
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
        {/* <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all desserts" }}
          />
        </TableCell> */}
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

  return (
    <Toolbar className={clsx(classes.root)}>
      <Typography
        className={classes.title}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Danh sách yêu cầu
      </Typography>

      <Tooltip title="Filter list">
        <IconButton aria-label="filter list">
          {/* <FilterListIcon /> */}
        </IconButton>
      </Tooltip>
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
export default function SellerManageRequest() {
  const listRequest = useSelector(selectAllRequests);
  const listCategories = useSelector(selectAllCategories);
  const { user } = useSelector((state) => state.auth);
  const currentUser = useSelector(selectCurrentUser);
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = useState(listCategories[0].id);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/auth/login");
    } else if (currentUser.joinSellingAt == null) {
      navigate("/errorPage");
    } else {
      // dispatch(fetchServices());

      dispatch(fetchRequestsSellerByCate(selected));
    }
  }, [user, selected]);
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(fetchRequestsSeller());
  // }, []);
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

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, listRequest.length - page * rowsPerPage);

  return (
    <div className="buyer_profile">
      <SellerHeader />
      <ul className="list">
        {listCategories.map((item) => (
          <CategoryList
            title={item.name}
            active={selected === item.id}
            setSelected={setSelected}
            id={item.id}
          />
        ))}
      </ul>
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <EnhancedTableToolbar numSelected={selected.length} />
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
                onRequestSort={handleRequestSort}
                rowCount={listRequest.length}
              />
              <TableBody>
                {stableSort(listRequest, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          // padding="none"
                        >
                          {row.buyerFirstName + " " + row.buyerLastname}
                        </TableCell>
                        <TableCell align="right">{row.jobTitle}</TableCell>
                        <TableCell align="right">
                          {
                            listCategories.find(
                              (cate) => cate.id == row.categoryId
                            ).name
                          }
                        </TableCell>
                        <TableCell align="right">
                          {" "}
                          {
                            listCategories
                              .find((cate) => cate.id == row.categoryId)
                              .subCategories.find(
                                (subCate) => subCate.id == row.subcategoryId
                              ).name
                          }
                        </TableCell>
                        <TableCell align="right">
                          {row.milestoneContracts.length}
                        </TableCell>
                        <TableCell align="right">{row.budget} $</TableCell>
                        <TableCell align="right">
                          {row.contractCancelFee} %
                        </TableCell>{" "}
                        <TableCell align="right">
                          <Link to={row.postRequestId}>
                            <Button variant="outlined" color="primary">
                              Chi tiết
                            </Button>
                          </Link>
                        </TableCell>
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
            count={listRequest.length}
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
      <div className="sections_profile">
        <Contact />
      </div>
    </div>
  );
}
