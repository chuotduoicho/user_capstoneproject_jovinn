import { BrowserRouter, Routes, Route } from "react-router-dom";
import SendMail from "./pages/auth/forgotPassword/sendMail/SendMail";
import SetNewPassword from "./pages/auth/forgotPassword/setNewPassword/SetNewPassword";
import Login from "./pages/auth/login/Login";
import Register from "./pages/auth/register/Register";
import Verify from "./pages/auth/verifyAccount/Verify";

import BuyerCreateRequest from "./pages/buyer/buyerCreateRequest/BuyerCreateRequest";
import BuyerHome from "./pages/buyer/buyerHome/BuyerHome";
import BuyerManageRequest from "./pages/buyer/buyerManageRequest/BuyerManageRequest";
import BuyerProfile from "./pages/buyer/buyerProfile/BuyerProfile";
import BuyerRequestDetail from "./pages/buyer/buyerRequestDetail/BuyerRequestDetail";
import BuyerServiceDetail from "./pages/buyer/buyerServiceDetail/BuyerServiceDetail";
import ErrorPage from "./pages/guest/errorPage/ErrorPage";
import Home from "./pages/guest/home/Home";
import ServiceDetail from "./pages/guest/serviceDetail/ServiceDetail";
import SellerCreateService from "./pages/seller/sellerCreateService/SellerCreateService";
import SellerHome from "./pages/seller/sellerHome/SellerHome";
import SellerListRequest from "./pages/seller/sellerListRequest/SellerListRequest";

import SellerProfession from "./pages/seller/sellerProfesion/sellerProfession";
import SellerRequestDetail from "./pages/seller/sellerRequestDetail/SellerRequestDetail";
import SellerServiceDetail from "./pages/seller/sellerServiceDetail/SellerServiceDetail";
import SellerTerms from "./pages/seller/sellerTerms/SellerTerms";
import SellerCreateOffer from "./pages/seller/sellerCreateOffer/SellerCreateOffer";
import BuyerOfferDetail from "./pages/buyer/buyerOfferDetail/BuyerOfferDetail";
import SellerOfferDetail from "./pages/seller/sellerOfferDetail/SellerOfferDetail";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route
              path="serviceDetail/:serviceId"
              element={<ServiceDetail />}
            />
          </Route>
          <Route path="/auth">
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="verifyAccount/:userId" element={<Verify />} />
            <Route path="sendMail" element={<SendMail />} />
            <Route path="resetPassword/:capcha" element={<SetNewPassword />} />
          </Route>
          <Route path="/buyerhome">
            <Route index element={<BuyerHome />} />

            <Route path="profile" element={<BuyerProfile />} />
            <Route
              path="serviceDetail/:serviceId"
              element={<BuyerServiceDetail />}
            />
            <Route path="createRequest" element={<BuyerCreateRequest />} />
            <Route path="manageRequest" element={<BuyerManageRequest />} />
            <Route
              path="requestDetail/:requestId"
              element={<BuyerRequestDetail />}
            />
            <Route
              path="offerDetail/:requestId"
              element={<BuyerOfferDetail />}
            />
            <Route path="createOrder" element={<BuyerCreateRequest />} />
          </Route>
          <Route path="/sellerhome">
            <Route index element={<SellerHome />} />
            <Route path="createService" element={<SellerCreateService />} />
            <Route path="listRequest" element={<SellerListRequest />} />
            <Route
              path="requestDetail/:requestId"
              element={<SellerRequestDetail />}
            />
            <Route
              path="updateService/:serviceId"
              element={<SellerCreateService />}
            />
            <Route
              path="serviceDetail/:serviceId"
              element={<SellerServiceDetail />}
            />
            <Route path="sellerTerms" element={<SellerTerms />} />{" "}
            <Route path="professionInfo" element={<SellerProfession />} />
            <Route path="createOffer" element={<SellerCreateOffer />} />
            <Route
              path="offerDetail/:requestId"
              element={<SellerOfferDetail />}
            />
          </Route>
          <Route path="/errorPage" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
