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
import SellerProfession from "./pages/seller/sellerProfesion/sellerProfession";
import SellerRequestDetail from "./pages/seller/sellerRequestDetail/SellerRequestDetail";
import SellerServiceDetail from "./pages/seller/sellerServiceDetail/SellerServiceDetail";
import SellerTerms from "./pages/seller/sellerTerms/SellerTerms";
import SellerCreateOffer from "./pages/seller/sellerCreateOffer/SellerCreateOffer";
import BuyerOfferDetail from "./pages/buyer/buyerOfferDetail/BuyerOfferDetail";
import SellerOfferDetail from "./pages/seller/sellerOfferDetail/SellerOfferDetail";
import SellerManageContract from "./pages/seller/sellerManageContract/SellerManageContract";
import BuyerPayment from "./pages/buyer/buyerPayment/BuyerPayment";
import BuyerManageContract from "./pages/buyer/buyerManageContract/BuyerManageContract";
import BuyerContractDetail from "./pages/buyer/buyerContractDetail/BuyerContractDetail";
import BuyerManageOrder from "./pages/buyer/buyerManageOrder/BuyerManageOrder";
import BuyerOrderDetail from "./pages/buyer/buyerOrderDetail/BuyerOrderDetail";
import BuyerManageOffer from "./pages/buyer/buyerManageOffer/BuyerManageOffer";
import ListSeller from "./pages/guest/listSeller/ListSeller";
import SellerDetail from "./pages/guest/sellerDetail/SellerDetail";
import SellerManageRequest from "./pages/seller/sellerManageRequest/SellerManageRequest";
import SellerManageOrder from "./pages/seller/sellerManageOrder/SellerManageOrder";
import SellerOrderDetail from "./pages/seller/sellerOrderDetail/SellerOrderDetail";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import BuyerManageWallet from "./pages/buyer/buyerManageWallet/BuyerManageWallet";
import SellerManageOffer from "./pages/seller/sellerManageOffer/SellerManageOffer";
import SellerContractDetail from "./pages/seller/sellerContractDetail/SellerContractDetail";
import BuyerPaymentOffer from "./pages/buyer/buyerPayment/BuyerPaymentOffer";
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
            <Route path="seller/:sellerId" element={<SellerDetail />} />
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
            <Route path="manageRequest">
              <Route index element={<BuyerManageRequest />} />
              <Route path=":requestId" element={<BuyerRequestDetail />} />
            </Route>

            <Route path="manageContract">
              <Route index element={<BuyerManageContract />} />
              <Route path=":contractId" element={<BuyerContractDetail />} />
            </Route>

            <Route path="manageOrder">
              <Route index element={<BuyerManageOrder />} />

              <Route path=":orderId" element={<BuyerOrderDetail />} />
            </Route>
            <Route path="manageOffer/:requestId">
              <Route index element={<BuyerManageOffer />} />

              <Route path=":offerId" element={<BuyerOfferDetail />} />
            </Route>

            <Route path="manageWallet">
              <Route index element={<BuyerManageWallet />} />
            </Route>

            <Route path="payment" element={<BuyerPayment />} />
            <Route path="paymentOffer" element={<BuyerPaymentOffer />} />
            <Route path="listSeller/:requestId" element={<ListSeller />} />
          </Route>
          <Route path="/sellerhome">
            <Route index element={<SellerHome />} />
            <Route path="createService" element={<SellerCreateService />} />
            <Route path="manageRequest">
              <Route index element={<SellerManageRequest />} />
              <Route path=":requestId" element={<SellerRequestDetail />} />
            </Route>
            <Route path="manageContract">
              <Route index element={<SellerManageContract />} />
              <Route path=":contractId" element={<SellerContractDetail />} />
            </Route>
            <Route path="manageOrder">
              <Route index element={<SellerManageOrder />} />

              <Route path=":orderId" element={<SellerOrderDetail />} />
            </Route>
            <Route
              path="createOffer/:requestId"
              element={<SellerCreateOffer />}
            />
            <Route path="manageOffer">
              <Route index element={<SellerManageOffer />} />

              <Route path=":offerId" element={<SellerOfferDetail />} />
            </Route>
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
          </Route>
          <Route path="/errorPage" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
