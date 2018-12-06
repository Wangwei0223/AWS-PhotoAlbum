<template>
  <div>
    <p>Image Album</p>
    <button @click="startRecord">Start</button>
    <button @click="endRecord">End</button>
    <button @click="exportWAV">Export</button>
    <button @click="buildCoversation">buildCoversation</button>
    <button @click="startCoversation">startCoversation</button>
  </div>
</template>

<script>
import { lexRuntime } from "../utils/lex";
import AWS from 'aws-sdk';
export default {
  data() {
    return {
      audioControl: "",
      lexRuntime: "",
      conversation: ""
    };
  },
  created() {
    this.audioControl = new LexAudio.audioControl();
  },
  mounted() {
    this.lexRuntime = new lexRuntime();
  },
  methods: {
    startRecord() {
      this.audioControl.startRecording();
    },
    endRecord() {
      this.audioControl.stopRecording();
    },
    exportWAV() {
      this.audioControl.exportWAV(blob => {
        this.audioControl.play(blob);
      });
    },
    buildCoversation() {
      AWS.config.region = 'us-east-1';

      this.conversation = new LexAudio.conversation(
        { lexConfig: { botName: "DiningBot"} },
        function(state) {
          // Called on each state change.
          console.log(state);
        },
        function(data) {
          // Called with the LexRuntime.PostContent response.
          console.log(data);
        },
        function(error) {
          // Called on error.
          console.log(error);
        },
        function(timeDomain) {
          // Called with audio time domain data (useful for rendering the recorded audio levels).
        }
      );
    },
    startCoversation(){
        this.conversation.advanceConversation();
    }
  }
};
</script>
