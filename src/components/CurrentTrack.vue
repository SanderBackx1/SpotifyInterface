<template>
  <div class="current">
    <h3
      class="topText"
      v-if="top?.filter((track) => track.name == currentTrack?.name).length > 0"
    >
      🏆 Top 20
    </h3>
    <div class="top-bar">
      <div class="info">
        <h3 class="artists">
          {{ currentTrack?.artists.map((artist) => artist.name).join(", ") }}
        </h3>

        <h3 class="title">{{ currentTrack?.name }}</h3>
      </div>

      <div class="like">
        <div
          class="btn btn-a-green"
          :class="isSaved ? 'favo' : ''"
          @click="toggleSaved"
        >
          <i class="fas fa-heart"></i>
        </div>
      </div>
    </div>
    <div class="img-wrapper">
      <div
        class="top"
        v-if="
          top?.filter((track) => track.name == currentTrack?.name).length > 0
        "
      ></div>
      <img
        crossorigin="anonymous"
        class="songRow_album"
        :src="currentTrack?.album?.images[0]?.url"
        alt=""
        ref="cover"
        @load="onload"
      />
    </div>
  </div>
</template>

<script>
import useUser from "../modules/users";
import { refreshTrack, spotify } from "../assets/spotify";
import FastAverageColor from "fast-average-color";
export default {
  setup() {
    const { currentTrack, isSaved, top } = useUser();
    return {
      currentTrack,
      isSaved,
      top,
    };
  },

  methods: {
    toggleSaved() {
      const tracks = [this.currentTrack.id];
      if (this.isSaved) {
        spotify.removeFromMySavedTracks(tracks);
        this.isSaved = false;
      } else {
        spotify.addToMySavedTracks(tracks);
        this.isSaved = true;
      }
    },
    onload() {
      console.log(":)");
      const fac = new FastAverageColor();

      fac
        .getColorAsync(this.$refs.cover)
        .then((color) => {
          document.getElementById(
            "home"
          ).style.background = `linear-gradient(${color.hex}, #000)`;
        })
        .catch((e) => {
          console.log(e);
        });
    },
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
