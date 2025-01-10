import axios from "axios";

const BASE_URL = "https://maxcode.co.id/backend";

export const fetchProductDetails = async (query) => {
  try {
    const token = localStorage.getItem("token");
    const session = localStorage.getItem("session");
    const accessToken = localStorage.getItem("accessToken");
    const response = await axios.get(`${BASE_URL}/api/barcode/v1/item`, {
      params: { keyword: query },
      headers: {
        Authorization: `Bearer ${token}`,
        Token: accessToken,
        Session: session,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch product");
  }
};
