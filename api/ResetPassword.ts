import ApiBase from "@/api/ApiBase";

type VerifyOtpData = {
  email: string;
  code: string;
};

export const sendResetCode = async (data: any) => {
  return await ApiBase.post("/users/sendResetPasswordCode", data);
};

export const verifyOtp = async (data: VerifyOtpData) => {
  console.log("API DATA:", data);

  return await ApiBase.post(`/users/verifyResetPasswordCode/${data.code}`, {
    email: data.email,
  });
};

export const resetPassword = async (data: any) => {
  return await ApiBase.post("/users/resetPassword", data);
};
