<template>
  <div class="page">
    <div class="login" v-if="!user">
      <img
        src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
        alt=""
      />
      <a :href="loginUrl">LOGIN WITH SPOTIFY</a>
    </div>
    <div class="home" id="home" v-if="user">
      <div class="loggedIn">
        <div class="top-bar">
          <div class="img-name-wrapper">
            <img :src="user?.images[0]?.url" alt="" />
            <h4>{{ user?.display_name }}</h4>
          </div>
          <div class="wrapper">
            <Player />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { loginUrl } from "../assets/spotify";
import useUser, { setPlaybackState } from "../modules/users";
import { refreshTrack, spotify } from "../assets/spotify";
import Player from "../components/Player.vue";
export default {
  setup() {
    const {
      user,
      playlists,
      activePlaylist,
      currentTrack,
      playbackState,
      top,
    } = useUser();
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
    };
  },
  components: {
    Player,
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
