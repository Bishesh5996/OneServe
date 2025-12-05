import { useEffect, useMemo, useState } from "react";

import { useAuthStore } from "@stores/useAuthStore.js";
import { useFavoritesStore } from "@stores/useFavoritesStore.js";
import { apiClient } from "@utils/apiClient.js";

export const useDashboardData = () => {
  const user = useAuthStore((state) => state.user);
  const userId = user?.id;

  const favoriteItems = useFavoritesStore((state) => state.items);
  const fetchFavorites = useFavoritesStore((state) => state.fetchFavorites);
  const clearFavorites = useFavoritesStore((state) => state.clearFavorites);

  const [favoritesLoading, setFavoritesLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [ordersError, setOrdersError] = useState("");

  useEffect(() => {
    let ignore = false;
    if (!userId) {
      clearFavorites();
      return () => {
        ignore = true;
      };
    }
    const loadFavorites = async () => {
      setFavoritesLoading(true);
      try {
        const data = await fetchFavorites(userId);
        if (!ignore && Array.isArray(data)) {
          // favorites store already updated
        }
      } catch (error) {
        console.error("Favorites error:", error);
      } finally {
        if (!ignore) {
          setFavoritesLoading(false);
        }
      }
    };
    loadFavorites();
    return () => {
      ignore = true;
    };
  }, [userId, fetchFavorites, clearFavorites]);

  useEffect(() => {
    let ignore = false;
    if (!userId) {
      setOrders([]);
      setOrdersError("Please sign in to see orders.");
      return () => {
        ignore = true;
      };
    }
    const fetchOrders = async () => {
      setOrdersLoading(true);
      try {
        const response = await apiClient.get("/orders");
        if (!ignore) {
          setOrders(response.data ?? []);
          setOrdersError("");
        }
      } catch (error) {
        if (!ignore) {
          setOrders([]);
          setOrdersError("Unable to load recent orders.");
        }
      } finally {
        if (!ignore) setOrdersLoading(false);
      }
    };
    fetchOrders();
    const interval = setInterval(fetchOrders, 15000);
    return () => {
      ignore = true;
      clearInterval(interval);
    };
  }, [userId]);

  const stats = useMemo(() => {
    const totalOrders = orders.length;
    const meals = orders.reduce(
      (sum, order) => sum + (order.items ?? []).reduce((count, item) => count + (item.quantity ?? 0), 0),
      0
    );
    const spent = orders.reduce((sum, order) => sum + (order.total ?? 0), 0);
    return { totalOrders, meals, spent };
  }, [orders]);

  return {
    user,
    userId,
    orders,
    ordersLoading,
    ordersError,
    favoriteItems,
    favoritesLoading,
    stats
  };
};
