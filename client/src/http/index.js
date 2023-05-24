import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const sendOtp = (data) => api.post("/auth/send-otp", data);
export const verifyOtp = (data) => api.post("/auth/verify-otp", data);
export const activate = (data) => api.post("/auth/activate", data);
export const logout = (data) => api.post("/auth/logout", data);

api.interceptors.response.use(
  (config) => {
      return config;
  },
  async (error) => {
      const originalRequest = error.config;
      if (
          error.response.status === 401 && originalRequest &&
          !originalRequest._isretry 
      ) {
          originalRequest.isRetry = true;
          try {
              await axios.get(
                  "http://localhost:5000/api/v1/auth/refresh",
                  {
                      withCredentials: true,
                  }
              );

              return api.request(originalRequest);
          } catch (err) {
              console.log(err.message);
          }
      }
      throw error;
  }
);
export default api;
