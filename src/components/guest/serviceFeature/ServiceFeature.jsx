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
export default function ServiceFeature({ search, selected, setSelected }) {
  const listCategory = useSelector(selectAllCategories);
  const listService = useSelector(selectServicesImpression);
  const [listC, setListC] = useState([]);
  const [listS, setListS] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (selected != "") dispatch(fetchServicesImpressionByCate(selected));
  }, [selected]);
  useEffect(() => {
    setListC(listCategory);
  }, [listCategory]);
  useEffect(() => {
    setListS(listService);
  }, [listService]);

  return (
    <div className="guest_service" id="service">
      <h1>DỊCH VỤ NỔI BẬT</h1>
      <ul>
        {listC.map((item) => (
          <CategoryList
            title={item.name}
            active={selected === item.id}
            setSelected={setSelected}
            id={item.id}
          />
        ))}
      </ul>
      <div className="guest_container">
        {listS.slice(0, 8).map((d) => (
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
              <h3>{d.fromPrice.toLocaleString()}$</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
