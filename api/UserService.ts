import ApiBase from "@/api/ApiBase";

export const getUsers = async (size: any) => {
  return await ApiBase.get(`/api/v1/users?size=${size}`);
};

export const logout = async () => {
  return await ApiBase.get(`/api/v1/logout`);
};

export const createUser = async (payload: any) => {
  return await ApiBase.post(`/api/v1/create-user`, payload);
};

export const login = async (data: any) => {
  return await ApiBase.post("/users/auth/login", data);
};

export const regester = async (data: any) => {
  return await ApiBase.post("/users/auth/register", data);
};

type payload = {
  //username: string;
  email: string;
  password: string;
  //location: string;
};
