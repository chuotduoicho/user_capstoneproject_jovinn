import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCategories } from "../../../redux/categorySlice";
import "./categoryList.scss";

export default function CategoryList({ id, title, active, setSelected }) {
  return (
    <li
      className={active ? "portfolioList active" : "portfolioList"}
      onClick={() => setSelected(id)}
    >
      {title}
    </li>
  );
}
