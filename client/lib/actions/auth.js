// check that a cookie session is set with this request
export const getCurrentUser = async (api) => {
  const response = await api.get("/api/auth/current_user");
  if (response.status === 401) return null;

  return response;
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
