import axios from "axios";
import { BACKEND_BASE_URL } from "@env";

export const createUser = async ({ address }) => {
  const data = { address };
  try {
    const response = await axios.post(`${BACKEND_BASE_URL}/users`, data);

    if (response.status === 200 && response.data) {
      return response;
    }
  } catch (error) {
    console.log(error).data;
  }
};
