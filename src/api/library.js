import axios from "axios";
import { BACKEND_BASE_URL } from "@env";

export const getUserOwnedSongs = async ({ userid }) => {
  try {
    const response = await axios.get(
      `${BACKEND_BASE_URL}/users/${userid}/songs/owned`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
