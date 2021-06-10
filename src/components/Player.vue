<template>
  <div class="player">
    <CurrentTrack />
    <Progressbar />
    <div class="button-wrapper">
      <PlayerButtons />
    </div>
    <Volume />
  </div>
</template>

<script>
import Progressbar from "../components/Progressbar.vue";
import CurrentTrack from "../components/CurrentTrack.vue";
import PlayerButtons from "../components/PlayerButtons.vue";
import Volume from "../components/Volume.vue";
import useUser from "../modules/users";

export default {
  setup() {
    const { playbackState } = useUser();
    return {
      playbackState,
    };
  },
  components: {
    Progressbar,
    CurrentTrack,
    PlayerButtons,
    Volume,
  },
};
</script>

<style></style>
