//https://developer.spotify.com/documentation/web-playback-sdk/quick-start
import SpotifyWebApi from "spotify-web-api-js";
import {
  setCurrentTrack,
  setPlaybackState,
  setIsSaved,
} from "../modules/users";
export const spotify = new SpotifyWebApi();
export const authEndpoint = "https://accounts.spotify.com/authorize";
const redirectUri = "http://localhost:3000/";
// const redirectUri = "http://localhost:3000";
const clientId = "eb4f74d520ac4fd2a82c5cc385864822";
const scopes = [
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-top-read",
  "user-modify-playback-state",
  "user-library-modify",
  "user-library-read",
];

export const getTokenFromUrl = () => {
  return window.location.hash
    .substring(1)
    .split("&")
    .reduce((initial, item) => {
      let parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
      return initial;
    }, {});
};
export const refreshTrack = () => {
  spotify.getMyCurrentPlaybackState().then((res) => {
    setPlaybackState(res);
    setCurrentTrack(res.item);
    const tracks = [res.item.id];
    spotify.containsMySavedTracks(tracks).then((res) => {
      setIsSaved(res);
    });
  });
};
export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;
