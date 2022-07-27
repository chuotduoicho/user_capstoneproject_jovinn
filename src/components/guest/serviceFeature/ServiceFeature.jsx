import { useState } from "react";
import "./serviceFeature.scss";
import CategoryList from "../categoryList/CategoryList";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectAllCategories } from "../../../redux/categorySlice";
import {
  fetchServicesByCategory,
  selectAllServices,
} from "../../../redux/serviceSlice";
import { useEffect } from "react";
export default function ServiceFeature({ search }) {
  const listCategory = useSelector(selectAllCategories);
  const listService = useSelector(selectAllServices);
  const [selected, setSelected] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (selected != "") dispatch(fetchServicesByCategory(selected));
  }, [selected]);
  return (
    <div className="portfolio" id="service">
      <h1>DỊCH VỤ NỔI BẬT</h1>
      <ul>
        {listCategory.map((item) => (
          <CategoryList
            title={item.name}
            active={selected === item.id}
            setSelected={setSelected}
            id={item.id}
          />
        ))}
      </ul>
      <div className="container">
        {listService
          .filter((val) => {
            if (search === "") {
              return val;
            } else if (
              search !== "" &&
              (val.title.toLowerCase().includes(search.toLowerCase()) ||
                val.description.toLowerCase().includes(search.toLowerCase()))
            ) {
              return val;
            }
          })
          .slice(0, 8)
          .map((d) => (
            <div
              className="item"
              onClick={() => navigate("/serviceDetail/" + d.id)}
            >
              <img
                src={
                  d.gallery.imageGallery1
                    ? d.gallery.imageGallery1
                    : "https://img6.thuthuatphanmem.vn/uploads/2022/01/28/anh-ve-co-trang-nu-trung-quoc-dep-nhat_044336041.jpg"
                }
                alt=""
              />
              <div className="absolute">
                {" "}
                <h3>{d.title}</h3>
                <h4>{d.description}</h4>
                <h3>{d.packages[0].price} $</h3>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
