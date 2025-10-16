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
import ProfilePage from "./pages/ProfilePage";
import { AuthContext } from "./context/AuthContext";

export function App() {
  const { isLoggedIn, authChecked } = useContext(AuthContext);
  console.log("App component mounted, isLoggedIn:", isLoggedIn);

  if (!authChecked) {
    // show loading spinner or blank page
    return <></>;
  }

  return (
    console.log("Rendering App component..."),
    (
      <div className="w-full overflow-hidden">
        {<Header />}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/signup"
            element={isLoggedIn ? <SignupPage /> : <Navigate to="/login" />}
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
            path="/products"
            element={isLoggedIn ? <ProductsPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/consult"
            element={
              isLoggedIn ? <ConsultationPage /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/resources"
            element={isLoggedIn ? <ResourcesPage /> : <Navigate to="/login" />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        {<Footer />}
      </div>
    )
  );
}
