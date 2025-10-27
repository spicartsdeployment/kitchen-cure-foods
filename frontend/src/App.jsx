import React, { useContext } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTopAuto from "./components/ScrollToTopAuto";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import ContactUsPage from "./pages/ContactUsPage";
import AboutUsPage from "./pages/AboutUsPage";
import ServicesPage from "./pages/ServicesPage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetail from "./pages/ProductDetail";
import ConsultationPage from "./pages/ConsultationPage";
import ResourcesPage from "./pages/ResourcesPage";
import PasswordResetPage from "./pages/PasswordResetPage";
import NotFound from "./pages/NotFoundPage";
import ProfilePage from "./pages/ProfilePage";
import TermsAndConditionsPage from "./pages/TermsAndConditionsPage";
import CartPage from "./pages/CartPage";
import OrdersPage from "./pages/OrdersPage"
import { AuthContext } from "./context/AuthContext";

export function App() {
  const { isLoggedIn, authChecked } = useContext(AuthContext);

  if (!authChecked) {
    // show loading spinner or blank page
    return <></>;
  }

  return (
    <div className="w-full overflow-hidden">
      {<Header />}
      <ScrollToTopAuto />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/terms-and-conditions"
          element={<TermsAndConditionsPage />}
        />
        <Route
          path="/profile"
          element={isLoggedIn ? <ProfilePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/reset-password"
          element={
            isLoggedIn ? <PasswordResetPage /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/about"
          element={isLoggedIn ? <AboutUsPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/contact"
          element={isLoggedIn ? <ContactUsPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/services"
          element={isLoggedIn ? <ServicesPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/products"
          element={isLoggedIn ? <ProductsPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/product/:id"
          element={isLoggedIn ? <ProductDetail /> : <Navigate to="/login" />}
        />
        <Route
          path="/cart"
          element={isLoggedIn ? <CartPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/orders"
          element={isLoggedIn ? <OrdersPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/consult"
          element={isLoggedIn ? <ConsultationPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/resources"
          element={isLoggedIn ? <ResourcesPage /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {<Footer />}
    </div>
  );
}
