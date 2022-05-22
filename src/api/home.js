import axios from "axios";
import { BACKEND_BASE_URL } from "@env";

export const getTrendingAlbums = async () => {
  try {
    const response = await axios.get(`${BACKEND_BASE_URL}/trending/albums`);
    if (response.status === 200 && response.data) {
      return response;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getTrendingArtists = async () => {
  try {
    const response = await axios.get(`${BACKEND_BASE_URL}/trending/artists`);
    if (response.status === 200 && response.data) {
      return response;
    }
  } catch (error) {
    console.log(error);
  }
};
