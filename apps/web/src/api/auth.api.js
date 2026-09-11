import api from "./client.js";

const health = () => api.get("/health")

const login = (data) => api.post("/auth/login", data)

export {health, login}