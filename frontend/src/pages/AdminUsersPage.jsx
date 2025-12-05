import { useEffect, useState } from "react";

import { apiClient } from "@utils/apiClient.js";
import { useAuthStore } from "@stores/useAuthStore.js";

export const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);

  const fetchUsers = async () => {
    if (!token || user?.role !== "admin") {
      setUsers([]);
      setError(user ? "Admin access required." : "");
      return;
    }
    setLoading(true);
    try {
      const response = await apiClient.get("/admin/users");
      setUsers(response.data ?? []);
      setError("");
    } catch (err) {
      setUsers([]);
      const message = err.response?.data?.message ?? err.message ?? "Unable to load users. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let ignore = false;
    const run = async () => {
      if (!ignore) await fetchUsers();
    };
    run();
    const interval = setInterval(run, 30000);
    return () => {
      ignore = true;
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, user?.role]);

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold text-white">Users</h1>
      {error && (
        <div className="flex flex-wrap items-center gap-3 rounded-2xl bg-slate-900 px-4 py-2 text-sm text-orange-200">
          <p>{error}</p>
          <button className="rounded-full border border-orange-200 px-3 py-1 text-xs font-semibold text-orange-200" onClick={fetchUsers} type="button">
            Retry
          </button>
        </div>
      )}
      <div className="grid gap-4 md:grid-cols-3">
        {users.map((entry) => (
          <article key={entry.id} className="rounded-3xl border border-slate-800 bg-slate-950 p-4">
            <p className="text-lg font-semibold text-white">{entry.name}</p>
            <p className="text-sm text-slate-400">{entry.email}</p>
            <p className="mt-2 inline-flex rounded-full bg-slate-900 px-3 py-1 text-xs uppercase tracking-[0.3em] text-orange-300">
              {entry.role}
            </p>
          </article>
        ))}
        {!users.length && !error && !loading && <p className="text-sm text-slate-400">No users found.</p>}
        {loading && <p className="text-sm text-slate-400">Loading users…</p>}
      </div>
    </section>
  );
};
