import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { NotFoundPage } from "@app/routes/NotFoundPage.jsx";
import { ROUTE_PATHS } from "@app/routes/paths.js";
import { AdminLayout } from "@layouts/AdminLayout.jsx";
import { SiteLayout } from "@layouts/SiteLayout.jsx";
import { UserDashboardLayout } from "@layouts/UserDashboardLayout.jsx";
import { AdminDashboardPage } from "@pages/AdminDashboardPage.jsx";
import { AdminLoginPage } from "@pages/AdminLoginPage.jsx";
import { AdminOrdersPage } from "@pages/AdminOrdersPage.jsx";
import { AdminProductsPage } from "@pages/AdminProductsPage.jsx";
import { AdminUsersPage } from "@pages/AdminUsersPage.jsx";
import { AuthPage } from "@pages/AuthPage.jsx";
import { BlogDetailPage } from "@pages/BlogDetailPage.jsx";
import { BlogPage } from "@pages/BlogPage.jsx";
import { CartPage } from "@pages/CartPage.jsx";
import { CheckoutPage } from "@pages/CheckoutPage.jsx";
import { ContactPage } from "@pages/ContactPage.jsx";
import { HomePage } from "@pages/HomePage.jsx";
import { HowItWorksPage } from "@pages/HowItWorksPage.jsx";
import { MealKitsPage } from "@pages/MealKitsPage.jsx";
import { OrderConfirmationPage } from "@pages/OrderConfirmationPage.jsx";
import { OrderTrackingPage } from "@pages/OrderTrackingPage.jsx";
import { ProductDetailPage } from "@pages/ProductDetailPage.jsx";
import { AdminBlogsPage } from "@pages/AdminBlogsPage.jsx";
import { UserDashboardFavoritesPage } from "@pages/UserDashboardFavoritesPage.jsx";
import { UserDashboardHomePage } from "@pages/UserDashboardHomePage.jsx";
import { UserDashboardOrdersPage } from "@pages/UserDashboardOrdersPage.jsx";
import { UserDashboardProfilePage } from "@pages/UserDashboardProfilePage.jsx";

const router = createBrowserRouter(
  [
    {
      path: ROUTE_PATHS.root,
      element: <SiteLayout />,
      errorElement: <NotFoundPage />,
      children: [
        { index: true, element: <HomePage /> },
        { path: "mealkits", element: <MealKitsPage /> },
        { path: "product/:slug", element: <ProductDetailPage /> },
        { path: "cart", element: <CartPage /> },
        { path: "how-it-works", element: <HowItWorksPage /> },
        { path: "blog", element: <BlogPage /> },
        { path: "blog/:slug", element: <BlogDetailPage /> },
        { path: "contact", element: <ContactPage /> },
        { path: "checkout", element: <CheckoutPage /> },
        { path: "order-confirmed", element: <OrderConfirmationPage /> },
        { path: "track-order", element: <OrderTrackingPage /> },
        { path: "auth/login", element: <AuthPage /> },
        { path: "auth/signup", element: <AuthPage /> },
        {
          path: "user/dashboard",
          element: <UserDashboardLayout />,
          children: [
            { index: true, element: <UserDashboardHomePage /> },
            { path: "favorites", element: <UserDashboardFavoritesPage /> },
            { path: "orders", element: <UserDashboardOrdersPage /> },
            { path: "profile", element: <UserDashboardProfilePage /> }
          ]
        },
        { path: "admin-login", element: <AdminLoginPage /> }
      ]
    },
    {
      path: "admin",
      element: <AdminLayout />,
      errorElement: <NotFoundPage />,
      children: [
        { index: true, element: <AdminDashboardPage /> },
        { path: "dashboard", element: <AdminDashboardPage /> },
        { path: "orders", element: <AdminOrdersPage /> },
        { path: "users", element: <AdminUsersPage /> },
        { path: "products", element: <AdminProductsPage /> },
        { path: "blogs", element: <AdminBlogsPage /> }
      ]
    },
    { path: "*", element: <NotFoundPage /> }
  ],
  { basename: import.meta.env.BASE_URL }
);

export const AppRouter = () => <RouterProvider router={router} />;
