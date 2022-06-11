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
    const response = await axios.delete(
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

// /////////////////////////////////////////////

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

export const saveSong = async ({ userid, songId }) => {
  try {
    const response = await axios.post(
      `${BACKEND_BASE_URL}/library/users/${userid}/songs/${songId}/save`
    );
    if (response.status === 200 && response.data) {
      return response;
    }
  } catch (error) {
    console.log(error);
  }
};

export const unsaveSong = async ({ userid, songId }) => {
  try {
    const response = await axios.delete(
      `${BACKEND_BASE_URL}/library/users/${userid}/songs/${songId}/unsave`
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

// ///////////////////////////////// ALBUMS //////////////////////////////////////

export const getAlbum = async ({ albumId }) => {
  try {
    const response = await axios.get(`${BACKEND_BASE_URL}/albums/${albumId}`);
    if (response.status === 200 && response.data) {
      return response;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getUserSavedAlbums = async ({ userid }) => {
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

export const saveAlbum = async ({ userid, albumId }) => {
  try {
    const response = await axios.post(
      `${BACKEND_BASE_URL}/library/users/${userid}/albums/${albumId}/save`
    );
    if (response.status === 200 && response.data) {
      return response;
    }
  } catch (error) {
    console.log(error);
  }
};

export const unsaveAlbum = async ({ userid, albumId }) => {
  try {
    const response = await axios.delete(
      `${BACKEND_BASE_URL}/library/users/${userid}/albums/${albumId}/unsave`
    );
    if (response.status === 200 && response.data) {
      return response;
    }
  } catch (error) {
    console.log(error);
  }
};

export const verifyAlbumSave = async ({ userid, albumId }) => {
  try {
    const response = await axios.get(
      `${BACKEND_BASE_URL}/library/users/${userid}/albums/${albumId}/saved/verify`
    );
    if (response.status === 200 && response.data) {
      return response;
    }
  } catch (error) {
    console.log(error);
  }
};

// ///////////////////////////////// ARTISTS //////////////////////////////////////

export const getArtist = async ({ artistId }) => {
  try {
    const response = await axios.get(`${BACKEND_BASE_URL}/artists/${artistId}`);
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

export const saveArtist = async ({ userid, artistId }) => {
  try {
    const response = await axios.post(
      `${BACKEND_BASE_URL}/library/users/${userid}/artists/${artistId}/save`
    );
    if (response.status === 200 && response.data) {
      return response;
    }
  } catch (error) {
    console.log(error);
  }
};

export const unsaveArtist = async ({ userid, artistId }) => {
  try {
    const response = await axios.delete(
      `${BACKEND_BASE_URL}/library/users/${userid}/artists/${artistId}/unsave`
    );
    if (response.status === 200 && response.data) {
      return response;
    }
  } catch (error) {
    console.log(error);
  }
};

export const verifyArtistSave = async ({ userid, artistId }) => {
  try {
    const response = await axios.get(
      `${BACKEND_BASE_URL}/library/users/${userid}/artists/${artistId}/saved/verify`
    );
    if (response.status === 200 && response.data) {
      return response;
    }
  } catch (error) {
    console.log(error);
  }
};

// /////////////////////////////////// Playlist ///////////////////////////////////////////
export const createPlaylist = async ({ userid, name, description }) => {
  try {
    const response = await axios.post(
      `${BACKEND_BASE_URL}/library/users/${userid}/playlists`,
      { name, description }
    );
    if (response.status === 200 && response.data) {
      return response;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getUserPlaylists = async ({ userid }) => {
  try {
    const response = await axios.get(
      `${BACKEND_BASE_URL}/library/users/${userid}/playlists`
    );
    if (response.status === 200 && response.data) {
      return response;
    }
  } catch (error) {
    console.log(error);
  }
};

export const addSongToPlaylist = async ({ playlistId, songId }) => {
  try {
    const response = await axios.post(
      `${BACKEND_BASE_URL}/library/playlists/${playlistId}/songs/${songId}/add`
    );
    if (response.status === 200 && response.data) {
      return response;
    }
  } catch (error) {
    console.log(error);
  }
};
