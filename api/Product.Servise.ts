import ApiBase from "@/api/ApiBase";

export const getProducts = async () => {
  return await ApiBase.get("/posts");
};

export const getProductById = async (id: any) => {
  return await ApiBase.get(`/posts/${id}`);
};

export const addProduct = async (payload: any) => {
  return await ApiBase.post("/products");
};
