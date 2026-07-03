export const isLoggedIn = (user) => {
  return !!user;
};

export const isAdmin = (role) => {
  console.log(role)
  return role.toLowerCase() === "admin" ? true : false;
};
