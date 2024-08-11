// check that a cookie session is set with this request
export const getCurrentUser = async (api) => {
  return await api.get("/api/auth/current_user");
};

export const loginUser = async (api, values) => {
  return await api.post("/api/auth/login", { ...values });
};

export const registerUser = async (api, values) => {
  return await api.post("/api/auth/signup", { ...values });
};

export const logoutUser = (api) => {
  return api.get("/api/auth/logout");
};
