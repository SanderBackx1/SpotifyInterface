<template>
  <div class="home" id="home" v-if="user">
    <div class="loggedIn">
      <DeviceSelector v-if="!currentTrack.id" />
      <div class="top-bar" v-else>
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
</template>

<script>
import useUser from "../modules/users";
import { refreshTrack, spotify } from "../assets/spotify";

import Player from "../components/Player.vue";
import DeviceSelector from "../components/DeviceSelector.vue";
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
    let interval = null;
    return {
      user,
      playlists,
      currentTrack,
      playbackState,
      activePlaylist,
      top,
      interval: null,
      songUpdate: null,
      devices,
      device,
      interval,
    };
  },
  components: {
    Player,
    DeviceSelector,
  },
  created() {
    this.interval = setInterval(refreshTrack, 1000);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },

  destroyed() {
    clearInterval(this.interval);
  },
};
</script>

<style></style>
