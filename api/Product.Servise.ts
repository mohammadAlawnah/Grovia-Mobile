import ApiBase from "@/api/ApiBase";

export const getProducts = async () => {
  return await ApiBase.get("/posts");
};

export const getProductById = async (id: any) => {
  return await ApiBase.get(`/products/${id}`);
};

export const addProduct = async (payload: any) => {
  return await ApiBase.post("/products");
};
export const getProductsByCategory = async (category: string) => {
  return await ApiBase.get(`products/category/${category}`);
};
