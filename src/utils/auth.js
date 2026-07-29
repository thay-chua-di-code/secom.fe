export const isLoggedIn = (user) => {
  return !!user;
};

export const isAdmin = (role) => {
  return String(role || "").toLowerCase() === "admin";
};

export const isSeller = (role) => {
  return String(role || "").toLowerCase() === "seller";
};

export const getRoleFromToken = (token) => {
  if (!token) {
    return null;
  }

  try {
    const payload = JSON.parse(atob(token.split(".")[1] || ""));

    return (
      payload.role ||
      payload.Role ||
      payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] ||
      null
    );
  } catch {
    return null;
  }
};
