<template>
  <div class="notrack">
    <div class="notrack-wrapper">
      <div class="select-wrapper">
        <p class="device-text">Select a device</p>
        <select name="devices" v-model="device">
          <option :value="device.id" v-for="(device, i) in devices" :key="i">
            {{ device.name }}
          </option>
        </select>
      </div>
      <div class="select-wrapper">
        <p class="device-text">Select a playlist</p>
        <select name="playlists" v-model="playlist">
          <option
            :value="playlist.uri"
            v-for="(playlist, i) in playlists?.items"
            :key="i"
          >
            {{ playlist.name }}
          </option>
        </select>
      </div>
      <p>
        If you don't see your device you might need to open spotify and refresh
        this page.
      </p>
      <div class="btn" @click="startRandom">Start playing songs</div>
    </div>
  </div>
</template>

<script>
import { spotify, refreshTrack } from "../assets/spotify";
import useUser, { setPlaybackState } from "../modules/users";

export default {
  setup() {
    const { top, devices, playlists } = useUser();
    let device = null;
    let playlist = null;
    return {
      top,
      devices,
      device,
      playlists,
      playlist,
    };
  },
  methods: {
    startRandom() {
      spotify
        .play({
          device_id: this.device,
          context_uri: this.playlist,
        })
        .then((_) => {
          refreshTrack();
        });
    },
  },
};
</script>

<style></style>
