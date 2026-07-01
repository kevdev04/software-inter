import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import DashboardPage from "./pages/admin/DashboardPage";
import ModerationPage from "./pages/admin/ModerationPage";
import HistorialPage from "./pages/admin/HistorialPage";
import UsersPage from "./pages/admin/UsersPage";

import HomePage from "./pages/user/HomePage";
import ReportPage from "./pages/user/ReportPage";
import LostObjectsPage from "./pages/user/LostObjectsPage";
import NotificationsPage from "./pages/user/NotificationsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admin/dashboard" element={<DashboardPage />} />
        <Route path="/admin/moderacion" element={<ModerationPage />} />
        <Route path="*" element={<LoginPage />} />
        <Route path="/admin/historial" element={<HistorialPage />} />
        <Route path="/admin/usuarios" element={<UsersPage />} />
        
        <Route path="/home" element={<HomePage />} />
        <Route path="/reportar" element={<ReportPage />} />
        <Route path="/objetos" element={<LostObjectsPage />} />
        <Route path="/notificaciones" element={<NotificationsPage />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;