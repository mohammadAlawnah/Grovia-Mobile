import ApiBase from "@/api/ApiBase";

export const getCart = async () => {
  return await ApiBase.get("/cart");
};
export const addItemToCart = async (id: any) => {
  return await ApiBase.post(`/cart/${id}`);
};
export const removeItem = async (id: any) => {
  return await ApiBase.delete(`/cart/${id}`);
};
export const increaseCartItem = async (id: any) => {
  console.log("dddd = ", id);
  return await ApiBase.post(`/cart/increase/${id}`);
};
export const decreaseCartItem = async (id: any) => {
  return await ApiBase.post(`/cart/decrease/${id}`);
};
