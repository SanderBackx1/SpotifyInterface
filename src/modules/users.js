import { reactive, toRefs } from "vue";

const state = reactive({
  error: null,
  user: null,
  loaded: false,
  loading: false,
  token: "",
  playlists: null,
  activePlaylist: null,
  currentTrack: null,
  playbackState: null,
  isSaved: false,
  top: null,
});

export default function useUsers() {
  if (!state.token) {
    let token = window.localStorage.getItem("spotifyToken");
    if (token) state.token = token;
  }

  return { ...toRefs(state) };
}
export const setToken = (newtoken) => {
  state.token = newtoken;
  window.localStorage.setItem("spotifyToken", newtoken);

  return { ...toRefs(state) };
};

export const setUser = (user) => {
  state.user = { ...user };

  return { ...toRefs(state) };
};
export const setPlaylists = (playlists) => {
  state.playlists = { ...playlists };
  return { ...toRefs(state) };
};
export const setActivePlaylist = (playlist) => {
  state.activePlaylist = { ...playlist };
  return { ...toRefs(state) };
};
export const setCurrentTrack = (track) => {
  state.currentTrack = { ...track };
  return { ...toRefs(state) };
};
export const setPlaybackState = (pbstate) => {
  state.playbackState = { ...pbstate };
  return { ...toRefs(state) };
};
export const setIsSaved = (result) => {
  const [a] = result;
  state.isSaved = a;
};
export const setTop = (top) => {
  state.top = top;
};
