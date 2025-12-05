export const createUserEntity = (data = {}) => ({
  id: data.id ?? "",
  name: data.name ?? "",
  email: data.email ?? "",
  password: data.password ?? "",
  role: data.role ?? "customer",
  address: data.address ?? null
});
