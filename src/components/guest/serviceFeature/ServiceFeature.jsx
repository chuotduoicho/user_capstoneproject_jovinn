import { useState } from "react";
import "./serviceFeature.scss";
import CategoryList from "../categoryList/CategoryList";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectAllCategories } from "../../../redux/categorySlice";
import {
  fetchServicesImpressionByCate,
  selectServicesImpression,
  fetchTop8BoxesImpression,
  selectTop8Boxes,
} from "../../../redux/serviceSlice";
import { useEffect } from "react";

export default function ServiceFeature({ search, selected, setSelected }) {
  const listCategory = useSelector(selectAllCategories);
  const listService = useSelector(selectServicesImpression);
  const listTop8Boxes = useSelector(selectTop8Boxes);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (selected != "") dispatch(fetchServicesImpressionByCate(selected));
  }, [selected]);

  console.log(listTop8Boxes);

  return (
    <div className="guest_service" id="service">
      <h1>DỊCH VỤ NỔI BẬT CỦA JOVINN</h1>
        <div className="guest_container">
          {listTop8Boxes.map((d) => (
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
      <h1>DỊCH VỤ NỔI BẬT THEO LĨNH VỰC</h1>
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
        {listService.slice(0, 8).map((d) => (
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
      <div className="explain">
        <div className="container_1">
          <div className="image-left">
              <img
                src={
                  "https://static.vecteezy.com/system/resources/previews/002/868/199/non_2x/hand-drawn-freelancing-set-doodle-background-free-vector.jpg"
                }
                className="image_1"
              />
          </div>
          <div className="quotes-right">
            <p>Đăng dự án không mất phí,
                Tiếp cận ngay chuyên gia
                Bạn sẽ nhanh chóng nhận được chào giá từ cộng đồng +400.000 Freelancer/Cộng tác viên. Chủ động phỏng vấn các ứng viên thông qua hệ thống tin nhắn trực tuyến để tìm người phù hợp nhất với yêu cầu của bạn.</p>
          </div>
        </div>
        <div className="container_2">
          <div className="quotes-right">
            <p>Đăng dự án không mất phí,
                Tiếp cận ngay chuyên gia
                Bạn sẽ nhanh chóng nhận được chào giá từ cộng đồng +400.000 Freelancer/Cộng tác viên. Chủ động phỏng vấn các ứng viên thông qua hệ thống tin nhắn trực tuyến để tìm người phù hợp nhất với yêu cầu của bạn.</p>
          </div>
          <div className="image-left">
              <img
                src={
                  "https://static.vecteezy.com/system/resources/previews/002/868/199/non_2x/hand-drawn-freelancing-set-doodle-background-free-vector.jpg"
                }
                className="image_1"
              />
          </div>
        </div>
      </div>
    </div>
  );
}
