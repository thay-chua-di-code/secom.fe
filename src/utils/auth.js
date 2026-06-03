export const isLoggedIn = (user) => {
  return !!user;
};

export const isAdmin = (role) => {
  return role.toLowerCase() === "admin";
};
