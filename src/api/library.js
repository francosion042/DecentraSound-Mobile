import axios from "axios";
import { BACKEND_BASE_URL } from "@env";

export const getUserOwnedSongs = async ({ userid }) => {
  try {
    const response = await axios.get(
      `${BACKEND_BASE_URL}/library/users/${userid}/songs/owned`
    );
    if (response.status === 200 && response.data) {
      return response;
    }
  } catch (error) {
    console.log(error);
  }
};

export const likeSong = async ({ userid, songId }) => {
  try {
    const response = await axios.post(
      `${BACKEND_BASE_URL}/library/users/${userid}/songs/${songId}/like`
    );
    if (response.status === 200 && response.data) {
      return response;
    }
  } catch (error) {
    console.log(error);
  }
};

export const unlikeSong = async ({ userid, songId }) => {
  try {
    const response = await axios.post(
      `${BACKEND_BASE_URL}/library/users/${userid}/songs/${songId}/unlike`
    );
    if (response.status === 200 && response.data) {
      return response;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getUserLikedSongs = async ({ userid }) => {
  try {
    const response = await axios.get(
      `${BACKEND_BASE_URL}/library/users/${userid}/songs/liked`
    );
    if (response.status === 200 && response.data) {
      return response;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getUserSavedALbums = async ({ userid }) => {
  try {
    const response = await axios.get(
      `${BACKEND_BASE_URL}/library/users/${userid}/albums/saved`
    );
    if (response.status === 200 && response.data) {
      return response;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getUserSavedArtists = async ({ userid }) => {
  try {
    const response = await axios.get(
      `${BACKEND_BASE_URL}/library/users/${userid}/artists/saved`
    );
    if (response.status === 200 && response.data) {
      return response;
    }
  } catch (error) {
    console.log(error);
  }
};

export const verifySongLike = async ({ userid, songId }) => {
  try {
    const response = await axios.get(
      `${BACKEND_BASE_URL}/library/users/${userid}/songs/${songId}/liked/verify`
    );
    if (response.status === 200 && response.data) {
      return response;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getUserSavedSongs = async ({ userid }) => {
  try {
    const response = await axios.get(
      `${BACKEND_BASE_URL}/library/users/${userid}/songs/saved`
    );
    if (response.status === 200 && response.data) {
      return response;
    }
  } catch (error) {
    console.log(error);
  }
};

export const verifySongSave = async ({ userid, songId }) => {
  try {
    const response = await axios.get(
      `${BACKEND_BASE_URL}/library/users/${userid}/songs/${songId}/saved/verify`
    );
    if (response.status === 200 && response.data) {
      return response;
    }
  } catch (error) {
    console.log(error);
  }
};
