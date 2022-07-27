import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectTopSellers } from "../../../redux/userSlice";
import "./topseller.scss";

export default function Topseller() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const topSellers = useSelector(selectTopSellers);
  console.log("top seller", topSellers);

  const handleClick = (way) => {
    way === "left"
      ? setCurrentSlide(currentSlide > 0 ? currentSlide - 1 : 2)
      : setCurrentSlide(
          currentSlide < topSellers.length - 1 ? currentSlide + 1 : 0
        );
  };

  const navigate = useNavigate();
  return (
    <div className="topseller" id="works">
      <h1>NGƯỜI BÁN UY TÍN</h1>
      <div
        className="topseller_slider"
        style={{ transform: `translateX(-${currentSlide * 100}vw)` }}
      >
        {topSellers.map((d) => (
          <div className="topseller_container" key={d}>
            <div className="topseller_item">
              <div className="topseller_left">
                <div className="topseller_leftContainer">
                  <div
                    className="topseller_imgContainer"
                    onClick={() => navigate("/seller/" + d.id)}
                  >
                    <img
                      src={
                        d.user.avatar
                          ? d.user.avatar
                          : "https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png"
                      }
                      alt=""
                    />
                  </div>
                  <h2>
                    {d.user.firstName} {d.user.lastName}
                  </h2>
                  <h3>{d.rankSeller}</h3>
                  <p>{d.descriptionBio}</p>
                  <h4>Total order: {d.totalOrderFinish}</h4>
                </div>
              </div>
              <div className="topseller_right">
                <img
                  src="https://st2.depositphotos.com/1496410/5718/v/950/depositphotos_57189485-stock-illustration-button-top-seller.jpg"
                  alt=""
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <img
        src="assets/arrow.png"
        className="arrow left"
        alt=""
        onClick={() => handleClick("left")}
      />
      <img
        src="assets/arrow.png"
        className="arrow right"
        alt=""
        onClick={() => handleClick()}
      />
    </div>
  );
}
