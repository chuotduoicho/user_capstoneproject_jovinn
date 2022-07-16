import React from "react";
import SellerHeader from "../../../components/seller/sellerHeader/SellerHeader";
import Button from "@material-ui/core/Button";
import "./sellerTerms.scss";
import { useNavigate } from "react-router-dom";
import BuyerHeader from "../../../components/buyer/buyerHeader/BuyerHeader";

export default function SellerTerms() {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  const handleContinue = () => {
    navigate("/sellerHome/professionInfo");
  };
  return (
    <div className="seller_term">
      <BuyerHeader />
      <h1 className="seller_term_title">ĐIỀU KHOẢN KHI TẠO DỊCH VỤ</h1>
      <div className="seller_term_content">
        <p className="seller_term_content_p">
          1. Hãy mô tả dịch vụ với nhiều thông tin nhất.Không ai tin tưởng mua
          dịch vụ của bạn khi thông tin quá ít và chúng tôi sẽ lọc bớt các công
          việc đăng ít thông tin.
        </p>
        <p className="seller_term_content_p">
          2. Không để 2 dịch vụ khác nhau vào cùng 1 bài đăng. Ví dụ Viết
          content SEO và Thiết kế Logo là 2 dịch vụ khác nhau, nên để 2 bài đăng
          riêng biệt.
        </p>
        <p className="seller_term_content_p">
          3. Mô tả rõ nội dung dịch vụ với giá thật cung cấp tương ứng, khách
          hàng sẽ đặt mua theo giá bạn đưa ra và cam kết hoàn thành.
        </p>
        <p className="seller_term_content_p">
          4. Không để thông tin liên hệ như: Điện Thoại, Email, Zalo, Website …
          trên bất kỳ thông tin dịch vụ nào, bao gồm cả hình ảnh, hồ sơ công
          khai.
        </p>
      </div>
      <div className="seller_term_content">
        <Button
          variant="contained"
          className="seller_term_content_btn"
          onClick={handleBack}
        >
          Quay lại
        </Button>
        <Button
          variant="contained"
          className="seller_term_content_btn"
          color="primary"
          onClick={handleContinue}
        >
          Tiếp tục
        </Button>
      </div>
    </div>
  );
}
