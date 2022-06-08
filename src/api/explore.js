import axios from "axios";
import { BACKEND_BASE_URL } from "@env";

export const getSpecialAlbums = async () => {
  try {
    const response = await axios.get(
      `${BACKEND_BASE_URL}/explore/albums/special/all`
    );
    if (response.status === 200 && response.data) {
      return response;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getSpecialAlbumsByGenre = async () => {
  try {
    const response = await axios.get(
      `${BACKEND_BASE_URL}/explore/albums/special/byGenre`
    );
    if (response.status === 200 && response.data) {
      return response;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getLatestAlbums = async () => {
  try {
    const response = await axios.get(
      `${BACKEND_BASE_URL}/explore/albums/latest`
    );
    if (response.status === 200 && response.data) {
      return response;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAlbumsByBlockchain = async (param) => {
  const params = {
    blockchain: param,
  };
  try {
    const response = await axios.get(
      `${BACKEND_BASE_URL}/explore/albums/byBlockchain`,
      { params }
    );
    if (response.status === 200 && response.data) {
      return response;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getArtists = async () => {
  try {
    const response = await axios.get(`${BACKEND_BASE_URL}/trending/artists`);
    if (response.status === 200 && response.data) {
      return response;
    }
  } catch (error) {
    console.log(error);
  }
};
