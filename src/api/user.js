import axios from "axios";
import { BACKEND_BASE_URL } from "@env";

export const createUser = async ({ address }) => {
  const data = { address };
  try {
    const response = await axios.post(`${BACKEND_BASE_URL}/users`, data);

    return response;
  } catch (error) {
    console.log(error).data;
  }
};

export const getUserOwnedSongs = async ({ userid }) => {
  try {
    const response = await axios.get(
      `${BACKEND_BASE_URL}/users/${userid}/songs/owned`
    );

    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};
