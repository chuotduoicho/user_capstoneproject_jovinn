import React from "react";
import SellerHeader from "../../../components/seller/sellerHeader/SellerHeader";
import Button from "@material-ui/core/Button";
import "./sellerTerms.scss";
import { useNavigate } from "react-router-dom";
import BuyerHeader from "../../../components/buyer/buyerHeader/BuyerHeader";
import { useState } from "react";

export default function SellerTerms() {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  const handleContinue = () => {
    navigate("/sellerHome/professionInfo");
  };

  const [change, setChange] = useState(true);
  function isChecked() {
    setChange(!change);
  }

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
        <p className="seller_term_content_p">
          5. Lưu ý rằng! Bạn sẽ bị trừ số tiền tương ứng phí hủy hợp đồng để
          nhận 1 hợp đồng dịch vụ. Chúng tôi sẽ hoàn trả lại số tiền này cho bạn
          sau khi hợp đồng của bạn được thực hiện hoàn tất.
        </p>
        <p className="seller_term_content_p">
          6. Bạn sẽ nhận được 90% lợi nhuận trên tổng giá trị của một hợp đồng
          thành công.
        </p>
        <p className="seller_term_content_p">
          7. Bạn sẽ mất 100% phí hủy hợp đồng nếu đơn phương yêu cầu hủy hợp
          đồng khi đang trong quá trình thực hiện .
        </p>
        <p className="seller_term_content_p">
          8. Chúng tôi là người trung gian kết nối, vì thế không có trách nhiệm
          và nghĩa vụ trong việc giải quyết các tranh chấp, xung đột lợi ích
          giữa bên mua và bán dịch vụ.
        </p>
        <p className="seller_term_content_p">
          9. Chúng tôi không chịu trách nhiệm nếu bạn cung cấp sai thông tin tài
          khoản Paypal dẫn đến việc không nhận được tiền khi yêu cầu rút.
        </p>
      </div>
      <div className="seller_term_content">
        <div style={{ marginTop: "20px" }}>
          <label>
            <input type="checkbox" onChange={isChecked} /> Tôi đã đọc và chấp
            nhận các điều khoản trên
          </label>
        </div>
        <Button
          variant="contained"
          className="seller_term_content_btn"
          onClick={handleBack}
        >
          Quay lại
        </Button>
        <Button
          id="continue_btn"
          variant="contained"
          className="seller_term_content_btn"
          color="primary"
          disabled={change}
          onClick={handleContinue}
        >
          Tiếp tục
        </Button>
      </div>
    </div>
  );
}
