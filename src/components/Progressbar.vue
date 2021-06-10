<template>
  <div>
    <input
      class="progressSlider"
      type="range"
      min="0"
      :style="{
        backgroundImage: `linear-gradient(90deg, #1db954 ${
          playbackState
            ? (playbackState.progress_ms / playbackState.item?.duration_ms) *
              100
            : 0
        }% ,#333333
         ${
           playbackState
             ? (playbackState.progress_ms / playbackState.item?.duration_ms) *
               100
             : 0
         }% )`,
      }"
      :max="playbackState ? playbackState.item?.duration_ms : 100"
      :value="playbackState ? playbackState?.progress_ms : 0"
      @change="seek"
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
  computed() {
    this.createBackgroundString();
  },
  methods: {
    seek(e) {
      console.log(e.target.value);
      spotify.seek(e.target.value);
    },
    createBackgroundString() {
      console.log("called");
      const str = `linear-gradient(90deg, #1db954 ${
        playbackState
          ? Math.floor(
              (playbackState.progress_ms / playbackState.item?.duration_ms) *
                100
            )
          : 0
      }% ,#333333
         ${
           playbackState
             ? Math.floor(
                 (playbackState.progress_ms / playbackState.item?.duration_ms) *
                   100
               )
             : 0
         }% )`;
      console.log(str);
      return str;
    },
  },
};
</script>

<style></style>
