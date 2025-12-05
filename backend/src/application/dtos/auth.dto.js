export const createRegisterPayload = (payload = {}) => ({
  name: payload.name ?? "",
  email: payload.email ?? "",
  password: payload.password ?? ""
});

export const createLoginPayload = (payload = {}) => ({
  email: payload.email ?? "",
  password: payload.password ?? ""
});
