import { useState } from "react";
import "./serviceFeature.scss";
import CategoryList from "../categoryList/CategoryList";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectAllCategories } from "../../../redux/categorySlice";
import {
  fetchServicesImpressionByCate,
  selectServicesImpression,
} from "../../../redux/serviceSlice";
import { useEffect } from "react";
export default function ServiceFeature({ search }) {
  const listCategory = useSelector(selectAllCategories);
  const listService = useSelector(selectServicesImpression);
  const [selected, setSelected] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (selected != "") dispatch(fetchServicesImpressionByCate(selected));
  }, [selected]);
  return (
    <div className="guest_service" id="service">
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
      <div className="guest_container">
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
              className="guest_item"
              onClick={() => navigate("/serviceDetail/" + d.id)}
            >
              <img
                src={
                  d.imageGallery1
                    ? d.imageGallery1
                    : "https://img6.thuthuatphanmem.vn/uploads/2022/01/28/anh-ve-co-trang-nu-trung-quoc-dep-nhat_044336041.jpg"
                }
                alt=""
              />
              <div className="guest_absolute">
                <h3>{d.branchName}</h3>
                <h4>{d.title}</h4>
                <h3>{d.fromPrice} $</h3>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
