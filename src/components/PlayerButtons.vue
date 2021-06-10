<template>
  <div class="playerButtons">
    <div class="btn" @click="toPrevious">
      <i class="fas fa-backward"></i>
    </div>
    <div
      class="btn"
      :class="playbackState?.shuffle_state ? 'active' : ''"
      @click="toggleShuffle"
    >
      <i class="fas fa-random"></i>
    </div>
    <div class="playpause">
      <div v-if="playbackState?.is_playing" class="btn" @click="togglePlayback">
        <i class="far fa-pause-circle"></i>
      </div>
      <div v-else class="btn" @click="togglePlayback">
        <i class="far fa-play-circle"></i>
      </div>
    </div>
    <div
      class="btn"
      :class="playbackState?.repeat_state != 'off' ? 'active' : ''"
      @click="toggleRepeat"
    >
      <i class="fas fa-redo"></i>
    </div>
    <div class="btn" @click="toNext"><i class="fas fa-forward"></i></div>
  </div>
</template>
<script>
import useUser from "../modules/users";
import { spotify } from "../assets/spotify";

export default {
  setup() {
    const { playbackState } = useUser();
    return {
      playbackState,
    };
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
    toggleShuffle() {
      spotify.setShuffle(!this.playbackState?.shuffle_state);
    },
    toggleRepeat() {
      spotify.setRepeat(
        this.playbackState?.repeat_state == "off" ? "context" : "off"
      );
    },
  },
};
</script>

<style></style>
