<template>
  <div class="volume">
    <p class="device">{{ playbackState?.device?.name }}</p>
    <input
      class="volumeSlider"
      type="range"
      min="0"
      max="100"
      :value="playbackState ? playbackState?.device?.volume_percent : 50"
      @change="setVolume"
      :style="{
        backgroundImage: `linear-gradient(90deg, #1db954 ${
          playbackState ? playbackState?.device?.volume_percent : 50
        }% ,#333333
         ${playbackState ? playbackState?.device?.volume_percent : 50}% )`,
      }"
    />
  </div>
</template>

<script>
import { spotify } from "../assets/spotify";
import useUser from "../modules/users";

export default {
  setup() {
    const { playbackState } = useUser();
    return {
      playbackState,
    };
  },
  methods: {
    setVolume(e) {
      spotify.setVolume(e.target.value);
    },
  },
};
</script>

<style></style>
