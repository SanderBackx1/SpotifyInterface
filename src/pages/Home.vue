<template>
  <div class="page">
    <div class="login" v-if="!user">
      <img
        src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
        alt=""
      />

      <a :href="loginUrl">LOGIN WITH SPOTIFY</a>
    </div>
    <LoggedIn />
  </div>
</template>

<script>
import { loginUrl } from "../assets/spotify";
import useUser, { setPlaybackState } from "../modules/users";
import { refreshTrack, spotify } from "../assets/spotify";
import LoggedIn from "../components/LoggedIn.vue";
export default {
  setup() {
    const {
      user,
      playlists,
      activePlaylist,
      currentTrack,
      playbackState,
      top,
      devices,
    } = useUser();
    let device = null;
    return {
      user,
      playlists,
      currentTrack,
      playbackState,
      activePlaylist,
      top,
      loginUrl,
      interval: null,
      songUpdate: null,
      devices,
      device,
    };
  },
  components: {
    LoggedIn,
  },
  methods: {
    togglePlayback() {
      if (this.playbackState?.is_playing) {
        spotify.pause();
      } else {
        spotify.play();
      }
    },

    toPrevious() {
      spotify.skipToPrevious();
    },
    toNext() {
      spotify.skipToNext();
    },
  },
};
</script>

<style></style>
