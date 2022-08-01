import React, { useState, useEffect } from "react";
import Topseller from "../../../components/guest/topseller/Topseller";
import Contact from "../../../components/guest/contact/Contact";
import ServiceList from "../../../components/guest/serviceList/ServiceList";
import "./buyerHome.scss";
import BuyerHeader from "../../../components/buyer/buyerHeader/BuyerHeader";
import { FilterListOutlined } from "@material-ui/icons";
import CategoryList from "../../../components/guest/categoryList/CategoryList";
import {
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchCategories,
  selectAllCategories,
} from "../../../redux/categorySlice";
import {
  fetchServicesByCategory,
  selectAllServices,
} from "../../../redux/serviceSlice";
import Pagination from "@material-ui/lab/Pagination";
import Rating from "@material-ui/lab/Rating";
import {
  fetchCurrentUser,
  fetchTopSellers,
  fetchWallet,
  selectCurrentUser,
} from "../../../redux/userSlice";
import usePagination from "../../../Pagination";
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
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [rating, setRating] = useState(2);
  console.log("search", search);
  console.log("listCategory", listCategory);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      navigate("/auth/login");
    } else {
      dispatch(fetchCategories());
      dispatch(fetchTopSellers());
      dispatch(fetchCurrentUser());
      dispatch(fetchServicesByCategory(selected));
      dispatch(fetchRequestsBuyer());
      dispatch(fetchWallet());
    }
  }, [user]);

  useEffect(() => {
    setSubCateId("");
    dispatch(fetchServicesByCategory(selected));
  }, [selected]);
  const [subCateId, setSubCateId] = useState("");

  const handleChangeSubcate = (event) => {
    setSubCateId(event.target.value);
  };
  console.log("sub id", subCateId);
  console.log(listService);

  //pagination
  let [page, setPage] = useState(1);
  const PER_PAGE = 6;
  const listServiceFilter = listService.filter((val) => {
    if (
      search === "" &&
      subCateId === "" &&
      minPrice === "" &&
      maxPrice === "" &&
      val.status === "ACTIVE"
    ) {
      return val;
    } else if (
      val.status === "ACTIVE" &&
      search !== "" &&
      subCateId === "" &&
      minPrice === "" &&
      maxPrice === "" &&
      (val.title.toLowerCase().includes(search.toLowerCase()) ||
        val.description.toLowerCase().includes(search.toLowerCase()))
    ) {
      return val;
    } else if (
      val.status === "ACTIVE" &&
      search === "" &&
      subCateId !== "" &&
      minPrice === "" &&
      maxPrice === "" &&
      val.subcategory.id.toLowerCase().includes(subCateId.toLowerCase())
    ) {
      return val;
    } else if (
      val.status === "ACTIVE" &&
      search !== "" &&
      subCateId !== "" &&
      minPrice === "" &&
      maxPrice === "" &&
      val.subcategory.id.toLowerCase().includes(subCateId.toLowerCase()) &&
      (val.title.toLowerCase().includes(search.toLowerCase()) ||
        val.description.toLowerCase().includes(search.toLowerCase()))
    ) {
      return val;
    } else if (
      search === "" &&
      subCateId === "" &&
      minPrice !== "" &&
      maxPrice === "" &&
      val.status === "ACTIVE" &&
      val.packages[0].price >= minPrice
    ) {
      return val;
    } else if (
      val.status === "ACTIVE" &&
      search !== "" &&
      subCateId === "" &&
      minPrice !== "" &&
      maxPrice === "" &&
      (val.title.toLowerCase().includes(search.toLowerCase()) ||
        val.description.toLowerCase().includes(search.toLowerCase())) &&
      val.packages[0].price >= minPrice
    ) {
      return val;
    } else if (
      val.status === "ACTIVE" &&
      search === "" &&
      subCateId !== "" &&
      minPrice !== "" &&
      maxPrice === "" &&
      val.subcategory.id.toLowerCase().includes(subCateId.toLowerCase()) &&
      val.packages[0].price >= minPrice
    ) {
      return val;
    } else if (
      val.status === "ACTIVE" &&
      search !== "" &&
      subCateId !== "" &&
      minPrice !== "" &&
      maxPrice === "" &&
      val.subcategory.id.toLowerCase().includes(subCateId.toLowerCase()) &&
      (val.title.toLowerCase().includes(search.toLowerCase()) ||
        val.description.toLowerCase().includes(search.toLowerCase())) &&
      val.packages[0].price >= minPrice
    ) {
      return val;
    } else if (
      search === "" &&
      subCateId === "" &&
      minPrice === "" &&
      maxPrice !== "" &&
      val.status === "ACTIVE" &&
      val.packages[0].price <= maxPrice
    ) {
      return val;
    } else if (
      val.status === "ACTIVE" &&
      search !== "" &&
      subCateId === "" &&
      minPrice === "" &&
      maxPrice !== "" &&
      (val.title.toLowerCase().includes(search.toLowerCase()) ||
        val.description.toLowerCase().includes(search.toLowerCase())) &&
      val.packages[0].price <= maxPrice
    ) {
      return val;
    } else if (
      val.status === "ACTIVE" &&
      search === "" &&
      subCateId !== "" &&
      minPrice === "" &&
      maxPrice !== "" &&
      val.subcategory.id.toLowerCase().includes(subCateId.toLowerCase()) &&
      val.packages[0].price <= maxPrice
    ) {
      return val;
    } else if (
      val.status === "ACTIVE" &&
      search !== "" &&
      subCateId !== "" &&
      minPrice === "" &&
      maxPrice !== "" &&
      val.subcategory.id.toLowerCase().includes(subCateId.toLowerCase()) &&
      (val.title.toLowerCase().includes(search.toLowerCase()) ||
        val.description.toLowerCase().includes(search.toLowerCase())) &&
      val.packages[0].price <= maxPrice
    ) {
      return val;
    } else if (
      search === "" &&
      subCateId === "" &&
      minPrice !== "" &&
      maxPrice !== "" &&
      val.status === "ACTIVE" &&
      val.packages[0].price >= minPrice &&
      val.packages[0].price <= maxPrice
    ) {
      return val;
    } else if (
      val.status === "ACTIVE" &&
      search !== "" &&
      subCateId === "" &&
      minPrice !== "" &&
      maxPrice !== "" &&
      (val.title.toLowerCase().includes(search.toLowerCase()) ||
        val.description.toLowerCase().includes(search.toLowerCase())) &&
      val.packages[0].price >= minPrice &&
      val.packages[0].price <= maxPrice
    ) {
      return val;
    } else if (
      val.status === "ACTIVE" &&
      search === "" &&
      subCateId !== "" &&
      minPrice !== "" &&
      maxPrice !== "" &&
      val.subcategory.id.toLowerCase().includes(subCateId.toLowerCase()) &&
      val.packages[0].price >= minPrice &&
      val.packages[0].price <= maxPrice
    ) {
      return val;
    } else if (
      val.status === "ACTIVE" &&
      search !== "" &&
      subCateId !== "" &&
      minPrice !== "" &&
      maxPrice !== "" &&
      val.subcategory.id.toLowerCase().includes(subCateId.toLowerCase()) &&
      (val.title.toLowerCase().includes(search.toLowerCase()) ||
        val.description.toLowerCase().includes(search.toLowerCase())) &&
      val.packages[0].price >= minPrice &&
      val.packages[0].price <= maxPrice
    ) {
      return val;
    }
  });
  const count = Math.ceil(listServiceFilter.length / PER_PAGE);
  const _DATA = usePagination(listServiceFilter, PER_PAGE);
  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
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
                  onChange={handleChangeSubcate}
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
              </div>
              {/* <button onClick={handleClick}>Search</button> */}
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
          {/* <div className="sort">Sắp xếp theo:</div> */}
          <div className="serviceList" id="intro">
            <Container className="service_cardGrid" maxWidth="md">
              {/* End hero unit */}
              <Grid container spacing={4}>
                {_DATA
                  .currentData()
                  // .slice(0, 6)
                  .map((item) => (
                    <ServiceList
                      className="service"
                      id={item.id}
                      image={item.gallery.imageGallery1}
                      title={item.title}
                      sellerId={item.sellerId}
                      description={item.description}
                      rating={item.impression}
                      price={item.packages[0].price}
                      status={item.status}
                      firstName={item.firstName}
                      lastName={item.lastName}
                      avatar={item.avatar}
                    />
                  ))}
              </Grid>
              <Pagination
                count={count}
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
