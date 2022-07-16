import { useState } from "react";
import "./serviceFeature.scss";
import CategoryList from "../categoryList/CategoryList";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAllCategories } from "../../../redux/categorySlice";
import { selectAllServices } from "../../../redux/serviceSlice";
export default function ServiceFeature() {
  // const [id, setId] = useState(null);
  const listCategory = useSelector(selectAllCategories);
  const listService = useSelector(selectAllServices);
  const [selected, setSelected] = useState("cat1");
  const navigate = useNavigate();

  return (
    <div className="portfolio" id="portfolio">
      <h1>DỊCH VỤ NỔI BẬT</h1>
      <ul>
        {listCategory.slice(0, 5).map((item) => (
          <CategoryList
            title={item.name}
            active={selected === item.id}
            setSelected={setSelected}
            id={item.id}
          />
        ))}
      </ul>
      <div className="container">
        {listService.slice(0, 8).map((d) => (
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
