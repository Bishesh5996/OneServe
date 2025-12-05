import { useEffect, useState } from "react";

import { apiClient } from "@utils/apiClient.js";
import { formatCurrencyNpr } from "@utils/currency.js";

const STATUSES = ["confirmed", "preparing", "packed", "shipped", "out-for-delivery", "delivered"];

export const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [updatingId, setUpdatingId] = useState(null);
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    try {
      const response = await apiClient.get("/orders/admin");
      setOrders(response.data ?? []);
      setError("");
    } catch (err) {
      setOrders([]);
      setError("Unable to load orders. Please try again.");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = (orderId, status) => {
    setOrders((current) => current.map((order) => (order.id === orderId ? { ...order, status } : order)));
  };

  const handleUpdate = async (orderId, status) => {
    setUpdatingId(orderId);
    try {
      await apiClient.patch(`/orders/${orderId}/status`, { status });
      await fetchOrders();
    } catch (err) {
      setError(err.response?.data?.message ?? "Unable to update status.");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold text-white">Orders</h1>
      {error && <p className="rounded-2xl bg-red-500/10 px-4 py-2 text-sm text-red-200">{error}</p>}
      <div className="overflow-hidden rounded-3xl border border-slate-800">
        <table className="w-full text-left text-sm text-slate-400">
          <thead className="bg-slate-900 text-xs uppercase tracking-[0.3em] text-slate-500">
            <tr>
              <th className="px-6 py-4">Order</th>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Total</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4" />
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t border-slate-800">
                <td className="px-6 py-4 font-semibold text-white">{order.trackingCode}</td>
                <td className="px-6 py-4">{order.shipping?.email ?? "N/A"}</td>
                <td className="px-6 py-4 font-semibold text-emerald-300">{formatCurrencyNpr(order.total)}</td>
                <td className="px-6 py-4">
                  <select
                    className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs uppercase tracking-[0.3em]"
                    value={order.status}
                    onChange={(event) => handleStatusChange(order.id, event.target.value)}
                  >
                    {STATUSES.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    className="rounded-full bg-orange-500 px-4 py-2 text-xs font-semibold text-black disabled:opacity-50"
                    disabled={updatingId === order.id}
                    onClick={() => handleUpdate(order.id, order.status)}
                    type="button"
                  >
                    {updatingId === order.id ? "Saving…" : "Update"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
