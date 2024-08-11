// get userData
export const getUser = (api, user) => {
  if (!user)
    return res.status(404).json({
      error: "Not Found - 404",
      error: "Please provide a user",
    });

  return api.get(`/api/users/${user.id}`);
};
