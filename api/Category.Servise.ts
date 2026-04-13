import ApiBase from "@/api/ApiBase";

export const getCategory = async () => {
  return await ApiBase.get("/category");
};
