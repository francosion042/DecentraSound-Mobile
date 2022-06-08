import axios from "axios";
import { BACKEND_BASE_URL } from "@env";

export const search = async (searchTerm) => {
  try {
    const response = await axios.get(`${BACKEND_BASE_URL}/search`, {
      params: { term: searchTerm },
    });
    if (response.status === 200 && response.data) {
      return response;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getGenres = async () => {
  try {
    const response = await axios.get(`${BACKEND_BASE_URL}/genres`);
    if (response.status === 200 && response.data) {
      return response;
    }
  } catch (error) {
    console.log(error);
  }
};
