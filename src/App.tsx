import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import PerfumeDetail from "./pages/PerfumeDetail";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import Footer from "./components/Footer";
import ProfilePage from "./pages/ProfilePage";
import CollectorPage from "./pages/CollectorPage";
import BrandPage from "./pages/BrandPage";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./contexts/AuthContext";
import MemberRoute from "./routes/MemberRoute";
import AdminRoute from "./routes/AdminRoute";
export default function App() {
  const location = useLocation();
  const isAuthorization =
    location.pathname === "/login" || location.pathname === "/register";
  return (
    <>
      <AuthProvider>
        {!isAuthorization && <Navbar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/collectors" element={<CollectorPage />} />
          <Route
            path="/perfume"
            element={<PerfumeDetail userRole={"admin"} />}
          />
          <Route
            path="/brands"
            element={
              <AdminRoute>
                <BrandPage />
              </AdminRoute>
            }
          />
        </Routes>
        {!isAuthorization && <Footer />}
        <Toaster />
      </AuthProvider>
    </>
  );
}
