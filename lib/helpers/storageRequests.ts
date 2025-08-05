export const storageRequest = {
  getAuth: () => {
    return localStorage.getItem("token");
  },
  setAuth: (token: string) => {
    localStorage.setItem("token", token);
  },
  removeAuth: () => {
    localStorage.removeItem("token");
  },
  getTimeZone: () => {
    const storedTimeZone = localStorage.getItem("timeZone");
    return storedTimeZone ? JSON.parse(storedTimeZone) : null;
  },
  setTimeZone: (timeZone: { country_time_zone: string }) => {
    localStorage.setItem("timeZone", JSON.stringify(timeZone));
  },
};
