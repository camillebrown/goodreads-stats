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

export const loginUser = async (api, values) => {
  const response = await api.post("/api/users/login", { ...values });
  if (response.status === 200) {
    localStorage.setItem('goodreader-auth', JSON.stringify(response.data));
  }
  return response;
};


export const registerUser = async (api, values) => {
  const response = await api.post("/api/users/register", { ...values });

  if (response.status === 200) {
    localStorage.setItem('goodreader-auth', JSON.stringify(response.data));
  }
  return response;
};

export const logoutUser = (api) => {
  localStorage.removeItem('goodreader-auth');
  return api.get("/api/users/logout");
};
