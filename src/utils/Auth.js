export const login = (email, password) => {
    // Simulasi login
    if (email === "kris@mail.com" && password === "12345678") {
      localStorage.setItem("user", JSON.stringify({ email }));
      return true;
    }
    return false;
  };
  
  export const logout = () => {
	localStorage.clear()
  };
  
  export const isAuthenticated = () => {
    return !!localStorage.getItem("user");
  };
  