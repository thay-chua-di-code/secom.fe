export const isLoggedIn = (user) => {
  return !!user;
};

export const isAdmin = (user) => {
  return user?.role === "ADMIN";
};
