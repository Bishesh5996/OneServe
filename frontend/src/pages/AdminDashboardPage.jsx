import { useEffect, useState } from "react";

import { apiClient } from "@utils/apiClient.js";
import { formatCurrencyNpr } from "@utils/currency.js";

export const AdminDashboardPage = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const response = await apiClient.get("/admin/analytics");
        setData(response.data);
        setError("");
      } catch (err) {
        setError("Unable to load analytics. Showing cached sample data.");
        setData({
          totalOrders: 0,
          totalRevenue: 0,
          totalUsers: 0,
          recentOrders: [],
          featuredProducts: []
        });
      }
    };
    load();
  }, []);

  if (!data) return <p className="text-slate-400">Loading analytics…</p>;

  return (
    <div className="space-y-8">
      {error && <p className="rounded-3xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</p>}
      <div className="grid gap-4 lg:grid-cols-3">
        <StatCard label="Orders" value={data.totalOrders.toString()} trend="▲" />
        <StatCard label="Revenue" value={formatCurrencyNpr(data.totalRevenue)} trend="▲" />
        <StatCard label="Users" value={data.totalUsers.toString()} trend="▲" />
      </div>
      <section className="rounded-3xl border border-slate-800 bg-slate-950 p-6">
        <h2 className="text-lg font-semibold">Recent Orders</h2>
        {data.recentOrders?.length ? (
          <div className="mt-4 space-y-3">
            {data.recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between rounded-2xl border border-slate-800 px-4 py-3">
                <div>
                  <p className="font-semibold text-white">{order.trackingCode}</p>
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{order.status}</p>
                </div>
                <p className="text-lg font-bold text-emerald-300">{formatCurrencyNpr(order.total)}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-4 text-sm text-slate-400">No recent orders.</p>
        )}
      </section>
      <section className="rounded-3xl border border-slate-800 bg-slate-950 p-6">
        <h2 className="text-lg font-semibold">Featured Products</h2>
        {data.featuredProducts?.length ? (
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {data.featuredProducts.map((product) => (
              <article key={product.id} className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900 p-3">
                {product.image ? <img alt={product.name} className="h-14 w-14 rounded-2xl object-cover" src={product.image} /> : <div className="h-14 w-14 rounded-2xl bg-slate-800" />}
                <div className="flex-1">
                  <p className="font-semibold text-white">{product.name}</p>
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{product.category}</p>
                </div>
                <p className="text-sm font-bold text-emerald-300">{formatCurrencyNpr(product.price ?? 0)}</p>
              </article>
            ))}
          </div>
        ) : (
          <p className="mt-4 text-sm text-slate-400">No featured products yet.</p>
        )}
      </section>
    </div>
  );
};

const StatCard = ({ label, value, trend }) => (
  <article className="rounded-3xl border border-slate-800 bg-slate-950 p-6">
    <p className="text-xs uppercase tracking-[0.4em] text-slate-500">{label}</p>
    <p className="mt-2 text-4xl font-bold text-white">{value}</p>
    <p className="text-sm text-emerald-300">{trend}</p>
  </article>
);
