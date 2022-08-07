import {
  TableCell,
  Chip,
  Container,
  Table,
  TableHead,
  TableRow,
  Typography,
  TableBody,
} from "@material-ui/core";
import React, { useState } from "react";
import BuyerHeader from "../../../components/buyer/buyerHeader/BuyerHeader";
import Contact from "../../../components/guest/contact/Contact";
import "./sellerDetail.scss";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectSeller } from "../../../redux/userSlice";
import Topbar from "../../../components/guest/topbar/Topbar";
function format(date) {
  date = new Date(date);

  var day = ("0" + date.getDate()).slice(-2);
  var month = ("0" + (date.getMonth() + 1)).slice(-2);
  var year = date.getFullYear();

  return day + "-" + month + "-" + year;
}
export default function SellerDetail() {
  const { sellerId } = useParams();
  const sellerDetail = useSelector((state) => selectSeller(state, sellerId));
  const { user } = useSelector((state) => state.auth);
  console.log("sellerDetail", sellerDetail);
  //dialog
  const [openPayment, setOpenPayment] = useState(false);

  const handlePayment = () => {
    setOpenPayment(false);
  };
  const handleOpenPayment = () => {
    setOpenPayment(true);
  };

  const handleClosePayment = () => {
    setOpenPayment(false);
  };

  return (
    <div
      className="buyer_profile"
      style={{ marginTop: user ? "0px" : "100px" }}
    >
      {user ? <BuyerHeader /> : <Topbar />}

      <h1 className="buyer_profile_title">Thông tin người bán</h1>
      <Container maxWidth="lg" className="sellerProfile_profession_form">
        <div className="sellerHome_leftCard">
          <img
            src={
              sellerDetail.user.avatar
                ? sellerDetail.user.avatar
                : "https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png"
            }
            style={{ width: "230px", borderRadius: "50%" }}
            alt="avatar"
          />
          {/* <h1 className="lsTitle">Nguyễn Thế Vinh</h1> */}
          <div className="sellerHome_leftCard_lsItem">
            <h3>
              {sellerDetail.user.firstName} {sellerDetail.user.lastName}
            </h3>
          </div>
          <div className="sellerHome_leftCard_lsItem">
            {/* <label> {currentUser.firstName}</label> */}
            <div className="sellerHome_leftCard_lsOptions">
              {/* <div className="sellerHome_leftCard_lsOptionItem">
                  <span className="sellerHome_leftCard_lsOptionText">
                    🌏 Quốc gia: Việt Nam
                  </span>
                </div> */}
              <div className="sellerHome_leftCard_lsOptionItem">
                <span className="sellerHome_leftCard_lsOptionText">
                  Tên hãng: {sellerDetail.brandName}
                </span>
              </div>
              <div className="sellerHome_leftCard_lsOptionItem">
                <span className="sellerHome_leftCard_lsOptionText">
                  Cấp độ: {sellerDetail.rankSeller}
                </span>
              </div>
              <div className="sellerHome_leftCard_lsOptionItem">
                <span className="sellerHome_leftCard_lsOptionText">
                  Email: {sellerDetail.user.email}
                </span>
              </div>
              <div className="sellerHome_leftCard_lsOptionItem">
                <span className="sellerHome_leftCard_lsOptionText">
                  Tổng số order: {sellerDetail.totalOrderFinish}
                </span>
              </div>
              <div className="sellerHome_leftCard_lsOptionItem">
                <span className="sellerHome_leftCard_lsOptionText">
                  Tổng số dịch vụ: {sellerDetail.boxes.length}
                </span>
              </div>
              <div className="sellerHome_leftCard_lsOptionItem">
                <span className="sellerHome_leftCard_lsOptionText">
                  Thành phố: {sellerDetail.user.country}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="sellerProfile_rightCard">
          <div className="paymentRow">
            <Typography
              variant="h5"
              style={{ width: "30%", textAlign: "left" }}
            >
              Lời giới thiệu:
            </Typography>
            <Typography variant="inherit">
              {sellerDetail.descriptionBio}
            </Typography>
          </div>
          <div className="paymentRow">
            <Typography
              variant="h5"
              style={{ width: "30%", textAlign: "left" }}
            >
              Kĩ năng:
            </Typography>

            {sellerDetail.skills.map((skill, index) => (
              <>
                {" "}
                <Chip label={skill.name} />{" "}
              </>
            ))}
          </div>
          <div className="paymentRow">
            <Typography
              variant="h5"
              style={{ width: "30%", textAlign: "left" }}
            >
              Học vấn:
            </Typography>
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>Tiêu đề</TableCell>
                  <TableCell align="right">Trường</TableCell>
                  <TableCell align="right">Ngành</TableCell>
                  {/* <TableCell align="right">Quốc gia</TableCell> */}
                  <TableCell align="right">Năm</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sellerDetail.educations.map((item, index) => {
                  return (
                    <TableRow
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {item.title}
                      </TableCell>
                      <TableCell align="right">
                        {" "}
                        {item.universityName}
                      </TableCell>
                      <TableCell align="right"> {item.major}</TableCell>
                      {/* <TableCell align="right"> {item.country}</TableCell> */}
                      <TableCell align="right">
                        {" "}
                        {format(item.yearOfGraduation)}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
          <div className="paymentRow">
            <Typography
              variant="h5"
              style={{ width: "30%", textAlign: "left" }}
            >
              Chứng chỉ :{" "}
            </Typography>
            <Table
              sx={{ minWidth: 850 }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>Tiêu đề</TableCell>
                  <TableCell align="right">Tên chứng chỉ</TableCell>

                  <TableCell align="right">Link</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sellerDetail.certificates.map((item) => {
                  return (
                    <TableRow
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {item.title}
                      </TableCell>
                      <TableCell align="right"> {item.name}</TableCell>

                      <TableCell align="right">
                        <a href={`//${item.linkCer}`}>LINK</a>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      </Container>
      <div className="sections_profile">
        <Contact />
      </div>
    </div>
  );
}
