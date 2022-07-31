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
import "react-credit-cards/es/styles-compiled.css";
import "./sellerDetail.scss";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectSeller } from "../../../redux/userSlice";
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
    <div className="buyer_profile">
      <BuyerHeader />
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
            <Typography variant="h5">
              Lời giới thiệu:{" "}
              <Typography variant="inherit">
                {sellerDetail.descriptionBio}
              </Typography>
            </Typography>
          </div>
          <div className="paymentRow">
            <Typography variant="h5">
              Kĩ năng:{" "}
              {sellerDetail.skills.map((skill, index) => (
                <>
                  {" "}
                  <Chip label={skill.name} />{" "}
                </>
              ))}
            </Typography>
          </div>
          <div className="paymentRow">
            <Typography variant="h5">Học vấn:</Typography>
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
            <Typography variant="h5">Chứng chỉ : </Typography>
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

        {/* <div className="paymentRow">
          <img
            src="https://i1-dulich.vnecdn.net/2021/07/16/1-1626437591.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=BWzFqMmUWVFC1OfpPSUqMA"
            className="paymentRow_img"
          />

          <div className="paymentRow_title">
            <h2>
              {sellerDetail.user.firstName + " " + sellerDetail.user.lastName}
            </h2>
            <h4>Gói nâng cao</h4>
          </div>
        </div>
        <div className="paymentRow">
          <h3>Tổng giá : 1000$ - Phí hủy hợp đồng : 10% (100$)</h3>
          <h3></h3>
        </div>
        <div className="paymentRow">
          <h4>Sản phẩm bàn giao:</h4>
          <div>
            <p>✔️ Sản phẩm bàn giao 1</p>
          </div>
        </div>
        <div className="paymentRow">
          <h4>Thanh toán : 1 lần </h4>
        </div>
        <div className="paymentRow">
          <h4>Thời gian bàn giao: 3 ngày</h4>
        </div>
        <div className="paymentRow">
          <h2>Số tiền thanh toán : 1000$</h2>
        </div>{" "}
        <div className="paymentRow"></div> */}
      </Container>
      <div className="sections_profile">
        <Contact />
      </div>
    </div>
  );
}
