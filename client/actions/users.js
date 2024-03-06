// check that a cookie session is set with this request
export const getCurrentUser = (api) => {
  return api.get("/api/current_user");
};

// get userData
export const getUser = (api, user) => {
  if (!user)
    return res.status(404).json({
      error: "Not Found - 404",
      error: "Please provide a user",
    });

  return api.get(`/api/users/${user.id}`);
};

export const loginUser = (api, values) => {
  return api.post("/api/users/login", { ...values });
};

export const registerUser = (api, values) => {
  return api.post("/api/users/register", { ...values });
};

export const logoutUser = (api) => {
  return api.get("/api/users/logout");
};
