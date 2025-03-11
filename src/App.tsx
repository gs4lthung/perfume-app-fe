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
import CreatePerfume from "./pages/CreatePerfume";
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
          <Route path="/perfume/:id" element={<PerfumeDetail />} />
          <Route path="/perfume-new" element={<CreatePerfume />} />
          <Route path="/brands" element={<BrandPage />} />
          <Route path="/collectors" element={<CollectorPage />} />
        </Routes>
        {!isAuthorization && <Footer />}
        <Toaster />
      </AuthProvider>
    </>
  );
}
