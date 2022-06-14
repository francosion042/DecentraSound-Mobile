import { Image } from "react-native";
import { Asset } from "expo-asset";
import * as Font from "expo-font";

// import preloadFonts from './preloadFonts';
// import preloadImages from './preloadImages';

// cache fonts
// /////////////////////////////////////////////////////////////////////////////
const cacheFonts = (fonts) => fonts.map((font) => Font.loadAsync(font));

// cache images
// /////////////////////////////////////////////////////////////////////////////
const cacheImages = (images) =>
  Object.values(images).map((image) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    }

    return Asset.fromModule(image).downloadAsync();
  });

// preload async
// /////////////////////////////////////////////////////////////////////////////
// const loadAssetsAsync = async () => {
//   // preload assets
//   // const fontAssets = await cacheFonts(preloadFonts);
//   // const imageAssets = cacheImages(preloadImages);

//   // promise load all
//   return Promise.all([...fontAssets]);
// };

// format seconds
// /////////////////////////////////////////////////////////////////////////////
const formatTime = (sec) => {
  const padTime = (num, size) => `000${num}`.slice(size * -1);
  const time = parseFloat(sec).toFixed(3);
  const minutes = Math.floor(time / 60) % 60;
  const seconds = Math.floor(time - minutes * 60);

  return `${padTime(minutes, 1)}:${padTime(seconds, 2)}`;
};

const getRandomNumber = (maxNum) => {
  return Math.floor(Math.random() * maxNum);
};

const getRandomColor = () => {
  const h = getRandomNumber(360);
  const s = getRandomNumber(100);
  const l = getRandomNumber(100);

  return `hsl(${h}, ${s}%, ${l}%)`;
};

const extractTrendingAlbum = (trendings) => {
  let albums = trendings.map((trending) => trending.album);
  return albums;
};

const extractTrendingArtists = (trendings) => {
  let artists = trendings.map((trending) => trending.artist);
  return artists;
};

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

export default {
  cacheFonts,
  cacheImages,
  extractTrendingAlbum,
  extractTrendingArtists,
  formatTime,
  getRandomColor,
  shuffle,
};
