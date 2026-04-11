import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Services from "./pages/Services";
import WallOfSuccess from "./pages/WallOfSuccess";
import { isAuthenticated } from "./utils/auth";
import Contacts from "./pages/Contacts";

function PrivateRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/" element={
          <PrivateRoute><Dashboard /></PrivateRoute>
        } />
        <Route path="/projects" element={
          <PrivateRoute><Projects /></PrivateRoute>
        } />
        <Route path="/services" element={
          <PrivateRoute><Services /></PrivateRoute>
        } />
        <Route path="/success" element={
          <PrivateRoute><WallOfSuccess /></PrivateRoute>
        } />
        <Route path="/contacts" element={
          <PrivateRoute><Contacts/></PrivateRoute>
        } />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}