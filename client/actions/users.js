export const getCurrentUser = (api) => {
  api
    .get("/api/current_user")
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.error("Failed to fetch current user", error);
    });
};
