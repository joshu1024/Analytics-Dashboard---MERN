import { FC, JSX } from "react";
import { Routes, Route } from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout/AuthLayout";
import MainLayout from "../layouts/MainLayout/MainLayout";

import LoginPage from "../pages/Auth/LoginPage";
import ForgotPasswordPage from "../pages/Auth/ForgotPasswordPage";
import RegisterPage from "../pages/Auth/RegisterPage";
import ResetPasswordPage from "../pages/Auth/ResetPasswordPage";

import DashboardPage from "../pages/Dashboard/DashboardPage";
import AnalyticsPage from "../pages/Analytics/AnalyticsPage";
import CompaniesPage from "../pages/companies/CompaniesPage";
import CompanyDetailPage from "../pages/companies/CompanyDetailPage";
import BillingDashboard from "../pages/Billing/BillingDashboard";
import UsersPage from "../pages/Users/UsersPage";
import SettingsPage from "../pages/Settings/SettingsPage";

import ProtectedRoute from "./ProtectedRoute";

const AppRoutes: FC = (): JSX.Element => {
  return (
    <Routes>
      {/* Public Auth Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
      </Route>

      {/* Protected Application Routes */}
      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="analytics" element={<AnalyticsPage />} />
        <Route path="companies" element={<CompaniesPage />} />
        <Route path="companies/:id" element={<CompanyDetailPage />} />
        <Route path="billing" element={<BillingDashboard />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;