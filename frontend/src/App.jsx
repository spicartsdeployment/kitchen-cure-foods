import React, { useContext } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import ContactUsPage from "./pages/ContactUsPage";
import AboutUsPage from "./pages/AboutUsPage";
import ProductsPage from "./pages/ProductsPage";
import ConsultationPage from "./pages/ConsultationPage";
import ResourcesPage from "./pages/ResourcesPage";
import PasswordResetPage from "./pages/PasswordResetPage";
import NotFound from "./pages/NotFoundPage";
import { ProfilePage } from "./pages/ProfilePage";
import { AuthContext } from "./context/AuthContext";
import ProfilePage2 from "./pages/ProfilePage2";

export function App() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <div className="w-full overflow-hidden">
      {<Header />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/profile" element={<ProfilePage2 />} />
        <Route path="/reset-password" element={<PasswordResetPage />} />
        {/* <Route
          path="/about"
          element={isLoggedIn ? <AboutUsPage /> : <Navigate to="/login" />}
        /> */}
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/contact" element={<ContactUsPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/consult" element={<ConsultationPage />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {<Footer />}
    </div>
  );
}
