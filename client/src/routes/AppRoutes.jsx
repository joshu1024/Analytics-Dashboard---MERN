import React from "react";
import { Routes, Route } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout/AuthLayout";
import MainLayout from "../layouts/MainLayout/MainLayout";
import LoginPage from "../pages/Auth/LoginPage";
import ForgotPasswordPage from "../pages/Auth/ForgotPasswordPage";
import ProtectedRoute from "./ProtectedRoute";
import DashboardPage from "../pages/Dashboard/DashboardPage";
import AnalyticsPage from "../pages/Analytics/AnalyticsPage";
import CompaniesPage from "../pages/companies/CompaniesPage";
import BillingDashboard from "../pages/Billing/BillingDashboard";
import UsersPage from "../pages/Users/UsersPage";
import SettingsPage from "../pages/Settings/SettingsPage";
import RegisterPage from "../pages/Auth/RegisterPage";
import ResetPasswordPage from "../pages/Auth/ResetPasswordPage";
import ResetPasswordModal from "../pages/Users/modals/ResetPasswordModal";
import CompanyDetailPage from "../pages/companies/CompanyDetailPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/reset-password:token" element={<ResetPasswordPage />} />
      </Route>
      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<DashboardPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/companies" element={<CompaniesPage />} />
        <Route path="/companies/:id" element={<CompanyDetailPage />} />
        <Route path="/billing" element={<BillingDashboard />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
