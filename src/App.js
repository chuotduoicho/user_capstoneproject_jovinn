import { BrowserRouter, Routes, Route } from "react-router-dom";
import SendMail from "./pages/auth/forgotPassword/sendMail/SendMail";
import SetNewPassword from "./pages/auth/forgotPassword/setNewPassword/SetNewPassword";
import Login from "./pages/auth/login/Login";
import Register from "./pages/auth/register/Register";
import Verify from "./pages/auth/verifyAccount/Verify";
import BuyerHome from "./pages/buyer/buyerHome/BuyerHome";
import BuyerProfile from "./pages/buyer/buyerProfile/BuyerProfile";
import BuyerServiceDetail from "./pages/buyer/buyerServiceDetail/BuyerServiceDetail";
import ErrorPage from "./pages/guest/errorPage/ErrorPage";
import Home from "./pages/guest/home/Home";
import ServiceDetail from "./pages/guest/serviceDetail/ServiceDetail";
import SellerCreateService from "./pages/seller/sellerCreateService/SellerCreateService";
import SellerHome from "./pages/seller/sellerHome/SellerHome";
import SellerOfferCreate from "./pages/seller/sellerOfferCreate/SellerOfferCreate";
import SellerProfession from "./pages/seller/sellerProfesion/sellerProfession";
import SellerServiceDetail from "./pages/seller/sellerServiceDetail/SellerServiceDetail";
import SellerTerms from "./pages/seller/sellerTerms/SellerTerms";
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
          </Route>
          <Route path="/sellerhome">
            <Route index element={<SellerHome />} />
            <Route path="createService" element={<SellerCreateService />} />
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
            <Route path="createOffer" element={<SellerOfferCreate />} />
          </Route>
          <Route path="/errorPage" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
