import axios from "axios";
import { BACKEND_BASE_URL } from "@env";

console.log(BACKEND_BASE_URL);

export const createUser = async ({ address }) => {
  const data = { address };
  try {
    const response = await axios.post(`${BACKEND_BASE_URL}/users`, data);

    return await response.data;
  } catch (error) {
    console.log(error);
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
