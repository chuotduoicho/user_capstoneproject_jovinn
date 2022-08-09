import React, { useState, useEffect } from "react";
import Topseller from "../../../components/guest/topseller/Topseller";
import Contact from "../../../components/guest/contact/Contact";
import ServiceList from "../../../components/guest/serviceList/ServiceList";
import "./buyerHome.scss";
import BuyerHeader from "../../../components/buyer/buyerHeader/BuyerHeader";
import { FilterListOutlined } from "@material-ui/icons";
import CategoryList from "../../../components/guest/categoryList/CategoryList";
import {
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectAllCategories } from "../../../redux/categorySlice";
import { fetchServices, selectAllServices } from "../../../redux/serviceSlice";
import Pagination from "@material-ui/lab/Pagination";
import Rating from "@material-ui/lab/Rating";
import {
  fetchCurrentUser,
  fetchTopSellers,
  fetchWallet,
  selectCurrentUser,
} from "../../../redux/userSlice";
import { fetchRequestsBuyer } from "../../../redux/requestSlice";
export default function BuyerHome() {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const listCategory = useSelector(selectAllCategories);
  const listService = useSelector(selectAllServices);
  const currentUser = useSelector(selectCurrentUser);
  console.log("currnet", currentUser);
  const [selected, setSelected] = useState(listCategory[0].id);
  const [search, setSearch] = useState("");
  const [subCateId, setSubCateId] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [rating, setRating] = useState(0);
  const [subCateIdFil, setSubCateIdFil] = useState("");
  const [minPriceFil, setMinPriceFil] = useState("");
  const [maxPriceFil, setMaxPriceFil] = useState("");
  const [ratingFil, setRatingFil] = useState(0);
  const [page, setPage] = useState(1);
  const [list, setList] = useState(
    listService.content ? listService.content : []
  );
  console.log("search", search);
  console.log("listService", listService);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      navigate("/auth/login");
    } else {
      dispatch(fetchTopSellers());
      dispatch(fetchCurrentUser());
      const obj = {
        categoryId: selected,
        page: page,
      };
      dispatch(fetchServices(obj));
      dispatch(fetchRequestsBuyer());
      dispatch(fetchWallet());
      setList(listService.content);
    }
  }, [user]);

  useEffect(
    (e) => {
      setSubCateId("");
      setPage(1);
      const obj = {
        categoryId: selected,
        page: page,
        subCategoryId: subCateId,
      };
      dispatch(fetchServices(obj));
    },
    [selected]
  );
  useEffect(
    (e) => {
      setPage(1);
      const obj = {
        categoryId: selected,
        page: page,
        subCategoryId: subCateId,
      };
      dispatch(fetchServices(obj));
    },
    [subCateId]
  );
  const handleChange = (e, p) => {
    console.log(p);
    setPage(p);
  };

  const handleSetfilter = (e) => {
    setSubCateIdFil(subCateId);
    setMinPriceFil(minPrice);
    setMaxPriceFil(maxPrice);
    setRatingFil(rating);
    setPage(1);
    if (!search) {
      const obj = {
        categoryId: selected,
        page: page,
        subCategoryId: subCateId,
      };
      dispatch(fetchServices(obj));
    } else {
    }
  };
  return (
    <div className="buyerHome">
      <BuyerHeader search={setSearch} />

      <div className="buyerHome_form">
        <div className="buyerHome_left">
          <div className="listSearch">
            <h1 className="lsTitle">
              Lọc dịch vụ
              <FilterListOutlined />
            </h1>
            <div className="lsItem">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Danh mục</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={subCateId}
                  label="Age"
                  onChange={(e) => setSubCateId(e.target.value)}
                >
                  {listCategory
                    .find((val) => {
                      return val.id == selected;
                    })
                    .subCategories.map((item) => (
                      <MenuItem value={item.id}>{item.name}</MenuItem>
                    ))}
                </Select>
              </FormControl>
            </div>
            <div className="lsItem">
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Giá thấp nhất <small>($)</small>:
                  </span>
                  <input
                    type="number"
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="lsOptionInput"
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Giá cao nhất <small>($)</small>:
                  </span>
                  <input
                    type="number"
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="lsOptionInput"
                  />
                </div>
                <label>Đánh giá</label>
                <div className="lsOptionItem">
                  <Rating
                    name="pristine"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                  />
                </div>
                <div className="lsOptionItem">
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleSetfilter}
                  >
                    Lọc
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="buyerHome_right">
          <ul className="list">
            {listCategory.slice(0, 7).map((item) => (
              <CategoryList
                title={item.name}
                active={selected === item.id}
                setSelected={setSelected}
                id={item.id}
              />
            ))}
          </ul>

          <div className="serviceList" id="intro">
            <Container className="service_cardGrid" maxWidth="md">
              <Grid container spacing={4}>
                {list.map((item) => (
                  <ServiceList
                    className="service"
                    id={item.id}
                    image={item.imageGallery1}
                    title={item.title}
                    sellerId={item.sellerId}
                    description={item.branchName}
                    rating={item.ratingPoint}
                    price={item.fromPrice}
                    status={item.status}
                    firstName={item.firstName}
                    lastName={item.lastName}
                    avatar={item.avatar}
                  />
                ))}
              </Grid>
              <Pagination
                count={listService.totalPages}
                color="primary"
                className="service_pagging"
                page={page}
                onChange={handleChange}
              />
            </Container>
          </div>
        </div>
      </div>
      <div className="sections">
        <Topseller />
        <Contact />
      </div>
    </div>
  );
}
